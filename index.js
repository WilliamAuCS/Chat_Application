const express = require("express");
const socket = require("socket.io");

// App setup
const app = express();
const PORT = 4000;
const server = app.listen(PORT, function () {
  console.log("Listening to requests on " + PORT);
});

// Middleware
// Static files
app.use(express.static("public"));

// Socket setup
const io = socket(server); //What server to work with

io.on("connection", function (socket) {
  console.log("made socket connection", socket.id);

  socket.on("chat", function (data) {
    console.log("This is the senders socket", socket.id);
    io.sockets.emit("chat", data);
  });

  socket.on("typing", function (data) {
    socket.broadcast.emit("typing", data);
  });
});
