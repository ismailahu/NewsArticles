// websocketServer.js
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
  ('Client connected');

  ws.on('message', (message) => {
    ('Received:', message);
  });

  ws.on('close', () => {
    ('Client disconnected');
  });
});

const broadcastNews = (news) => {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(news));
    }
  });
};

module.exports = { broadcastNews };
