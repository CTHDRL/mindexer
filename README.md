
# Ethereum Indexer

Syncs events from Ethereum and indexes them for fast retrieval. This is useful for production Dapps.

_Work in progress_

## Todo

- [x] Local in-memory store
- [ ] BigNumber support in LevelDB
- [ ] Redis in-memory store
- [ ] MongoDB in-memory store
- [ ] Benchmark documentation

## Supported Indexing Stores

* LevelDB

## Install Dependencies

```
yarn install
```

## Testing & Linting

```
yarn test
yarn lint
```

Integration tests (requires synced ethereum node at localhost:8545):

```
yarn test:integration
```

## Example: Sync trading and balance events from decentralized trading contract: EtherDelta

Contract address: https://etherscan.io/address/0x8d12a197cb00d4747a1fe03395095ce2a5cc6819

See `examples/etherdelta/sync.js`.

Define which events to index on which keys:

```javascript
const indexing = {
  events: {
    Withdraw: {
      keys: ['user'],
    },
    Trade: {
      keys: ['tokenGive', 'tokenGet', 'get', 'give'],
    },
  },
};
```

Then create a store:

```javascript
const store = new LevelStore(indexing, '/tmp/etherdelta.db');
```

Now boot up the indexer:

```javascript
const indexer = new Indexer(store, EtherdeltaABI, '0x8d12a197cb00d4747a1fe03395095ce2a5cc6819');
await indexer.syncAll({
  fromBlock: 4906764,
});
```

Once indexing is complete events can be retrieved as follows:

```javascript
const events = await store.get('Withdraw', 'user', '0x13d8d38421eb02973f3f923a71a27917bd483190');
```

## Directory Structure

* `package.json` - Configure dependencies
* `dist/*` - Files generated by babel
* `src` - All source code
* `src/*/__tests__` - Unit tests
* `integration/__tests__` - Integration tests
