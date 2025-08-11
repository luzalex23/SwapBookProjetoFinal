// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract WebdexSwapBookv3 is Ownable, ReentrancyGuard {
    uint256 internal ownerValue;
    
    // Otimização: Usamos um uint256 simples para o ID do swap.
    uint256 private _nextSwapId;

    // Otimização: Armazenamos os swaps em um único mapping para acesso rápido por ID.
    mapping(uint256 => Swap) public swaps;
    
    // Otimização: Usamos arrays de IDs separados para cada status,
    // o que evita a iteração completa sobre todos os swaps.
    uint256[] internal pendingSwapIds;
    uint256[] internal soldSwapIds;
    uint256[] internal canceledSwapIds;

    enum Status {
        PENDING,
        CANCELED,
        SOLD
    }

    struct Swap {
        uint256 id;
        address seller;
        address leftToken;
        uint256 leftTokenAmount;
        address rightToken;
        uint256 rightTokenAmount;
        Status status;
    }

    struct SwapInfo {
        uint256 id;
        address seller;
        address leftToken;
        uint256 leftTokenAmount;
        address rightToken;
        uint256 rightTokenAmount;
    }

    event Transaction(
        address indexed from,
        address indexed to,
        string method,
        uint256 timeStamp,
        uint256 value
    );

    // Adicionamos o 'address initialOwner' como parâmetro do construtor
    constructor(uint256 ownerValue_, address initialOwner) Ownable(initialOwner) {
        ownerValue = ownerValue_;
        _nextSwapId = 1;
    }


    // Função auxiliar para remover um item de um array de IDs.
    // Isso é mais eficiente do que criar um novo array a cada alteração de status.
    function _removeIdFromArray(uint256[] storage arr, uint256 swapId) private {
        for (uint256 i = 0; i < arr.length; i++) {
            if (arr[i] == swapId) {
                // Move o último elemento para a posição do elemento removido
                arr[i] = arr[arr.length - 1];
                // Reduz o tamanho do array
                arr.pop();
                break;
            }
        }
    }

    function createSwap(
        address leftToken,
        uint256 leftTokenAmount,
        address rightToken,
        uint256 rightTokenAmount
    ) public payable {
        require(msg.value == ownerValue, "The sent value must be exactly");
        require(leftTokenAmount > 0, "Amount1 must be greater than 0");
        require(rightTokenAmount > 0, "Amount2 must be greater than 0");
        ERC20 leftTokenContract = ERC20(leftToken);
        require(
            leftTokenContract.allowance(msg.sender, address(this)) >=
                leftTokenAmount,
            "Contract not approved to spend user's tokens"
        );

        uint256 newSwapId = _nextSwapId;
        _nextSwapId++;

        Swap memory newSwap = Swap(
            newSwapId,
            msg.sender,
            leftToken,
            leftTokenAmount,
            rightToken,
            rightTokenAmount,
            Status.PENDING
        );

        leftTokenContract.transferFrom(
            msg.sender,
            address(this),
            leftTokenAmount
        );
        
        swaps[newSwapId] = newSwap;
        
        // Otimização: Adiciona o ID ao array de pendentes.
        pendingSwapIds.push(newSwapId);

        emit Transaction(
            msg.sender,
            address(this),
            "Create Swap",
            block.timestamp,
            msg.value
        );
    }

    function swapTokens(uint256 swapId) public payable nonReentrant {
        require(msg.value == ownerValue, "The sent value must be exactly");
        require(
            swaps[swapId].status == Status.PENDING,
            "Swap status is not PENDING"
        );
        
        Swap storage currentSwap = swaps[swapId];
        ERC20 leftTokenContract = ERC20(currentSwap.leftToken);
        ERC20 rightTokenContract = ERC20(currentSwap.rightToken);
        require(
            rightTokenContract.allowance(msg.sender, address(this)) >=
                currentSwap.rightTokenAmount,
            "Contract not approved to spend user's tokens"
        );

        rightTokenContract.transferFrom(
            msg.sender,
            address(this),
            currentSwap.rightTokenAmount
        );
        leftTokenContract.transfer(msg.sender, currentSwap.leftTokenAmount);
        rightTokenContract.transfer(
            currentSwap.seller,
            currentSwap.rightTokenAmount
        );
        
        // Otimização: Atualiza o status e move o ID para o array de vendidos.
        swaps[swapId].status = Status.SOLD;
        _removeIdFromArray(pendingSwapIds, swapId);
        soldSwapIds.push(swapId);

        emit Transaction(
            msg.sender,
            currentSwap.seller,
            "Swap Tokens",
            block.timestamp,
            msg.value
        );
    }

    function cancelSwap(uint256 swapId) public nonReentrant{
        require(
            swaps[swapId].seller == msg.sender,
            "You are not the seller of this swap"
        );
        require(
            swaps[swapId].status == Status.PENDING,
            "Swap status is not PENDING"
        );

        Swap storage currentSwap = swaps[swapId];
        ERC20 leftTokenContract = ERC20(currentSwap.leftToken);
        leftTokenContract.transfer(msg.sender, currentSwap.leftTokenAmount);
        
        // Otimização: Atualiza o status e move o ID para o array de cancelados.
        swaps[swapId].status = Status.CANCELED;
        _removeIdFromArray(pendingSwapIds, swapId);
        canceledSwapIds.push(swapId);

        emit Transaction(
            msg.sender,
            address(this),
            "Cancel Swap",
            block.timestamp,
            0
        );
    }


    // Otimização: Funções de visualização agora iteram apenas sobre os arrays de IDs relevantes,
    // tornando-as muito mais eficientes.
    function getSoldSwaps() public view returns (SwapInfo[] memory) {
        SwapInfo[] memory soldSwaps = new SwapInfo[](soldSwapIds.length);
        for (uint256 i = 0; i < soldSwapIds.length; i++) {
            Swap storage currentSwap = swaps[soldSwapIds[i]];
            soldSwaps[i] = SwapInfo(
                currentSwap.id,
                currentSwap.seller,
                currentSwap.leftToken,
                currentSwap.leftTokenAmount,
                currentSwap.rightToken,
                currentSwap.rightTokenAmount
            );
        }
        return soldSwaps;
    } 

    function getPendingSwaps() public view returns (SwapInfo[] memory) {
        SwapInfo[] memory pendingSwaps = new SwapInfo[](pendingSwapIds.length);
        for (uint256 i = 0; i < pendingSwapIds.length; i++) {
            Swap storage currentSwap = swaps[pendingSwapIds[i]];
            pendingSwaps[i] = SwapInfo(
                currentSwap.id,
                currentSwap.seller,
                currentSwap.leftToken,
                currentSwap.leftTokenAmount,
                currentSwap.rightToken,
                currentSwap.rightTokenAmount
            );
        }
        return pendingSwaps;
    }

    function getOwnerValue() public view returns (uint256) {
        return ownerValue;
    }

    // Otimização: Permite que o dono retire uma quantia específica.
    function withdrawFees(uint256 amount) public onlyOwner {
        require(amount <= address(this).balance, "Not enough funds in contract");
        payable(msg.sender).transfer(amount);
    }
}