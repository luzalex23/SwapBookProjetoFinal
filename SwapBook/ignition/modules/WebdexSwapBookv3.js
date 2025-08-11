const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");
const dotenv = require("dotenv");
dotenv.config();

module.exports = buildModule("WebdexSwapBookv3Module", (m) => {
  //argumento do construtor do contrato
  // Aqui você pode definir o valor do OwnerValue que será passado para o contrato.
  const OwnerAddress = process.env.OwnerAddress; 
  // Substitua pelo endereço do dono do contrato desejado

  const OwnerValue = 100n;

  // Se o seu contrato precisar de argumentos no construtor, você pode passá-los aqui.
  // Exemplo: const minhaCarteira = m.contract("WebdexSwapBookv3", [argumento1, argumento2]);
  const swapBook = m.contract("WebdexSwapBookv3",[OwnerValue, OwnerAddress]);

  // Faz o deploy do contrato, passando o nome do contrato e o argumento do construtor.
  return { swapBook };
});