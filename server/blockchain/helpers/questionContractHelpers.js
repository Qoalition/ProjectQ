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

module.exports = {
  upVoteQuestion,
  getQuestionVotes,
};
