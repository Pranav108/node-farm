const fs = require('fs');
const http = require('http');
const url = require('url');

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

const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`).toString();
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`).toString();
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`).toString();
const apiData = fs.readFileSync(`${__dirname}/dev-data/data.json`);
const productData = JSON.parse(apiData);
const replaceTemplate = (temp, product) => {
    let output = temp.replace(/{%PRODUCT_IMAGE%}/g, product.image);
    output = output.replace(/{%IS_ORGANIC%}/g, product.organic ? '' : 'not-organic');
    output = output.replace(/{%PRODUCT_NEUTRIENTS%}/g, product.nutrients);
    output = output.replace(/{%PRODUCT_QUANTITY%}/g, product.quantity);
    output = output.replace(/{%PRODUCT_NAME%}/g, product.productName);
    output = output.replace(/{%DESCRIPTION%}/g, product.description);
    output = output.replace(/{%PRODUCT_PRICE%}/g, product.price);
    output = output.replace(/{%PRODUCT_PLACE%}/g, product.from);
    output = output.replace(/{%ID%}/g, product.id);
    return output;
};

const server = http.createServer((req, res) => {
    const { query, pathname } = url.parse(req.url, true);
    //OVERVIEW PAGE
    if (pathname === '/' || pathname === '/overview') {
        res.writeHead(200, { 'Content-type': 'text/html' });
        const cardhtmlList = productData.map(el => replaceTemplate(tempCard, el)).join('');
        const output = tempOverview.replace(/{%PRODUCT_CARD%}/g, cardhtmlList);
        res.end(output);
    }
    //PRODUCT PAGE
    else if (pathname === '/product') {
        res.writeHead(200, { 'Content-type': 'text/html' });
        const product = productData[query.id];
        const output = replaceTemplate(tempProduct, product);
        res.end(output);
    }
    //API  
    else if (pathname == '/api') {
        res.writeHead(200, { 'Content-type': 'application/json' });
        res.end(apiData);
    }
    //NOT FOUND
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