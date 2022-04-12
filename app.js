const http = require('http');

const url = require('url');
const querystring = require('querystring');

const server = http.createServer((req, res)=>{
    console.log(req);
});

server.listen(3000);
