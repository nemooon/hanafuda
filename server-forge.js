const fs = require("fs");
const httpServer = require("https").createServer({
  key: fs.readFileSync("/etc/nginx/ssl/koikoi.sapa.dev/1094829/server.key"),
  cert: fs.readFileSync("/etc/nginx/ssl/koikoi.sapa.dev/1094829/server.crt"),
});
const io = require("socket.io")(httpServer);

io.on('connection', socket => {
  socket.on('new message', data => {
    socket.broadcast.emit('message', data);
  });
});

httpServer.listen(3333);
