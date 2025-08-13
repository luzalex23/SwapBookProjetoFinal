const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");
const { ethers } = require("hardhat");
const dotenv = require("dotenv");
dotenv.config();

module.exports = buildModule("DeployModule", (m) => {
  // Conta que executará as transações (índice 0 do provedor ou .env)
  const ownerAccount = m.getAccount(0);

  // Parâmetros de deploy
  const ownerValue = m.getParameter("ownerValue", ethers.parseEther("0.001").toString());

  // Deploy do Token de teste (nome e símbolo)
  const token = m.contract("TokenCustom", ["TokenTeste", "TST"]);

  // Deploy do contrato principal WebdexSwapBookv3
  const swapBook = m.contract("WebdexSwapBookv3", [ownerValue, ownerAccount]);

  // Mint inicial de tokens para o owner
  m.call(token, "mint", [ownerAccount, ethers.parseEther("1000")]);

  // Aprovar o contrato de swap para gastar os tokens do owner
  m.call(token, "approve", [swapBook, ethers.parseEther("1000")], { from: ownerAccount });

  return { token, swapBook };
});
