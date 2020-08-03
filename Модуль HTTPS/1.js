const http = require('http')

const server = http.createServer((req, res) => {
    console.log(req.url);
    res.write('<h1 align="center">Hello from NodeJS</h1>');
    res.write('<h2 align="center">Hello from NodeJS</h2>');
    res.write('<h3 align="center">Hello from NodeJS</h3>');
    res.end(`
        <div style="background: aqua; width: 200px; height: 200px;>">
            <h1>Test</h1>
        </div>
    `);
})

server.listen(3000, () => {
    console.log('Server is Running...');
})
// Переходим в браузере на localhost:3000