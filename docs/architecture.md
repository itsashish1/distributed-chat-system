# Architecture Notes
1. Client -> Gateway WebSocket
2. Gateway publishes messages to room topic
3. Workers consume topic and persist messages (future extension)
4. Fanout service sends to connected sockets across nodes
5. Offline users get replay from durable storage
## Scaling Strategy
- Hash room IDs to shards
- Horizontal gateway scaling behind load balancer
- Sticky sessions for websocket affinity
- Redis/Kafka for cross-node event propagation
