//grab out instance of web3 provider
const Web3 = require('web3');

class Contract {

  constructor(CONTRACT_ABI, CONTRACT_ADDRESS) {
    this.web3;
    this.contract;
    this.accounts;
    this.contract_abi = CONTRACT_ABI;
    this.contract_address = CONTRACT_ADDRESS;
    this.contractInit();
  }

  async contractInit() {
    // TRUFFLE CONFIG
    // if(process.env.CONTRACT_TESTNET === 'truffle') {
    //   this.web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:9545')); 
    //   console.log("CONNECTED TO TRUFFLE ", this.web3)
    // }
    // else if (process.env.CONTRACT_TESTNET === 'ganache') {
    this.web3 = new Web3(new Web3.providers.WebsocketProvider('ws://localhost:7545'));
    // console.log("CONNECTED TO ganache", this.web3)
    // }

    this.contract = new this.web3.eth.Contract(this.contract_abi, this.contract_address);
    this.accounts = await this.web3.eth.getAccounts();
  }

  async createQuestion(questionDbId) {
    try {
      const res = await this.contract.methods.addQuestion(questionDbId).send({
        from: this.accounts[0]
      });

      // console.log(" DEBUG :: createQuestion res => ", res)

    } catch (error) {
      // console.log('Error when calling contract to createQuestion', error)
    }
  }

}

module.exports = Contract