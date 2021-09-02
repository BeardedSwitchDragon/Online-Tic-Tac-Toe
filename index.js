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

const rooms = require("./utils/rooms.js");


// app.get("/", (req, res) => {
//     res.sendFile(__dirname + '/public/index.html');
// })


io.on('connection', (socket) => {
    console.log('a user connected');
    
    socket.on("join", ({username, reqRoom}, callback) => {
        // const currentRoomIndex = rooms.findIndex((room) => room.name === reqRoom);
        // console.log(currentRoomIndex);
        // console.log(rooms[currentRoomIndex]);
        const currentRoom = rooms.findRoom(reqRoom);
        if (currentRoom) {
            // if (rooms.includes(reqRoom) && room.usernames.length < 2) {
            //     return room.usernames.push(username);
            // } else if (room.usernames.length === 2) {
            //     return callback("Room is full");
            // };
            if (currentRoom.users.length < 2) {
                console.log(currentRoom.users.length);
                const user = {
                    username,
                    id: socket.id
                };

                return rooms.addUserToRoom(user, currentRoom);
            } else {
                return callback("Room is full");
            }
        };
        callback();
        // rooms.push({name: reqRoom, users: [{username, id: socket.id}]});
        rooms.addRoom({name: reqRoom, users: [{username, id: socket.id}]});
       // const test = rooms.findIndex((room) => room.name === reqRoom);
        socket.join(reqRoom);
   
    });

    socket.on("playerMove", ({room, squareID}) => {
        console.log("hello" + squareID);
        socket.broadcast.to(room).emit("playerMove", (squareID));
    });

    socket.on("disconnect", () => {
        rooms.removeUserFromRoom(socket.id);
        console.log("user disconnected");
        
    });
});

server.listen(port, () => {
    console.log("Server running on port: " + port);
})