const fs = require('fs');
const http = require('http');

////////////////////////////////////////////////////////////
//File Handeling Intro

//Blocking, synchronous way
// const textIn = fs.readFileSync('./txt/input.txt', 'utf-8');
// console.log(textIn);
// const textOut = `The content of input.txt file is : ${textIn}\n Created on ${Date.now()}`;
// fs.writeFileSync('./txt/output.txt', textOut);
// console.log("File written!");


//Non-Blocking, Asynchronous way
// fs.readFile('./txt/start.txt', 'utf-8', (err1, data) => {
//     if (err1) return console.log("Unable to read start.txt file");
//     fs.readFile(`./txt/${data}.txt`, 'utf-8', (err2, data2) => {
//         if (err2) return console.log(`Unable to read ${data2}.txt file`);
//         fs.readFile('./txt/append.txt', 'utf-8', (err3, data3) => {
//             if (err3) return console.log(`Unable to read append.txt file`);
//             fs.writeFile('./txt/final.txt', `Content of final file is : ${data2} \n ${data3}`, 'utf-8', (err) => {
//                 if (err) throw err;
//                 console.log("file written successFully!");
//             });
//         });
//     });
// });

///////////////////////////////////////////////////////////////////
//SERVER

const server = http.createServer((req, res) => {
    // console.log(req);
    const pathName = req.url;
    if (pathName === '/' || pathName === '/overview') res.end("This is an OVERVIEW page.");
    else if (pathName === '/category') res.end("This is an CATEGORY page.");
    else {
        res.writeHead(404, {
            'Content-type': 'text/html',
            'my-own-header': 'hello-world'
        });
        res.end("<h1>Page NOT found :(</h1>");
    }

});

server.listen(8800, '127.0.0.2', () => {
    console.log("listening to request on port 8800");
});