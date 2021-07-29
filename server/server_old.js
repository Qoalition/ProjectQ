const express = require("express");
const app = express()
const path = require("path")
const PORT = 3001;
// const db = require('../server/controllers/wishController.js')
const Web3 = require('web3');
const HashingWell = require('../build/contracts/HashingWell.json');
const { hashWish, deleteAllWishes, getAllWishes } = require('./db/wishesController.js');

require('dotenv').config();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
		res.setHeader("Access-Control-Allow-Credentials", "true");
		res.setHeader("Access-Control-Max-Age", "1800");
		res.setHeader("Access-Control-Allow-Headers", "content-type");
		res.setHeader("Access-Control-Allow-Methods","PUT, POST, GET, DELETE, PATCH, OPTIONS");
  next()
});

const contract_address = process.env.CONTRACT_ADDRESS;
const abi = [
  {
    "anonymous": false,
    "inputs": [],
    "name": "DrainWishes",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "bytes32",
        "name": "wish",
        "type": "bytes32"
      }
    ],
    "name": "WishMade",
    "type": "event"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "_wish",
        "type": "bytes32"
      }
    ],
    "name": "hashWish",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [],
    "name": "drainWishes",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }
]
const options = {
  // Enable auto reconnection
  reconnect: {
      auto: true,
      delay: 5000, // ms
      maxAttempts: 30,
      onTimeout: false
  }
};

const web3 = new Web3(new Web3.providers.WebsocketProvider('ws://localhost:7545', options));  
//get access to contract instance
const contractInstance = new web3.eth.Contract(abi, contract_address)

//use web sockets to enable server to listen for when events are emitted by our contract instance 
//make call to controller to encrypt string and store in db

contractInstance.events.WishMade({})
.on('data', event => {
  console.log('EVENT EMITTED SERVER-data', event.returnValues.wish)
  db.hashWish(event.returnValues.wish);

})
.on('error', event => console.log('Error with event listener', event));

contractInstance.events.DrainWishes({})
.on('data', event => {
  db.deleteAllWishes()
})
.on('error', event => console.log('Error with event listener', event));

app.get('/getWishes', db.getAllWishes, (req, res, next) => {
  console.log('SUCCESS', res.locals.wishes);
  res.status(200).send(res.locals.wishes);
})

// GLOBAL ERROR HANDLER
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.status, errorObj.message);
  return res.status(errorObj.status).send(errorObj.message.err);
});

// RUN SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}...`);
});
