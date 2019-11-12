'use strict'

const Store = require('orbit-db-store')
const EventStore = require('orbit-db-eventstore')
const FeedIndex  = require('./FeedIndex')

class FeedStore extends EventStore {
  constructor (ipfs, id, dbname, options) {
    if(!options) options = {}
    if(!options.Index) Object.assign(options, { Index: FeedIndex })
    super(ipfs, id, dbname, options)
    this._type = 'feed'
  }


  remove (hash) {
    return this.del(hash)
  }

  del (hash) {
    const operation = {
      op: 'DEL',
      key: null,
      value: hash
    }
    return this._addOperation(operation)
  }

  static async create (ipfs, identity, address, options) {
    const heads = await FeedStore.loadHeadsFromCache(options.cache, address)
    if (heads.length > 0) {
      options = Object.assign(options, { heads })
    }
    return new FeedStore(ipfs, identity, address, options)
  }
}

module.exports = FeedStore
