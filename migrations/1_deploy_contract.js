const RootQuestionsContract = artifacts.require("RootQuestionsContract");
// const AnswerContract = artifacts.require("QuestionAnswer");

module.exports = function (deployer) {
  deployer.deploy(RootQuestionsContract);
};
