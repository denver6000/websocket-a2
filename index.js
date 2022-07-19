import { WebSocketServer } from "ws"
let PORT = process.env.PORT || 8081
const wss = new  WebSocketServer({port: PORT})

console.log(`PORT ${PORT}`)

wss.on('connection', function connection (ws, req) {
    if(wss.clients.size > 2){
        ws.send('Server is full.')
        ws.close()
        ws.terminate()
    } else {
        
        console.log(`[SERVER] ${req.socket.address().address} connected.`)
        console.log(`[SERVER] ${wss.clients.size} connections are active.`)
    }

    console.log(`[SERVER] ${req.socket.address().address} connected.`)
    ws.on('close', () => {
        console.log(`[SERVER] A connection disconnected.`)
        console.log(`[SERVER] ${wss.clients.size} connections are active.`)
    })

    ws.on('message', data => {
        console.log(`[CLIENT] ${req.socket.address().address}:${req.socket.address().port} says ${data}`)
    })

    ws.send('HI')

    if(wss.clients.size == 2) {
        let counter = 1
        let clients = []
        wss.clients.forEach(client => {
            client.send(`[CLIENT#${counter}] says ${client.url}`)
            clients.push(client)
            counter++
            
        })
        clients[0].on('message', data => {
            clients[1].send(data)
        })
    }
})