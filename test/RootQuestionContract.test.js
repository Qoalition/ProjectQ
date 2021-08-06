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

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();

  rootContract = await new web3.eth.Contract(JSON.parse(compiledRoot.interface))
    .deploy({ data: compiledRoot.bytecode })
    .send({ from: accounts[0], gas: '1000000' });

  await rootContract.methods.addQuestion(1).send({
    from: accounts[0],
    gas: '1000000'
  });

  [questionContractAddress] = await rootContract.methods.getQuestions().call();
  question = await new web3.eth.Contract(
    JSON.parse(compiledQuestion.interface),
    questionContractAddress
  );
});

describe('RootFactory', () => {
  it('deploys a factory and a question contract', () => {
    // assert.ok(rootContract.options.address);
    assert.ok(question.options.address);
  });

  it('marks caller as the campaign manager', async () => {
    const manager = await rootContract.methods.manager().call();
    assert.strictEqual(accounts[0], manager);
  });
});

//   it('allows people to contribute money and marks them as approvers', async () => {
//     await campaign.methods.contribute().send({
//       value: '200',
//       from: accounts[1]
//     });
//     const isContributor = await campaign.methods.approvers(accounts[1]).call();
//     assert(isContributor);
//   });

//   it('requires a minimum contribution', async () => {
//     try {
//       await campaign.methods.contribute().send({
//         value: '5',
//         from: accounts[1]
//       });
//       assert(false);
//     } catch (err) {
//       assert(err);
//     }
//   });

//   it('allows a manager to make a payment request', async () => {
//     await campaign.methods
//       .createRequest('Buy batteries', '100', accounts[1])
//       .send({
//         from: accounts[0],
//         gas: '1000000'
//       });
//     const request = await campaign.methods.requests(0).call();

//     assert.equal('Buy batteries', request.description);
//   });

//   it('processes requests', async () => {
//     await campaign.methods.contribute().send({
//       from: accounts[0],
//       value: web3.utils.toWei('10', 'ether')
//     });

//     await campaign.methods
//       .createRequest('A', web3.utils.toWei('5', 'ether'), accounts[1])
//       .send({ from: accounts[0], gas: '1000000' });

//     await campaign.methods.approveRequest(0).send({
//       from: accounts[0],
//       gas: '1000000'
//     });

//     await campaign.methods.finalizeRequest(0).send({
//       from: accounts[0],
//       gas: '1000000'
//     });

//     let balance = await web3.eth.getBalance(accounts[1]);
//     balance = web3.utils.fromWei(balance, 'ether');
//     balance = parseFloat(balance);

//     assert(balance > 104);
//   });
// }); 