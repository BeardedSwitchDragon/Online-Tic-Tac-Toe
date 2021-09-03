const rooms = [];

const addRoom = (room) => {
    rooms.push(room);
};

const addUserToRoom = (user, reqRoom) => {
    // console.log(rooms);
    // console.log(reqRoom);
    const index = rooms.findIndex((room) => {
        console.log(room);
        console.log(room.name);
        return reqRoom.name === room.name;
    });
    console.log(`index,x.d~~!!!! ${index}`);
    rooms[index].users.push(user);
    console.log(rooms);
};

const findRoom = (roomName) => {
    return rooms.find((room) => roomName === room.name);
}

const removeUserFromRoom = (id) => {

    rooms.forEach((room) => {
        for (const [key, value] of Object.entries(room)) {
            if (key === "users") {
                const user = value.find((userId) => userId === id);
                rooms.splice(value.indexOf(user), 1);
            };
        };
    });
};
const removeRoom = (roomName) => {
    const roomToBeDeleted = rooms.find((room) => room.name === roomName);
    rooms.splice(rooms.indexOf(roomToBeDeleted), 1);
}

module.exports = {
    addRoom,
    addUserToRoom,
    removeUserFromRoom,
    findRoom,
    removeRoom
};
