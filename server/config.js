const Web3 = require("web3");

  /**
  * @dev Get the web3 provider for hooking the app up to a blockchain instance:
  * 
  * If using truffle:
  * assign url to "http://localhost:9545";
  * 
  * If using rinkeby or another testnet:
  * assign url to the given string from infura 
  * e.g. "https://mainnet.infura.io/v3/2a67aae8464e4d74a1d9a4339fd9c0a9"
  */

const url = "http://localhost:9545";
const web3 = new Web3(new Web3.providers.HttpProvider(url));

module.exports = { web3, DEFAULT_GAS: 2000000 };
