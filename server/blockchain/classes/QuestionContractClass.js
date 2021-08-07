const { abi } = require("../../../build/contracts/QuestionContract.json");
const AbstractContractClass = require("./AbstractContractClass");

class QuestionContract extends AbstractContractClass {
  constructor(address, accountIndex, gas) {
    super(abi, address, accountIndex, gas);
  }

 /**
  * @dev 
  * Calls the uoVoteQuestion fn on the deployed contract
  */
  async upVoteQuestion() {
    return await this.contract.methods
      .upVoteQuestion()
      .send({ from: await this.getAccount(), gas: this.gas });
  }
 /**
  * @dev 
  * Calls the getQuestionVotes fn on the deployed contract,
  * retreiving both the up and down votes on a specific Question contract
  */
  async getQuestionVotes() {
    return await this.contract.methods.getQuestionVotes().call();
  }
 /**
  * @dev 
  * Calls the downVoteQuestion fn on the deployed contract
  */
  async downVoteQuestion() {
    return await this.contract.methods
      .downVoteQuestion()
      .send({ from: await this.getAccount(), gas: this.gas });
  }
 /**
  * @dev 
  * Calls the getAnswers fn on the deployed contract,
  * retrieving all instances of deployed Answer contract addresses 
  * for a specific question
  */
  async getAnswers() {
    return await this.contract.methods.getAnswers().call();
  }
 /**
  * @dev 
  * Calls the addAnswer fn on the deployed contract,
  * passing in an _id retrieved when adding an answer to the database.
  * This will deploy and instance of the Answer contract, based off
  * a specific question
  */
  async addAnswer(_id) {
    return await this.contract.methods.addAnswer(_id)
      .send({ from: await this.getAccount(), gas: this.gas });
  }

}

module.exports = QuestionContract;
