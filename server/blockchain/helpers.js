const Web3 = require("web3");
const { abi } = require("../../build/contracts/RootQuestionsContract.json");
const {
  abi: questionAbi,
} = require("../../build/contracts/QuestionContract.json");
const RootQuestionsContract = require("./RootQuestionContractClass.js");

const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:9545"));
const contract = new web3.eth.Contract(
  abi,
  "0x39E042Aa4361D5892E7bdec1A041139C7ccAe813"
);
const accounts = web3.eth.getAccounts();
const getAccount = async () => (await accounts)[0];

const rootContract = new RootQuestionsContract(contract, accounts);

const addQuestion = async (req, res) => {
  const questionId = req.params.id;
  try {
    const result = await rootContract.addQuestion(questionId);
    const { questionAddress } = result.events.QuestionCreated.returnValues;
    return res.send(result);
  } catch (error) {
    return res.send({ error });
  }
};

const getQuestions = async (req, res) => {
  try {
    const result = await rootContract.getQuestions();
    return res.send(result);
  } catch (error) {
    return res.send({ error: error });
  }
};

const upVoteQuestionByIndex = async (req, res) => {
  const questionIndex = req.params.index;
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
  const questionIndex = req.params.index;
  try {
    const result = await contract.methods
      .downVoteQuestion(questionIndex)
      .send({ from: await getAccount(), gas: 2000000 });
    return res.send(result);
  } catch (error) {
    return res.send({ error: error.message });
  }
};

const upVoteQuestionByAddress = async (req, res) => {
  const address = req.params.address.toString();
  const questionContract = new web3.eth.Contract(questionAbi, address);
  try {
    const result = questionContract.methods
      .upVoteQuestion()
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
  upVoteQuestionByAddress,
};
