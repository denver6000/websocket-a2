const {Server}= require("socket.io")

let PORT = process.env.PORT || '6000'
const io = new Server(PORT, {
    cors: {
        origin: "http://192.168.88.13/"
    }
})

console.log('Server Running....')

io.on('connection', socket => {
    console.log(`${socket.id} connected`)
    console.log(`${socket.client.request.headers} connected`)
    socket.emit('welcome-message', "You are connected")
})