const Web3 = require("web3");
const { abi } = require("../../build/contracts/RootQuestionsContract.json");
const {
  abi: questionAbi,
} = require("../../build/contracts/QuestionContract.json");
const RootQuestionsContract = require("./RootQuestionContractClass.js");

const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:9545"));
const contract = new web3.eth.Contract(
  abi,
  "0x622D7Bb7f383609d2A6D24c237582CACE294ff15"
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

const upVoteQuestion = async (req, res) => {
  const address = req.params.address;
  const questionContract = new web3.eth.Contract(questionAbi, address);
  try {
    const result = await questionContract.methods
      .upVoteQuestion()
      .send({ from: await getAccount(), gas: 2000000 });
    return res.send(result);
  } catch (error) {
    return res.send({ error });
  }
};

const getQuestionVotes = async (req, res) => {
  const address = req.params.address;
  const questionContract = new web3.eth.Contract(questionAbi, address);

  try {
    const result = await questionContract.methods.getQuestionVotes().call();
    res.send(result);
  } catch (error) {
    return res.send({ error });
  }
};

module.exports = {
  addQuestion,
  getQuestions,
  upVoteQuestion,
  getQuestionVotes,
};
