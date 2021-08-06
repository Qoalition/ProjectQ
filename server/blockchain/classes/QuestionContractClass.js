const { web3 } = require("../../config");
const { abi } = require("../../../build/contracts/QuestionContract.json");

class QuestionContract {
  constructor(address, accountIndex = 0) {
    this.contract = new web3.eth.Contract(abi, address);
    this.accounts = web3.eth.getAccounts();
    this.accountIndex = accountIndex;
    this.gas = 2000000;
  }

  async getAccount() {
    return (await this.accounts)[this.accountIndex];
  }

  async upVoteQuestion() {
    return await this.contract.methods
      .upVoteQuestion()
      .send({ from: await this.getAccount(), gas: this.gas });
  }

  async getQuestionVotes() {
    return await this.contract.methods.getQuestionVotes().call();
  }

  async downVoteQuestion() {
    return await this.contract.methods
      .downVoteQuestion()
      .send({ from: await this.getAccount(), gas: this.gas });
  }

  async getAnswers() {
    return await this.contract.methods.getAnswers().call();
  }

  async addAnswer(_id) {
    return await this.contract.methods.addAnswer(_id)
      .send({ from: await this.getAccount(), gas: this.gas });
  }

}

module.exports = QuestionContract;
