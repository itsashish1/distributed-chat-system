..1# Distributed Chat System
A system-design style project that demonstrates scalable chat architecture.
## Highlights
- WebSocket gateway for client connections
- Pub/Sub style message fanout design
- Room sharding strategy (hash-based)
- Delivery acknowledgements and offline queue concept
- Clean design docs included
## Stack
- Node.js, ws
- Redis-compatible pub/sub design (pluggable)
