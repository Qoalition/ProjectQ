
const connectToContract = () => {
  let web3;
  //getInitialProps migrate once connected
  //is client connected to provider? if yes...
  // set the provider you want from Web3.providers -- use local ganache
  web3 = new Web3(new Web3.providers.WebsocketProvider('ws://localhost:7545'));
  setProvider(web3);
  // const web3 = new Web3(new Web3.providers.WebsocketProvider(URL));  
  const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
  setContract(contract);
  let accounts = await web3.eth.getAccounts();
  setAccounts(accounts[0]);
}