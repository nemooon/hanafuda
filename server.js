const httpServer = require("http").createServer();
const io = require("socket.io")(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  },
});

io.on('connection', socket => {
  socket.on('new message', data => {
    socket.broadcast.emit('message', data);
  });
});

httpServer.listen(3333);
