const {Server} = require("socket.io");
const io = new Server(8081, {
    
})

io.on('connection', socket => {
    console.log(`${socket.id} connected`)
    socket.emit('welcome-message', "You are connected")
})