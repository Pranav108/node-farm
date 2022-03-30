const fs = require('fs');


//Blocking, synchronous way
const textIn = fs.readFileSync('./txt/input.txt', 'utf-8');
console.log(textIn);
const textOut = `The content of input.txt file is : ${textIn}\n Created on ${Date.now()}`;
fs.writeFileSync('./txt/output.txt', textOut);
console.log("File written!");