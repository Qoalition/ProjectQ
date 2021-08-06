const AnswerContract = require("../classes/AnswerContractClass");

const upVoteAnswer = async (req, res, next) => {
  const { address } = res.locals;
  const contract = new AnswerContract(address);

  try {
    const result = await contract.upVoteAnswer();
    return next();
  } catch (error) {
    return next({ error });
  }
};

const downVoteAnswer = async (req, res, next) => {
  const { address } = res.locals;
  const contract = new AnswerContract(address);

  try {
    const result = await contract.downVoteAnswer();
    return next();
  } catch (error) {
    return next({ error });
  }
};

const getAnswerVotes = async (req, res, next) => {
  const { address } = res.locals;
  const contract = new AnswerContract(address);

  try {
    const result = await contract.getAnswerVotes();
    res.locals.upVotes = result.upVotes;
    res.locals.downVotes = result.downVotes;
    return next();
  } catch (error) {
    return next({ error });
  }
};

module.exports = {
  upVoteAnswer,
  downVoteAnswer,
  getAnswerVotes,
};
