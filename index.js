const http = require("http");
const express = require("express");
const path = require('path');
const { Server } = require("socket.io");


const app = express();
const port = process.env.PORT || 3000;
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
            currentRoom.users.forEach((user) => {
                if (user.username.toLowerCase() === username.toLowerCase()) {
                    return callback("Username taken.");
                };
            });
            if (currentRoom.users.length < 2) {
                
                console.log(currentRoom.users.length);
                const user = {
                    username,
                    id: socket.id
                };
                console.log("hi");
                console.log(currentRoom.users);
                console.log(username);
                rooms.addUserToRoom(user, currentRoom);
                socket.broadcast.to(reqRoom).emit("opponentUsername", username);
                // if (currentRoom.users.length === 1) {
                //     console.log("HEYOOOOOOOOOOO " + currentRoom.users[0].username);
                //     socket.broadcast.to(reqRoom).emit("opponentUsername", currentRoom.users[0].username);
                // }

                
            } else {
                return callback("Room is full");
            }
        } else {
            rooms.addRoom({name: reqRoom, users: [{username, id: socket.id}]});
        }
        callback();
        // rooms.push({name: reqRoom, users: [{username, id: socket.id}]});
        
       // const test = rooms.findIndex((room) => room.name === reqRoom);
        socket.join(reqRoom);
   
    });

    socket.on("playerMove", ({room, squareID}) => {
        console.log("hello" + squareID);
        socket.broadcast.to(room).emit("playerMove", (squareID));
    });

    socket.on("opponentUsername2", ({username, room}) => {
        console.log("opposne hi p2" + username + room);
        socket.broadcast.to(room).emit("opponentUsername2", username);
    })

    socket.on("win", (room) => {
        console.log("WINNNNN");
        io.to(room).emit("win");
    });

    socket.on("disconnect", () => {
        rooms.removeUserFromRoom(socket.id);
        console.log("user disconnected");
        socket.broadcast.emit("userDisconnect");
        
        
        
    });
});

server.listen(port, () => {
    console.log("Server running on port: " + port);
})