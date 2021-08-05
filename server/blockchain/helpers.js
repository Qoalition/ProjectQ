
const Web3 = require('web3');
const { abi } = require('../../build/contracts/RootQuestionsContract.json')

const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:9545'));
const contract = new web3.eth.Contract(abi, '0x96cEeC22670f9A006e7dbDeeAf63a2963c7Add93');
const accounts = web3.eth.getAccounts();

const addQuestion = async (req, res) => {
  try {
    // Change 2 to dynamic value passed in from previous middleware function
    const result = await contract.methods.addQuestion(2).call();
    return res.send(result)
  } catch (error) {
    return res.send({error: error.message})
  }
};


module.exports = { addQuestion };
