'use strict'

const EventStore = require('orbit-db-eventstore')
const FeedIndex  = require('./FeedIndex')

class FeedStore extends EventStore {
  constructor (ipfs, id, dbname, options) {
    if(!options) options = {}
    if(!options.Index) Object.assign(options, { Index: FeedIndex })
    super(ipfs, id, dbname, options)
    this._type = 'feed'
  }

  remove (hash, options = {}) {
    return this.del(hash, options)
  }

  del (hash, options = {}) {
    const operation = {
      op: 'DEL',
      key: null,
      value: hash
    }
    return this._addOperation(operation, options)
  }
}

module.exports = FeedStore
