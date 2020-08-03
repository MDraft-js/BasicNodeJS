const http = require('http')
const path = require('path')
const fs = require('fs')

const server = http.createServer((req, res) => {
    if (req.method === 'GET') {
        res.writeHead(200, {
            'Content-Type': 'text/html; charset=utf-8',
        })

        if (req.url === "/") {
                fs.readFile(path.join(__dirname, './views', 'index.html'), 'utf-8', (err, content) => {
                    if (err) throw err
                    res.end(content)
                })
        } else if (req.url === '/about') {
                fs.readFile(path.join(__dirname, './views', 'about.html'), 'utf-8', (err, content) => {
                    if (err) throw err
                    res.end(content)
                })
        } else if (req.url === '/api/users') {
                res.writeHead(200, {
                    'Content-Type': 'text/json',
                })

                const users = [
                    {
                        name: 'Mikun',
                        age: 16
                    },
                    {
                        name: 'Miku',
                        age: 17
                    }
                ]
                res.end(JSON.stringify(users))
        }
        
    } else if (req.method === 'POST') {
        const body = []
        res.writeHead(200, {
            'Content-Type': 'text/html; charset=utf-8'
        })

        req.on('data', data => {
            body.push(Buffer.from(data))
        })

        req.on('end', () => {
            const message = body.toString().split('=')[1]

            res.end(`
        <h1>Ваше сообщение: ${message}</h1>
        `)
            
        })
    }
})

server.listen(3000, () => {
    console.log('Server is running...')
})