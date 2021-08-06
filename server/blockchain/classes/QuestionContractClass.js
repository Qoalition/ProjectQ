const { abi } = require("../../../build/contracts/QuestionContract.json");
const AbstractContractClass = require("./AbstractContractClass");

class QuestionContract extends AbstractContractClass {
  constructor(address, accountIndex, gas) {
    super(abi, address, accountIndex, gas);
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
