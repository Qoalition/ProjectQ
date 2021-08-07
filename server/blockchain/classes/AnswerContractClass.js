const { abi } = require("../../../build/contracts/AnswerContract.json");
const AbstractContractClass = require("./AbstractContractClass");

class AnswerContract extends AbstractContractClass {
  constructor(address, accountIndex, gas) {
    super(abi, address, accountIndex, gas);
  }
 /**
  * @dev 
  * Calls the getAnswerVotes fn on the deployed contract,
  * retrieving how many votes a specific answer has
  */
  async getAnswerVotes() {
    return await this.contract.methods.getAnswerVotes().call();
  }
  /**
  * @dev 
  * Calls the upVoteAnswer fn on the deployed contract,
  * upvoting a specific answer
  */
  async upVoteAnswer() {
    return await this.contract.methods
      .upVoteAnswer()
      .send({ from: await this.getAccount(), gas: this.gas });
  }
  /**
  * @dev 
  * Calls the downVoteAnswer fn on the deployed contract,
  * downvoting a specific answer
  */
  async downVoteAnswer() {
    return await this.contract.methods
      .downVoteAnswer()
      .send({ from: await this.getAccount(), gas: this.gas });
  }
}

module.exports = AnswerContract;
