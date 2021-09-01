const http = require("http");
const express = require("express");
const path = require('path');
const { Server } = require("socket.io");


const app = express();
const port = 3000;
const server = http.createServer(app);

const io = new Server(server);

console.log(path.join(__dirname, 'static'));
app.use(express.static("public"));

// app.get("/", (req, res) => {
//     res.sendFile(__dirname + '/public/index.html');
// })

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on("playerMove", (squareID) => {
        socket.broadcast.emit("playerMove", (squareID));
    });
});

server.listen(port, () => {
    console.log("Server running on port: " + port);
})