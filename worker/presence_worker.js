// Presence worker (placeholder for Redis/Kafka consumers)
// Tracks active users per room and can emit aggregate metrics.
const presence = new Map();
export function userOnline(roomId, userId) {
  if (!presence.has(roomId)) presence.set(roomId, new Set());
  presence.get(roomId).add(userId);
}
export function userOffline(roomId, userId) {
  presence.get(roomId)?.delete(userId);
}
export function roomStats(roomId) {
  return { roomId, online: presence.get(roomId)?.size || 0 };
}
