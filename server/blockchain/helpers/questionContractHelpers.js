const QuestionContract = require('../classes/QuestionContractClass');

// These functions are used for testing and building the blockchain functions

const upVoteQuestion = async (req, res) => {
  const address = req.params.address;
  const contract = new QuestionContract(address)

  try {
    const result = await contract.upVoteQuestion();
    return res.send(result);
  } catch (error) {
    return res.send({ error });
  }
};

const downVoteQuestion = async (req, res) => {
  const address = req.params.address;
  const contract = new QuestionContract(address)

  try {
    const result = await contract.downVoteQuestion();
    return res.send(result);
  } catch (error) {
    return res.send({ error });
  }
};

const getQuestionVotes = async (req, res) => {
  const address = req.params.address;
  const contract = new QuestionContract(address)

  try {
    const result = await contract.getQuestionVotes();
    res.send(result);
  } catch (error) {
    return res.send({ error });
  }
};

const getAnswers = async (req, res) => {
  const address = req.params.address;
  const contract = new QuestionContract(address)

  try {
    const result = await contract.getAnswers();
    res.send(result);
  } catch (error) {
    return res.send({ error });
  }
};

const addAnswer = async (req, res) => {
  const address = req.params.address;
  const questionId = req.params.id;
  const contract = new QuestionContract(address)

  try {
    const result = await contract.addAnswer(questionId);
    res.send(result);
  } catch (error) {
    return res.send({ error });
  }
};

module.exports = {
  upVoteQuestion,
  getQuestionVotes,
  downVoteQuestion,
  getAnswers,
  addAnswer
};
