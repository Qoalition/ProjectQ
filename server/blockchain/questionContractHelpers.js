// Question contract stuff
const { web3 } = require("../config");
const {
  abi: questionAbi,
} = require("../../build/contracts/QuestionContract.json");
const accounts = web3.eth.getAccounts();
const getAccount = async () => (await accounts)[0];

// Root question contract stuff
const address = "0xF652733051367A1dB48D7C0E61F2144BdA52Fd60";

// These functions are used for testing and building the blockchain functions

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
  upVoteQuestion,
  getQuestionVotes,
};
