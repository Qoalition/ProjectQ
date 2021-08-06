const QuestionContract = require("../classes/QuestionContractClass");

const upVoteQuestion = async (req, res, next) => {
  const { address } = res.locals;
  const contract = new QuestionContract(address);

  try {
    const result = await contract.upVoteQuestion();
    return next();
  } catch (error) {
    return next({ error });
  }
};

const downVoteQuestion = async (req, res, next) => {
  const { address } = res.locals;
  const contract = new QuestionContract(address);

  try {
    const result = await contract.downVoteQuestion();
    return next();
  } catch (error) {
    return next({ error });
  }
};

const getQuestionVotes = async (req, res, next) => {
  const { address } = res.locals;
  const contract = new QuestionContract(address);

  try {
    const result = await contract.getQuestionVotes();
    res.locals.upVotes = result.upVotes;
    res.locals.downVotes = result.downVotes;
    return next();
  } catch (error) {
    return next({ error });
  }
};

const getAnswers = async (req, res, next) => {
  const { address } = res.locals;
  const contract = new QuestionContract(address);

  try {
    const result = await contract.getAnswers();
    res.locals.answers = result;
    return next();
  } catch (error) {
    return next({ error });
  }
};

const addAnswer = async (req, res, next) => {
  const { address } = res.locals;
  const { answerId } = res.locals;
  const contract = new QuestionContract(address);
  
  try {
    const result = await contract.addAnswer(answerId);
    const { answerAddress } = result.events.QuestionCreated.returnValues;
    res.locals.answerAddress = answerAddress
    return next(result);
  } catch (error) {
    return next({ error });
  }
};

module.exports = {
  upVoteQuestion,
  getQuestionVotes,
  downVoteQuestion,
  getAnswers,
  addAnswer,
};
