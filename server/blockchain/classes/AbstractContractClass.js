const { web3, DEFAULT_GAS } = require("../../config");

class AbstractContractClass {
  constructor(abi, address, accountIndex = 0, gas = DEFAULT_GAS) {
    this.contract = new web3.eth.Contract(abi, address);
    this.accounts = web3.eth.getAccounts();
    this.accountIndex = accountIndex;
    this.gas = gas;
  }

  async getAccount() {
    return (await this.accounts)[this.accountIndex];
  }
}

module.exports = AbstractContractClass;
