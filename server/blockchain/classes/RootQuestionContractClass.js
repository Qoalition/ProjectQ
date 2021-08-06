const { abi } = require("../../../build/contracts/RootQuestionsContract.json");
const AbstractContractClass = require("./AbstractContractClass");

class RootQuestionsContract extends AbstractContractClass {
  constructor(address, accountIndex, gas) {
    super(abi, address, accountIndex, gas);
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
