const { abi } = require("../../../build/contracts/RootQuestionsContract.json");
const AbstractContractClass = require("./AbstractContractClass");


class RootQuestionsContract extends AbstractContractClass {
  constructor(address, accountIndex, gas) {
    super(abi, address, accountIndex, gas);
  }

  /**
  * @dev 
  * Calls the addQuestion fn on the deployed contract, 
  * passing in the questionId retrieved from inserting question 
  * data into the db
  */
  async addQuestion(questionId) {
    return await this.contract.methods
      .addQuestion(questionId)
      .send({ from: await this.getAccount(), gas: this.gas });
  }
  /**
  * @dev 
  * Calls the getQuestions fn on the deployed contract,
  * retrieving an array of all the previous Question contract addresses 
  */
  async getQuestions() {
    return await this.contract.methods.getQuestions().call();
  }
}

module.exports = RootQuestionsContract;
