const Contract = require('./contract.js')
const { abi } = require('../build/contracts/RootQuestionsContract.json')

const contract = new Contract(abi, process.env.CONTRACT_ADDRESS)

module.exports = {
  contract
}
