const express = require("express");
const path = require('path');

const app = express();
const port = 3000;
console.log(path.join(__dirname, 'static'));
app.use(express.static("public"));

app.get("/", (req, res) => {
    console.log("sds");
})

app.listen(port, () => {
    console.log("Server running on port: " + port);
})