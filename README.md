# orbit-db-feedstore

[![npm version](https://badge.fury.io/js/orbit-db-feedstore.svg)](https://badge.fury.io/js/orbit-db-feedstore)

A log database with traversable history. Entries can be added and removed. Useful for *"shopping cart"* type of use cases, or for example as a feed of blog posts or *"tweets"*.

Used in [orbit-db](https://github.com/haadcode/orbit-db).

## Table of Contents

- [Install](#install)
- [Usage](#usage)
- [API](#api)
- [Contributing](#contributing)
- [License](#license)

## Install
```
npm install orbit-db ipfs
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

  See [Events](https://github.com/haadcode/orbit-db-store#events) for full description

## Contributing

See [orbit-db's contributing guideline](https://github.com/haadcode/orbit-db#contributing).

## License

[MIT](LICENSE) ©️ 2016 Haadcode
