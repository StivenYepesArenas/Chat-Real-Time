import express from "express"
import { Server as SocketServer } from "socket.io"
import http from "http"


const port = process.env.PORT ?? 3000
const app = express()
const server = http.createServer(app)
const io = new SocketServer(server)

io.on('connection', socket => {
    console.log('Client conected')

    socket.on('mensaje', (body) => {
        socket.broadcast.emit('mensaje', {
            body,
            from: socket.id.slice(6)
        })
    })

})

server.listen(port, () => {
    console.log(`Servidor corriendo en puerto ${port}`)
})

