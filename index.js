const cors = require('cors')

const express = require('express')
const app = express()
app.use(cors())
const http = require('http')
const server = http.createServer(app)
const {Server} = require('socket.io')
const io = new Server(server, {
    cors: {
        origin: ['https://192.168.43.93', 'http://localhost']
    }
})

console.log('Server Running....')

io.on('connection', socket => {
    let test = server.address().address
    console.log(`${socket.id} connected.`)
    socket.emit('server-info', test)

    socket.on("disconnect", () => {
        console.log(`${socket.id} disconnected.`)
    })
})



server.listen(8081, () => {
    console.log(`  is listening on port:8081`)
})