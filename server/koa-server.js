const Koa = require("koa");
const http = require("http");
const { Server } = require("socket.io");

const serve = require("koa-static");
const PORT = process.env.PORT || 3000;
const app = new Koa();

const server = http.createServer(app.callback());
const io = new Server(server);

//need to listen on server
app.use(serve("./client"));

let currentUsers = 0;

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

server.listen(PORT);
