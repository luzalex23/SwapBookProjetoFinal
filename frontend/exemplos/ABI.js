exports.abi = [
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "ownerValue_",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "initialOwner",
          "type": "address"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        }
      ],
      "name": "OwnableInvalidOwner",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "OwnableUnauthorizedAccount",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "ReentrancyGuardReentrantCall",
      "type": "error"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "previousOwner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "OwnershipTransferred",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "method",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "timeStamp",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "Transaction",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "swapId",
          "type": "uint256"
        }
      ],
      "name": "cancelSwap",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "leftToken",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "leftTokenAmount",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "rightToken",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "rightTokenAmount",
          "type": "uint256"
        }
      ],
      "name": "createSwap",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getOwnerValue",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getPendingSwaps",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "id",
              "type": "uint256"
            },
            {
              "internalType": "address",
              "name": "seller",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "leftToken",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "leftTokenAmount",
              "type": "uint256"
            },
            {
              "internalType": "address",
              "name": "rightToken",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "rightTokenAmount",
              "type": "uint256"
            }
          ],
          "internalType": "struct WebdexSwapBookv3.SwapInfo[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getSoldSwaps",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "id",
              "type": "uint256"
            },
            {
              "internalType": "address",
              "name": "seller",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "leftToken",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "leftTokenAmount",
              "type": "uint256"
            },
            {
              "internalType": "address",
              "name": "rightToken",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "rightTokenAmount",
              "type": "uint256"
            }
          ],
          "internalType": "struct WebdexSwapBookv3.SwapInfo[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "renounceOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "swapId",
          "type": "uint256"
        }
      ],
      "name": "swapTokens",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "swaps",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "seller",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "leftToken",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "leftTokenAmount",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "rightToken",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "rightTokenAmount",
          "type": "uint256"
        },
        {
          "internalType": "enum WebdexSwapBookv3.Status",
          "name": "status",
          "type": "uint8"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "transferOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "withdrawFees",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ];
