const { web3 } = require("../config");
const { abi } = require("../../build/contracts/RootQuestionsContract.json");

class RootQuestionsContract {
  constructor(address, accountIndex) {
    this.contract = new web3.eth.Contract(abi, address);
    this.accounts = web3.eth.getAccounts();
    this.accountIndex = accountIndex || 0;
    this.gas = 2000000;
  }

  async getAccount() {
    return (await this.accounts)[this.accountIndex];
  }

  async addQuestion(questionId) {
    return await this.contract.methods
      .addQuestion(questionId)
      .send({ from: await this.getAccount(), gas: this.gas });
  }

  async getQuestions() {
    return await this.contract.methods.getQuestions().call();
  }
}

module.exports = RootQuestionsContract;
