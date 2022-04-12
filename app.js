const http = require('http');

const url = require('url');
const querystring = require('querystring');

const server = http.createServer((req, res)=>{
    console.log(req);
    res.setHeader('Content-type', 'text/html');
    res.write('<html>');
    res.write('<head><title>my first response </title></head>');
    res.write('<body><h1>my first response </h1></body>');
    res.write('</html>');
    res.end();
});

server.listen(3000);
