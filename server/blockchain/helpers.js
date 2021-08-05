const Web3 = require("web3");
const { abi } = require("../../build/contracts/RootQuestionsContract.json");
const {
  abi: questionAbi,
} = require("../../build/contracts/QuestionContract.json");
const RootQuestionsContract = require("./RootQuestionContractClass.js");

const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:9545"));
const contract = new web3.eth.Contract(
  abi,
  "0x73d2Db37d53B8c4Ae28DbeE411d5f4463Fb9E964"
);
const accounts = web3.eth.getAccounts();
const getAccount = async () => (await accounts)[0];

const rootContract = new RootQuestionsContract(contract, accounts);

// These functions are used for testing and building the blockchain functions

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
    const result = await rootContract.upVoteQuestionByIndex(questionIndex);
    return res.send(result);
  } catch (error) {
    return res.send({ error });
  }
};

const downVoteQuestionByIndex = async (req, res) => {
  const questionIndex = req.params.index;
  try {
    const result = await rootContract.downVoteQuestionByIndex(questionIndex);
    return res.send(result);
  } catch (error) {
    return res.send({ error });
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
    return res.send({ error });
  }
};

module.exports = {
  addQuestion,
  getQuestions,
  upVoteQuestionByIndex,
  downVoteQuestionByIndex,
  upVoteQuestionByAddress,
};
