const httpServer = require("http").createServer();
const Chance = require('chance');
const set = require('date-fns/set')

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
          date: set(new Date(), { hours: 9 }),
          sender: { name: 'プレイヤー' },
          body: 'おはよう！！',
        },
        {
          id: chance.guid(),
          date: set(new Date(), { hours: 12 }),
          sender: { name: 'プレイヤー' },
          body: 'こんにちは！',
        },
        {
          id: chance.guid(),
          date: set(new Date(), { hours: 20 }),
          sender: { name: 'プレイヤー' },
          body: 'こんばんは！',
        },
      ],
    });
  });

});

httpServer.listen(3333);
