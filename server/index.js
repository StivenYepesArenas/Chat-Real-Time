import express from "express"
import { Server as SocketServer } from "socket.io"
import http from "http"


const port = process.env.PORT ?? 3000
const app = express()
const server = http.createServer(app)
const io = new SocketServer(server)

io.on('connection', socket => {
    console.log('Un usuario se ha conectado')

    socket.on('disconnect', () => {
        console.log('Un usuario se ha desconectado');
    })

    socket.on('mensaje', (body) => { //Evento en el que el bak escucha lo que le envian desde el front
        socket.broadcast.emit('mensaje', { //Evento desde el cual enviamos a front de otros servidores conectados el mensaje.
            body,
            from: socket.id.slice(6)
        })
    })

})

server.listen(port, () => {
    console.log(`Servidor corriendo en puerto ${port}`)
})

