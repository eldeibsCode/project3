const http = require('http');

const url = require('url');
const querystring = require('querystring');

const server = http.createServer((req, res)=>{
    const url = req.url;
    if (url === '/'){
        res.setHeader('Content-type', 'text/html');
        res.write('<html>');
        res.write('<head><title>my first response </title></head>');
        res.write('<body><form action="/message" method="POST"><input type="text"><button type="submit">send</button></form></body>');
        res.write('</html>');
        return res.end();
    } 
});

server.listen(3000);
