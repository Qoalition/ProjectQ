# ProjectQ

- [ProjectQ](#projectq)
  - [Setup Instructions:](#setup-instructions)
  - [Database setup](#database-setup)
  - [Database trouble shooting](#database-trouble-shooting)
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

## Database setup

1. If you haven't already, install postgres on your machine.
2. Enter into the postgres shell using `psql`
3. Run `CREATE DATABASE qoalition;`
4. Connect to the DB using `\c qoalition`.
5. Run the following commands to create a fresh DB with some initial data
   Currently includes 5 users, 3 questions, and 5 answers.
   Or simply run a subset of commands you want to use for development.
```
DROP TABLE questions,answers,users,commendations;

-- Create Users Table
CREATE TABLE users (
  user_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  username TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,
  wallet_id TEXT NOT NULL UNIQUE,
  created_at timestamptz NOT NULL DEFAULT now(),
  total_commendations INT DEFAULT 0
);

-- Create Questions Table
CREATE TABLE questions (
  question_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  question TEXT NOT NULL,
  question_description TEXT,
  question_bc_address TEXT NOT NULL UNIQUE,
  num_upvotes INT NOT NULL DEFAULT 0,
  num_downvotes INT NOT NULL DEFAULT 0,
  total_commendations INT NOT NULL DEFAULT 0,
  topic TEXT NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  user_id INT NOT NULL,
  CONSTRAINT fk_user
    FOREIGN KEY (user_id)
      REFERENCES users(user_id)
);

-- Create Answers Table
CREATE TABLE answers (
  answer_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  answer TEXT NOT NULL,
  answer_bc_address TEXT NOT NULL UNIQUE,
  num_upvotes INT NOT NULL DEFAULT 0,
  num_downvotes INT NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  question_id INT NOT NULL,
  CONSTRAINT fk_question
    FOREIGN KEY (question_id)
      REFERENCES questions(question_id),
  user_id INT NOT NULL,
  CONSTRAINT fk_user
    FOREIGN KEY (user_id) 
      REFERENCES users(user_id)
);

-- Create Commendations Table : Currently Unused
CREATE TABLE commendations (
  user_id int NOT NULL,
  CONSTRAINT fk_user
    FOREIGN KEY (user_id) 
      REFERENCES users (user_id),
  question_id int NOT NULL,
  CONSTRAINT fk_question
    FOREIGN KEY (question_id)
      REFERENCES questions (question_id)
);

-- U1
INSERT INTO users(username, password, wallet_id)
  VALUES ('eric', 'joshisawesome', 12345);

-- U2
INSERT INTO users(username, password, wallet_id)
  VALUES ('julia', 'ilovecrypto', 123456);

-- U3
INSERT INTO users(username, password, wallet_id)
  VALUES ('sean', 'cssmaster', 123457);

-- U4
INSERT INTO users(username, password, wallet_id)
  VALUES ('kevin', 'messyroom', 123458);

-- U5
INSERT INTO users(username, password, wallet_id)
  VALUES ('tom', 'nightowl', 1234569);

-- Q1
INSERT INTO questions(question, question_description, question_bc_address, topic, user_id)
  VALUES ('What is the meaning of life?', 'I just want to know why we are living.', 10006, 'Miscellaneous', 1);

-- Q2
INSERT INTO questions(question, question_description, question_bc_address, topic, user_id)
  VALUES ('Where should i learn more about programming?', 'I know nothing.', 10007, 'Technology', 2);

-- Q3
INSERT INTO questions(question, question_description, question_bc_address, topic, user_id)
  VALUES ('Who do you think is going to win the Superbowl?', 'Are the Buccs going to repeat?', 10008, 'sports', 5);

-- A1
INSERT INTO answers(answer, answer_bc_address, question_id, user_id)
  VALUES ('Everything and nothing.', 10001, 1, 2);

-- A2
INSERT INTO answers(answer, answer_bc_address, question_id, user_id)
  VALUES ('There isnt a meaning. Its all just a dream.', 10002, 1, 4);

-- A3
INSERT INTO answers(answer, answer_bc_address, question_id, user_id)
  VALUES ('Codesmith!', 10003, 2, 5);

-- A4
INSERT INTO answers(answer, answer_bc_address, question_id, user_id)
  VALUES ('Yeah they are probably going to repeat. Tom Brady is the GOAT.', 10004, 3, 1);

-- A5
INSERT INTO answers(answer, answer_bc_address, question_id, user_id)
  VALUES ('Packers all the way! GO PACK GO!', 10005, 3, 3);
```

## Database trouble shooting

- When running `psql` you may get this error:
```
psql: error: could not connect to server: No such file or directory
        Is the server running locally and accepting
        connections on Unix domain socket "/tmp/.s.PGSQL.5432"?
```
  - If this is the case you can use the following commands at the risk of damaging any current postgres databases stored locally:
    - `rm /usr/local/var/postgres/postmaster.pid`
    - `brew services restart postgresql`
        
- When running `psql` you may get this error:
```
psql: error: FATAL:  database "<username>" does not exist
```
  - Just run:
    - `psql -d template1`
    - `CREATE DATABASE <username>`
    - Exit out of the psql shell.
      - Now run `psql`, it should just work.

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
