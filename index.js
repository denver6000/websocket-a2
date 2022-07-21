const cors = require('cors')
const express = require('express')
const app = express()
app.use(cors())
const http = require('http')
const server = http.createServer(app)
const {Server} = require('socket.io')

let port = process.env.PORT || '6000'
const io = new Server(server, {
    cors: {
        origin: ['https://192.168.43.93', 'http://localhost']
    }
})

console.log('Server Running....')

io.on('connection', socket => {
    let test = server.address().address
    console.log(`${socket.id} connected.`)
    socket.broadcast.emit('new-socket', `${socket.id} connected.`)
    socket.on("disconnect", () => {
        console.log(`${socket.id} disconnected.`)
    })
})

server.listen(port, () => {
    console.log(`  is listening on port:${server.address().port}`)
})