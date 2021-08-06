class RootQuestionsContract {
  constructor(contract, accounts, accountIndex) {
    this.contract = contract;
    this.accounts = accounts;
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
