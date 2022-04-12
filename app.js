const http = require('http');

const fs = require('fs');

const url = require('url');
const querystring = require('querystring');

const server = http.createServer((req, res)=>{
    const url = req.url;
    const method = req.method;
    if (url === '/'){
        res.setHeader('Content-type', 'text/html');
        res.write('<html>');
        res.write('<head><title>my first response </title></head>');
        res.write('<body><form action="/message" method="POST"><input type="text"><button type="submit">send</button></form></body>');
        res.write('</html>');
        return res.end();
    } 
    if (url ==='/message' && method=='POST'){
        fs.writeFileSync('./usersData/message.txt', 'Dummy');
        res.statusCode=302;
        res.setHeader('Location', '/');
        return res.end();
    }
});

server.listen(3000);
