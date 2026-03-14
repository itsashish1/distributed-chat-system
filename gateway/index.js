import { WebSocketServer } from 'ws';
import crypto from 'crypto';
const wss = new WebSocketServer({ port: 8090 });
const rooms = new Map();
const shard = (roomId, total = 4) => {
  const h = crypto.createHash('md5').update(roomId).digest('hex');
  return parseInt(h.slice(0, 2), 16) % total;
};
function getRoom(roomId) {
  if (!rooms.has(roomId)) rooms.set(roomId, new Set());
  return rooms.get(roomId);
}
wss.on('connection', (socket) => {
  let roomId = null;
  socket.on('message', (raw) => {
    const msg = JSON.parse(raw.toString());
    if (msg.type === 'join') {
      roomId = msg.roomId;
      getRoom(roomId).add(socket);
      socket.send(JSON.stringify({ type: 'meta', message: Joined shard- }));
      return;
    }
    if (msg.type === 'chat' && roomId) {
      const payload = { type: 'chat', from: msg.from, text: msg.text, ts: Date.now() };
      for (const client of getRoom(roomId)) {
        if (client.readyState === 1) client.send(JSON.stringify(payload));
      }
      socket.send(JSON.stringify({ type: 'ack', messageId: msg.messageId || null }));
    }
  });
  socket.on('close', () => {
    if (roomId && rooms.has(roomId)) rooms.get(roomId).delete(socket);
  });
});
console.log('Distributed chat gateway listening on ws://localhost:8090');
