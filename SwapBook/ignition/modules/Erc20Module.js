const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");
const dotenv = require("dotenv");
dotenv.config();

module.exports = buildModule("DeployModule", (m) => {
  // Pegando parâmetros do .env ou valores padrão
  const ownerValue = m.getParameter("ownerValue", "1000000000000000"); // 0.001 ETH
  const ownerAddress = m.getParameter("ownerAddress", process.env.OwnerAddress);

  // Deploy do Token de teste
  const token = m.contract("MyTestToken", ["TokenTeste", "TST"]);

  // Deploy do contrato principal WebdexSwapBookv3
  const swapBook = m.contract("WebdexSwapBookv3", [ownerValue, ownerAddress]);

  // Mint inicial de tokens para o owner
  m.call(token, "mint", [ownerAddress, m.fromEther("1000")]);

  // Aprovar o contrato de swap para gastar os tokens do owner
  m.call(token, "approve", [swapBook, m.fromEther("1000")], { from: ownerAddress });

  return { token, swapBook };
});
