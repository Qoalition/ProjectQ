import React, { useState, useEffect } from 'react'
import { InputGroup, FormControl, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import Web3 from 'web3';
import { CONTRACT_ABI, CONTRACT_ADDRESS, URL  } from '../../contractData';
import Stars from './Stars';
import Router from 'next/router'
import Image from 'next/image';
import rocket from '../public/rocket.png';
import { motion } from 'framer-motion';

const Input = (props) => {
 
  const [wish, setWish] = useState('');
  const [web3, setProvider] = useState(null);
  const [account, setAccounts] = useState(null);
  const [contractInstance, setContract] = useState(null);

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
     Click to Empty the Sky, and Start Anew.
    </Tooltip>
  );

 useEffect( async () => {
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
 }, [])
  

const onSend = async () => {
    try {
      await contractInstance.methods.drainWishes().send({
        from: account
      });
    } catch (error) {
      console.log('Error when calling contract to drainWishes', error)
    }
    setTimeout(()=> {
      Router.push({
        pathname: '/'
    })
    }, 1000)
}

const onSubmit = async (e) => {
     e.preventDefault();

    const params = web3.utils.asciiToHex(wish).padEnd(66, "0");
    try {
        await contractInstance.methods.hashWish(params).send({
      from: account
    });
    } catch (error) {
      console.log('Error when calling contract to hashWish', error)
    }

    setWish('');
    //setTimeout and reroute to index.js so getInitialProps can update state of stars
    setTimeout(()=> {
      Router.push({
        pathname: '/'
    })
    }, 1000)
  }

  return (
    <div>
    <div id='input-form'>
    <InputGroup className="mb-3" id='form' onSubmit={onSubmit}>
    <Button onClick={onSubmit} variant="outline-secondary" id="button-addon1">
      Button
    </Button>
    <FormControl
      aria-label="form-button"
      aria-describedby="basic-addon1"
      value={wish}
      onChange={e => setWish(e.target.value)}
    />
  </InputGroup>
    </div>
    <OverlayTrigger
    style={{zIndex: '7', fontSize: '16px'}}
    placement="top"
    delay={{ show: 250, hide: 400 }}
    overlay={renderTooltip}
  >
    <motion.div 
    animate={{ y: -30 }}
    transition={{ type: "spring", stiffness: 10 }}
    id="rocket-container">
    <Image className="rocket" onClick={onSend} src={rocket} width={80} height={100} alt="rocket" />
    </motion.div>
    </OverlayTrigger>
    </div>
  )
}

export default Input;
