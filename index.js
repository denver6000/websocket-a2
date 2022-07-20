const {Server} = require("socket.io");
let PORT = process.env.PORT || 6000
const io = new Server(PORT, {
    
})

io.on('connection', socket => {
    console.log(`${socket.id} connected`)
    socket.emit('welcome-message', "You are connected")
})