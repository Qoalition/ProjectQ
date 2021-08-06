const { abi } = require("../../../build/contracts/AnswerContract.json");
const AbstractContractClass = require("./AbstractContractClass");

class AnswerContract extends AbstractContractClass {
  constructor(address, accountIndex, gas) {
    super(abi, address, accountIndex, gas);
  }

  async getAnswerVotes() {
    return await this.contract.methods.getAnswerVotes().call();
  }

  async upVoteAnswer() {
    return await this.contract.methods
      .upVoteAnswer()
      .send({ from: await this.getAccount(), gas: this.gas });
  }

  async downVoteAnswer() {
    return await this.contract.methods
      .downVoteAnswer()
      .send({ from: await this.getAccount(), gas: this.gas });
  }
}

module.exports = AnswerContract;
