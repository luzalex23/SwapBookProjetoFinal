import {connectWallet} from '../js/connectWallet.js';
const {provider, signer, contract} = await connectWallet();


async function getOwnerValue() {
  try {
    const value = await contract.getOwnerValue();
    document.getElementById("status-message").innerText = `📊 OwnerValue: ${ethers.formatEther(value)} ETH`;
  } catch (err) {
    document.getElementById("status-message").innerText = `❌ Erro: ${err.message}`;
  }
}

export const getPendingSwaps = async () => {
  try {
    const swaps = await contract.getPendingSwaps();
    if (swaps.length === 0) alert("Nenhum swap pendente encontrado.");
    alert(swaps);
  } catch (err) {
    alert('error -> ' + err.message);
    return ['Erro'];
  }
}

async function approveToken() {
  try {
    const leftTokenAddress = document.getElementById("leftTokenAddress").value.trim();
    const leftAmount = document.getElementById("leftTokenAmount").value;
    const tokenContract = new ethers.Contract(leftTokenAddress, erc20Abi, signer);
    const decimals = await tokenContract.decimals();
    const amountParsed = ethers.parseUnits(leftAmount, decimals);
    const tx = await tokenContract.approve(contractAddress, amountParsed);
    await tx.wait();
    document.getElementById("status-message").innerText = `✅ Token aprovado com sucesso.`;
  } catch (err) {
    document.getElementById("status-message").innerText = `❌ Erro: ${err.message}`;
  }
}

async function createSwap() {
  try {
    const leftTokenAddress = document.getElementById("leftTokenAddress").value.trim();
    const leftAmount = document.getElementById("leftTokenAmount").value;
    const rightTokenAddress = document.getElementById("rightTokenAddress").value.trim();
    const rightAmount = document.getElementById("rightTokenAmount").value;
    const ownerValue = await contract.getOwnerValue();

    const leftToken = new ethers.Contract(leftTokenAddress, erc20Abi, signer);
    const rightToken = new ethers.Contract(rightTokenAddress, erc20Abi, signer);
    const leftDecimals = await leftToken.decimals();
    const rightDecimals = await rightToken.decimals();

    const leftAmountParsed = ethers.parseUnits(leftAmount, leftDecimals);
    const rightAmountParsed = ethers.parseUnits(rightAmount, rightDecimals);

    const tx = await contract.createSwap(
      leftTokenAddress,
      leftAmountParsed,
      rightTokenAddress,
      rightAmountParsed,
      { value: ownerValue }
    );
    await tx.wait();
    document.getElementById("status-message").innerText = `✅ Swap criado com sucesso! Hash: ${tx.hash}`;
  } catch (err) {
    document.getElementById("status-message").innerText = `❌ Erro: ${err.message}`;
  }
}
  async function getSoldSwaps() {
  try {
    const swaps = await contract.getSoldSwaps();
    const list = document.getElementById("swaps-list");
    list.innerHTML = "";
    if (swaps.length === 0) return list.innerHTML = "<li>Nenhum swap aprovado.</li>";

    swaps.forEach(swap => {
      const li = document.createElement("li");
      li.innerHTML = `
        <strong>ID:</strong> ${swap.id} <br>
        <strong>Vendedor:</strong> ${swap.seller} <br>
        <strong>Vende:</strong> ${swap.leftTokenAmount} de ${swap.leftToken} <br>
        <strong>Quer:</strong> ${swap.rightTokenAmount} de ${swap.rightToken}
      `;
      list.appendChild(li);
    });
  } catch (err) {
    document.getElementById("status-message").innerText = `❌ Erro: ${err.message}`;
  }
}
