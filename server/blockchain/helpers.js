const Web3 = require("web3");
const { abi } = require("../../build/contracts/RootQuestionsContract.json");

const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:9545"));
const contract = new web3.eth.Contract(
  abi,
  "0x39E042Aa4361D5892E7bdec1A041139C7ccAe813"
);
const accounts = web3.eth.getAccounts();
const getAccount = async () => (await accounts)[0];

const addQuestion = async (req, res) => {
  // Change 2 to dynamic value passed in from previous middleware function
  const questionId = 3;
  try {
    const result = await contract.methods
      .addQuestion(questionId)
      .send({ from: await getAccount(), gas: 2000000 });
    const { questionAddress } = result.events.QuestionCreated.returnValues;
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
    const result = await contract.methods
      .upVoteQuestion(questionIndex)
      .send({ from: await getAccount(), gas: 2000000 });
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
      .send({ from: await getAccount(), gas: 2000000 });
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
