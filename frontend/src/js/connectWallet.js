let provider, signer, contract;
const contractAddress = "0x8aA58D12D744321c3f5E849bB21Fe9fD0eb48Dd1";

const contractABI = [
  { "inputs": [{ "internalType": "uint256", "name": "ownerValue_", "type": "uint256" }, { "internalType": "address", "name": "initialOwner", "type": "address" }], "stateMutability": "nonpayable", "type": "constructor" },
  { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }], "name": "OwnableInvalidOwner", "type": "error" },
  { "inputs": [{ "internalType": "address", "name": "account", "type": "address" }], "name": "OwnableUnauthorizedAccount", "type": "error" },
  { "inputs": [], "name": "ReentrancyGuardReentrantCall", "type": "error" },
  { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "FeesWithdrawn", "type": "event" },
  { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "previousOwner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "newOwner", "type": "address" }], "name": "OwnershipTransferred", "type": "event" },
  { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "uint256", "name": "id", "type": "uint256" }, { "indexed": true, "internalType": "address", "name": "seller", "type": "address" }], "name": "SwapCancelled", "type": "event" },
  { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "uint256", "name": "id", "type": "uint256" }, { "indexed": true, "internalType": "address", "name": "seller", "type": "address" }, { "indexed": true, "internalType": "address", "name": "leftToken", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "leftAmount", "type": "uint256" }, { "indexed": false, "internalType": "address", "name": "rightToken", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "rightAmount", "type": "uint256" }], "name": "SwapCreated", "type": "event" },
  { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "uint256", "name": "id", "type": "uint256" }, { "indexed": true, "internalType": "address", "name": "buyer", "type": "address" }, { "indexed": true, "internalType": "address", "name": "seller", "type": "address" }], "name": "SwapExecuted", "type": "event" },
  { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": false, "internalType": "string", "name": "method", "type": "string" }, { "indexed": false, "internalType": "uint256", "name": "timeStamp", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "Transaction", "type": "event" },
  { "inputs": [{ "internalType": "uint256", "name": "swapId", "type": "uint256" }], "name": "cancelSwap", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
  { "inputs": [{ "internalType": "address", "name": "leftToken", "type": "address" }, { "internalType": "uint256", "name": "leftTokenAmount", "type": "uint256" }, { "internalType": "address", "name": "rightToken", "type": "address" }, { "internalType": "uint256", "name": "rightTokenAmount", "type": "uint256" }], "name": "createSwap", "outputs": [], "stateMutability": "payable", "type": "function" },
  { "inputs": [], "name": "getOwnerValue", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" },
  { "inputs": [], "name": "getPendingSwaps", "outputs": [{ "components": [{ "internalType": "uint256", "name": "id", "type": "uint256" }, { "internalType": "address", "name": "seller", "type": "address" }, { "internalType": "address", "name": "leftToken", "type": "address" }, { "internalType": "uint256", "name": "leftTokenAmount", "type": "uint256" }, { "internalType": "address", "name": "rightToken", "type": "address" }, { "internalType": "uint256", "name": "rightTokenAmount", "type": "uint256" }], "internalType": "struct WebdexSwapBookv3.SwapInfo[]", "name": "", "type": "tuple[]" }], "stateMutability": "view", "type": "function" },
  { "inputs": [], "name": "getSoldSwaps", "outputs": [{ "components": [{ "internalType": "uint256", "name": "id", "type": "uint256" }, { "internalType": "address", "name": "seller", "type": "address" }, { "internalType": "address", "name": "leftToken", "type": "address" }, { "internalType": "uint256", "name": "leftTokenAmount", "type": "uint256" }, { "internalType": "address", "name": "rightToken", "type": "address" }, { "internalType": "uint256", "name": "rightTokenAmount", "type": "uint256" }], "internalType": "struct WebdexSwapBookv3.SwapInfo[]", "name": "", "type": "tuple[]" }], "stateMutability": "view", "type": "function" },
  { "inputs": [], "name": "owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" },
  { "inputs": [], "name": "renounceOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
  { "inputs": [{ "internalType": "uint256", "name": "swapId", "type": "uint256" }], "name": "swapTokens", "outputs": [], "stateMutability": "payable", "type": "function" },
  { "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "name": "swaps", "outputs": [{ "internalType": "uint256", "name": "id", "type": "uint256" }, { "internalType": "address", "name": "seller", "type": "address" }, { "internalType": "address", "name": "leftToken", "type": "address" }, { "internalType": "uint256", "name": "leftTokenAmount", "type": "uint256" }, { "internalType": "address", "name": "rightToken", "type": "address" }, { "internalType": "uint256", "name": "rightTokenAmount", "type": "uint256" }, { "internalType": "uint8", "name": "status", "type": "uint8" }], "stateMutability": "view", "type": "function" },
  { "inputs": [{ "internalType": "address", "name": "newOwner", "type": "address" }], "name": "transferOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
  { "inputs": [{ "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "withdrawFees", "outputs": [], "stateMutability": "nonpayable", "type": "function" }
];


const erc20Abi = [
  "function approve(address spender, uint256 amount) returns (bool)",
  "function decimals() view returns (uint8)"
];

export async function connectWallet() {
  try {
    if (!window.ethereum) throw new Error("MetaMask não encontrada");
    await window.ethereum.request({ method: "eth_requestAccounts" });
    provider = new ethers.BrowserProvider(window.ethereum);
    signer = await provider.getSigner();
    contract = new ethers.Contract(contractAddress, contractABI, signer);
    const address = await signer.getAddress();
    return { provider, signer, contract };
  } catch (err) {
    alert("Erro ao conectar a carteira: " + err.message);
  }
};
