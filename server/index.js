import express from "express"
import { Server as SocketServer } from "socket.io"
import http from "http"
import { Socket } from "dgram"

const port = process.env.PORT ?? 3000
const app = express()
const server = http.createServer(app)
const io = new SocketServer(server)

io.on('connection', socket => {
    console.log('Client conected')
})

server.listen(port, () => {
    console.log(`Servidor corriendo en puerto ${port}`)
})

