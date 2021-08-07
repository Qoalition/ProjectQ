// const assert = require('assert');
// const ganache = require('ganache-cli');
// const Web3 = require('web3');
// const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:9545"));

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/MetaCoin.sol";

let accounts;
let rootContract;
let questionContractAddress;

// beforeEach(async () => {
//   accounts = await web3.eth.getAccounts();

//   rootContract = await new web3.eth.Contract(JSON.parse(compiledRoot.interface))
//     .deploy({ data: compiledRoot.bytecode })
//     .send({ from: accounts[0], gas: '1000000' });

//   await rootContract.methods.addQuestion(1).send({
//     from: accounts[0],
//     gas: '1000000'
//   });

//   [questionContractAddress] = await rootContract.methods.getQuestions().call();
//   question = await new web3.eth.Contract(
//     JSON.parse(compiledQuestion.interface),
//     questionContractAddress
//   );
// });

// describe('RootFactory', () => {
//   it('deploys a factory and a question contract', () => {
//     // assert.ok(rootContract.options.address);
//     assert.ok(question.options.address);
//   });

//   it('marks caller as the campaign manager', async () => {
//     const manager = await rootContract.methods.manager().call();
//     assert.strictEqual(accounts[0], manager);
//   });
// });

