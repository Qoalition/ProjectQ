# ProjectQ

Instructions:

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
 4. Something

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
        
