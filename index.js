const fs = require('fs');

fs.readFile('./txt/start.txt', 'utf-8', (err, data1) => {
    fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err, data2) => {
        fs.readFile('./txt/append.txt', 'utf-8', (err, data3) => {
            fs.writeFile('./txt/final.txt', `this contend is being added in this file : \n${data2} \n${data3}`, err => {
                console.log('File written succesfully🤩');
            });
        });
    });
});
