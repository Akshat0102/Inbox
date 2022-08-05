//require path to access the contract path but not run its contents
const path = require('path');
const fs = require('fs');

//require solidity compiler
const solc = require('solc');

//using path and file-system(fs) read contract data in source
const inboxPath = path.resolve(__dirname, 'contracts', 'Inbox.sol');
const source = fs.readFileSync(inboxPath, 'utf-8');

console.log(solc.compile(source, 1));