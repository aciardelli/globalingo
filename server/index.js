const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');

const server = http.createServer(app);
app.use(cors());

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
});

io.on('connection', (socket) => {
    console.log(`USER CONNECTED: ${socket.id}`);

    socket.on('disconnect', () => {
        console.log('user disconnected', socket.id)
    });
});

server.listen(3001, () => {

    console.log('listening on PORT 3001');
});