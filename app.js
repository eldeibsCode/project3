const http = require('http');

const server = http.createServer((req, res)=>{
    var url_parts = url.parse(req.url, true);
    var query = url_parts.query;
    console.log(query;
});

server.listen(3000);
