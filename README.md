# ProjectQ

- [ProjectQ](#projectq)
  - [Setup Instructions:](#setup-instructions)
  - [Quick Start Instructions](#quick-start-instructions)
  - [Without Ganache](#without-ganache)
  - [Contributors](#contributors)


Qoalition is a decentralised blockchain community for curious minds!

With Qoalition, you can earn while you learn! Ask and answer questions on Qoaltion and get paid in crypto currency.

## Setup Instructions:

 1. Install Ganache locally  `brew install --cask ganache`.
 - Choose Ethereum (Quickstart)
 2. Install Dependencies
  ```
  npm i -g truffle
  npm i
  ```
 4. Pair the app with Ganache 

  - Click the settings icon in the top right side
  - Click 'Add Project' button
  - Find the `truffle-config.js` file and pair 
  - Click top right button, Save and Restart
 3. Pair Truffle with Ganache
  ```
  truffle migrate --reset
  ```
 4. Instantiate contract instance with local test network

  - Copy the contact address e.g. `0x8732939cE66C8752ED55d0e186A8cdc0a66C0c59`
  - Update the `CONTRACT_ADDRESS` value in the `.env` file in the root folder.
  - Update the `CONTRACT_ADDRESS` in the `contractData.js` file in the root folder.
 5. Start server
  ```
  cd server
  npm run start-dev
  ```
 6. Start Client
  ```
  cd client
  npm i 
  npm run build
  npm run start
  ```
        
## Quick Start Instructions

1. Start the server
```
cd server
npm run start-dev
```
2. Start the front end
```
cd client
npm run start
```
3. Open Ganache

## Without Ganache

1. Start Truffle
```
npx truffle develop
truffle migrate --reset // remove --reset normally
```
2. If you are running it first time locally
```
truffle migrate --reset
```
3. Copy the contract address that appears.
4. Place it in `contractData.js` and in `.env` as the `CONTRACT_ADDRESS`.

## Contributors

- Julia Collins
- Tom Harper
- Kevin Berlanga
- Eric Wilding
- Sean Yalda
