const httpServer = require("http").createServer();
const Chance = require('chance');
const setHours = require('date-fns/setHours')

const io = require("socket.io")(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  },
});

const chance = new Chance();

io.on('connection', socket => {

  socket.on('chat/connect', (callback) => {

    socket.on('chat/input', (payload) => {
      socket.broadcast.emit('chat/typing', payload);
    });
  
    socket.on('chat/say', (payload, callback) => {
      const message = {
        id: chance.guid(),
        date: new Date(),
        sender: payload.sender,
        body: payload.body,
      }
      console.log(message)
      socket.broadcast.emit('chat/message', message);
      callback(message)
    });

    callback({
      messages: [
        {
          id: chance.guid(),
          date: setHours(new Date(), 9),
          sender: 'プレイヤー',
          body: 'おはよう！！',
        },
        {
          id: chance.guid(),
          date: setHours(new Date(), 12),
          sender: 'プレイヤー',
          body: 'こんにちは！',
        },
        {
          id: chance.guid(),
          date: setHours(new Date(), 20),
          sender: 'プレイヤー',
          body: 'こんばんは！',
        },
      ],
    });
  });

});

httpServer.listen(3333);
