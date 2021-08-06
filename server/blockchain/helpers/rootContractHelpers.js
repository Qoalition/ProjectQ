
const RootQuestionsContract = require("../classes/RootQuestionContractClass.js");
const address = process.env.CONTRACT_ADDRESS;
const rootContract = new RootQuestionsContract(address);

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

module.exports = {
  addQuestion,
  getQuestions,
};
