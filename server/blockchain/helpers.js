const Web3 = require("web3");
const { abi } = require("../../build/contracts/RootQuestionsContract.json");

const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:9545"));
const contract = new web3.eth.Contract(
  abi,
  "0x711d0F250Da1fC44d03A4Be32d1CC9b2ED160CE8"
);
const accounts = web3.eth.getAccounts();

const addQuestion = async (req, res) => {
  // Change 2 to dynamic value passed in from previous middleware function
  const questionId = 2;
  try {
    const result = await contract.methods.addQuestion(questionId).call();
    return res.send(result);
  } catch (error) {
    return res.send({ error: error.message });
  }
};

const getQuestions = async (req, res) => {
  try {
    const result = await contract.methods.getQuestions().call();
    return res.send(result);
  } catch (error) {
    return res.send({ error: error.message });
  }
};

const upVoteQuestionByIndex = async (req, res) => {
  // Update questionIndex value to be dynamic
  const questionIndex = 0;
  try {
    const result = await contract.methods.upVoteQuestion(questionIndex).call();
    return res.send(result);
  } catch (error) {
    return res.send({ error: error.message });
  }
};

const downVoteQuestionByIndex = async (req, res) => {
  // Update questionIndex value to be dynamic
  const questionIndex = 0;
  try {
    const result = await contract.methods
      .downVoteQuestion(questionIndex)
      .call();
    return res.send(result);
  } catch (error) {
    return res.send({ error: error.message });
  }
};

module.exports = {
  addQuestion,
  getQuestions,
  upVoteQuestionByIndex,
  downVoteQuestionByIndex,
};