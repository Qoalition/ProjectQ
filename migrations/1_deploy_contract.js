const RootQuestionsContract = artifacts.require("RootQuestionsContract");
// const AnswerContract = artifacts.require("QuestionAnswer");

module.exports = function (deployer, network, accounts) {
  deployer.deploy(RootQuestionsContract, {from: accounts[0]});
};
