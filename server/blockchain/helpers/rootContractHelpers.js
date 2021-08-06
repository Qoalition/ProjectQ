
const RootQuestionsContract = require("../classes/RootQuestionContractClass.js");
const address = "0xF652733051367A1dB48D7C0E61F2144BdA52Fd60";
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
