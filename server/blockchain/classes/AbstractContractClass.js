const { web3, DEFAULT_GAS } = require("../../config");
/**
  * @dev 
  * The AbstractContractClass defines the contract (using the abi, and 
  * deployed contract address), the user account to make transactions on 
  * the blockchain, and gas in the contructor.
  */

class AbstractContractClass {
  constructor(abi, address, accountIndex = 0, gas = DEFAULT_GAS) {
    this.contract = new web3.eth.Contract(abi, address);
    this.accounts = web3.eth.getAccounts();
    this.accountIndex = accountIndex;
    this.gas = gas;
    this.getAccount()
  }

  async getAccount() {
    console.log(`await this.accounts`, await this.accounts);
    return (await this.accounts)[this.accountIndex];
  }
}

module.exports = AbstractContractClass;
