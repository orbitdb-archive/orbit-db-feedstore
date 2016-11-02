# orbit-db-feedstore

[![npm version](https://badge.fury.io/js/orbit-db-feedstore.svg)](https://badge.fury.io/js/orbit-db-feedstore)

A log database with traversable history. Entries can be added and removed. Useful for *"shopping cart"* type of use cases, or for example as a feed of blog posts or *"tweets"*.

Used in [orbit-db](https://github.com/haadcode/orbit-db).

## Install
```
npm install orbit-db
```

## Usage

First, create an instance of OrbitDB:

```javascript
const IPFS = require('ipfs')
const OrbitDB = require('orbit-db')

const ipfs = new IPFS()
const orbitdb = new OrbitDB(ipfs)
```

Get a feed database and add an entry to it:

```javascript
const feed = orbitdb.feed('haad.posts')
feed.add({ title: 'Hello', content: 'World' })
  .then(() => {
    const posts = feed.iterator().collect()
    posts.forEach((post) => console.log(post.title + '\n', post.content))    
    // Hello 
    // World  
  })
```

Later, when the database contains data, load the history and query when ready:

```javascript
const feed = orbitdb.feed('haad.posts')
feed.events.on('ready', () => {
  const posts = feed.iterator().collect()
  posts.forEach((post) => console.log(post.title + '\n', post.content))
  // Hello 
  // World  
})
```

## API

### feed(name)

  Package: 
  [orbit-db-feedstore](https://github.com/haadcode/orbit-db-feedstore)

  ```javascript
  const db = orbitdb.feed('orbit-db.issues')
  ```

  - **add(data)**
    ```javascript
    db.add({ name: 'User1' }).then((hash) => ...)
    ```
    
  - **get(hash)**
    ```javascript
    const event = db.get(hash)
      .map((e) => e.payload.value)
    // { name: 'User1' }
    ```
    
  - **iterator([options])**
    ```javascript
    // TODO: add all options - gt, gte, lt, lte, limit, reverse
    const all = db.iterator({ limit: -1 })
      .collect()
      .map((e) => e.payload.value)
    // [{ name: 'User1' }]
    ```

  - **remove(hash)**
    ```javascript
    db.remove(hash).then((removed) => ...)
    ```
    
  - **events**

    ```javascript
    db.events.on('data', (dbname, event) => ... )
    ```

    See [events](#stores) for full description.

### events

  Each database in `orbit-db` contains an `events` ([EventEmitter](https://nodejs.org/api/events.html)) object that emits events that describe what's happening in the database.

  - `data` - (dbname, event)
    
    Emitted after an entry was added to the database

    ```javascript
    db.events.on('data', (dbname, event) => ... )
    ```

  - `sync` - (dbname)

    Emitted before starting a database sync with a peer.

    ```javascript
    db.events.on('sync', (dbname) => ... )
    ```

  - `load` - (dbname, hash)

    Emitted before loading the database history. *hash* is the hash from which the history is loaded from.

    ```javascript
    db.events.on('load', (dbname, hash) => ... )
    ```

  - `history` - (dbname, entries)

    Emitted after loading the database history. *entries* is an Array of entries that were loaded.

    ```javascript
    db.events.on('history', (dbname, entries) => ... )
    ```

  - `ready` - (dbname)

    Emitted after fully loading the database history.

    ```javascript
    db.events.on('ready', (dbname) => ... )
    ```

  - `write` - (dbname, hash)

    Emitted after an entry was added locally to the database. *hash* is the IPFS hash of the latest state of the database.

    ```javascript
    db.events.on('write', (dbname, hash) => ... )
    ```

## Contributing

See [orbit-db's contributing guideline](https://github.com/haadcode/orbit-db#contributing).

## License

[MIT](LICENSE) ©️ 2016 Haadcode
