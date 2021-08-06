const AnswerContract = require('../classes/AnswerContractClass');

// These functions are used for testing and building the blockchain functions

const upVoteAnswer = async (req, res) => {
  const address = req.params.address;
  const contract = new AnswerContract(address)

  try {
    const result = await contract.upVoteAnswer();
    return res.send(result);
  } catch (error) {
    return res.send({ error });
  }
};

const downVoteAnswer = async (req, res) => {
  const address = req.params.address;
  const contract = new AnswerContract(address)

  try {
    const result = await contract.downVoteAnswer();
    return res.send(result);
  } catch (error) {
    return res.send({ error });
  }
};

const getAnswerVotes = async (req, res) => {
  const address = req.params.address;
  const contract = new AnswerContract(address)

  try {
    const result = await contract.getAnswerVotes();
    res.send(result);
  } catch (error) {
    return res.send({ error });
  }
};

module.exports = {
  upVoteAnswer,
  downVoteAnswer,
  getAnswerVotes,
};
