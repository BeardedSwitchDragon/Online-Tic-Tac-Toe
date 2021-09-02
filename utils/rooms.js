const rooms = [];

const addRoom = (room) => {
    rooms.push(room);
};

const addUserToRoom = (user, room) => {
    rooms[rooms.indexOf((name) => room === name)].users.push(user);
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

module.exports = {
    addRoom,
    addUserToRoom,
    removeUserFromRoom,
    findRoom
};
