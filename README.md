# MINDEXER

Minimal performant ethereum blockchain indexer. Forked from: https://github.com/dominiek/eth-indexer

Track all events on chain for a specific contract or address, starting at a particular block. Keeps tracks of the blocks it has and has not indexed, so it can be used as either a long-running process or a polling process.

Data can be synced to either the local file system or firebase firestore.

### Set Node Version & Install Dependencies

```
nvm use
npm install
```

Basic example in [example/index.js](example/index.js)
