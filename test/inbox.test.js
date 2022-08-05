const assert = require('assert');
const ganache = require('ganache');

//Web3 is a constructor of web3 library and web3 is an instance created
const Web3 = require('web3');

//provider is a communication layer used to interact b/w web3 and ganache
const web3 = new Web3(ganache.provider());

