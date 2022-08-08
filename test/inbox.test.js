const assert = require('assert');
const ganache = require('ganache');
const { interface, bytecode } = require('../compile');

//Web3 is a constructor of web3 library and web3 is an instance created
const Web3 = require('web3');

//provider is a communication layer used to interact b/w web3 and ganache
const web3 = new Web3(ganache.provider());

let accounts, inbox;

beforeEach(async () => {
    //Get a list of all accounts
    accounts = await web3.eth.getAccounts()

    //Use one of the accounts to deploy the contract

    //interface or ABI given by solc as one of the o/p have to be parsed by JSON to give javascript object
    inbox = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({
            data: bytecode, //bytecode is the other o/p given by solc after compiling the contract
            arguments: ["Gotcha"]
        })
        .send({
            from: accounts[0],
            gas: '1000000'
        })
});

describe('Inbox', () => {
    it('contract deployed', () => {
        assert.ok(inbox.options.address);
    });

    it('contains def msg', async () => {
        const message = await inbox.methods.message().call();
        assert.equal(message, "Gotcha")
    });

    it('updates msg', async () => {
        await inbox.methods.setMessage("Gotcha Again").send({ from: accounts[0] });
        const message = await inbox.methods.message().call();
        assert.equal(message, "Gotcha Again");
    })
});