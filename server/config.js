const Web3 = require("web3");
var HDWalletProvider = require("truffle-hdwallet-provider");

const provider = new HDWalletProvider(process.env.MNEMONIC, process.env.RINKEBY_URL)

const web3 = new Web3(provider);

module.exports = { web3, DEFAULT_GAS: 2000000 };
