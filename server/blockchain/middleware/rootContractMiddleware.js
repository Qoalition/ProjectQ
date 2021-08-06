const RootQuestionsContract = require("../classes/RootQuestionContractClass.js");
const address = process.env.CONTRACT_ADDRESS;
const rootContract = new RootQuestionsContract(address);

const addQuestion = async (req, res, next) => {
  const { questionId } = res.locals;

  try {
    const result = await rootContract.addQuestion(questionId);
    const { questionAddress } = result.events.QuestionCreated.returnValues;
    res.locals.questionAddress = questionAddress;
    return next();
  } catch (error) {
    return next({ error });
  }
};

const getQuestions = async (req, res, next) => {
  try {
    const result = await rootContract.getQuestions();
    res.locals.questions = result;
    return next();
  } catch (error) {
    return next({ error: error });
  }
};

module.exports = {
  addQuestion,
  getQuestions,
};
