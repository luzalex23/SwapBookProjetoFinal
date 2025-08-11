//Aqui você pode gerar a chave privada a partir da frase de recuperação (mnemonic), para facilitar o deploy do contrato na rede de testes.
//Lembre-se de nunca compartilhar sua chave privada com ninguém!

const { ethers } = require("ethers");
const bip39 = require("bip39");
const hdkey = require("hdkey");

async function generatePrivateKey(mnemonic) {
  const seed = await bip39.mnemonicToSeed(mnemonic);
  const hdwallet = hdkey.fromMasterSeed(seed);
  const key = hdwallet.derive("m/44'/60'/0'/0/0");
  const privateKey = key.privateKey.toString("hex");

  console.log("Sua chave privada é:");
  console.log(privateKey);
  console.log("Atenção: NÃO COMPARTILHE ISSO COM NINGUÉM!");
}

// Substitua pela sua frase de recuperação
generatePrivateKey("wrist maid decade title loop monitor dress cram suit defense high");