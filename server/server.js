const express = require("express");
const http = require("http");
const path = require("path");
const { Server } = require("socket.io");
const app = express();
const server = http.createServer(app);
const io = new Server(server);
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "..", "client")));

let currentUsers = 0;

app.get("/", (req, res) => {
  res.sendFile("/index.html");
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/current-users", (req, res) => {
  res.send(currentUsers);
});

io.on("connection", (socket) => {
  currentUsers++;
  io.emit("current-users", currentUsers);
  socket.on("disconnect", () => {
    currentUsers--;
    io.emit("current-users", currentUsers);
  });
  socket.on("emoji-click", (emoji) => {
    io.emit("emoji-click", emoji);
  });
});

server.listen(port, () => {
  console.log(`🌱 listening on http://localhost:${port}/ 🌱`);
});

//Deta
// module.exports = app;
