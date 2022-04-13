const http = require('http');

const taskServer = http.createServer((req, res) => {
    // console.log(req);
    if(req.url ==='/create-user' && req.method ==="POST"){
        const input = [];
        req.on('data', (chunk) => {
            input.push(chunk)
        });
        return req.on('end', () => {
            const parsedInput = Buffer.concat(input).toString();
            console.log(parsedInput.split('=')[1]);
            res.statusCode=302;
                res.setHeader('Location', '/');
                return res.end();
        });
    }
    if (req.url ==="/"){
        res.setHeader('Content-type', 'text/html');
        res.write('<html>');
        res.write('<head><title>task 1</title></head>');
        res.write('<body>');
        res.write('<h1>Hello World!</h1>');
        res.write('<form action="/create-user" method="POST"><input type="text" name="username"> <button type="submit">send</button>');
        res.write('</body>');
        res.write('</html>');
        return res.end();
    }
    if(req.url ==='/users'){
        res.setHeader('Content-type', 'text/html');
        res.write('<html>');
        res.write('<head><title>my first response </title></head>');
        res.write('<body><ul>');
        res.write('<li><h3>User 1</h3></li>');
        res.write('<li><h3>User 2</h3></li>');
        res.write('<li><h3>User 3</h3></li>');
        res.write('</ul></body>');
        res.write('</html>');
        return res.end();  
    }
});
taskServer.listen(3000);