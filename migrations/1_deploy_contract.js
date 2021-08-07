const RootQuestionsContract = artifacts.require("RootQuestionsContract");

module.exports = function (deployer, network, accounts) {
  deployer.deploy(RootQuestionsContract, {from: accounts[0]});
};
