'use strict'

const EventIndex = require('orbit-db-eventstore/src/EventIndex')

class FeedIndex extends EventIndex {
  updateIndex(oplog, added) {
    added.reduce((handled, item) => {
      if(!handled.includes(item.hash)) {
        handled.push(item.hash)
        if(item.payload.op === 'ADD') {
          this._index[item.hash] = item
        } else if(item.payload.op === 'DEL') {
          delete this._index[item.payload.value]
        }
      }
      return handled
    }, [])
  }
}

module.exports = FeedIndex
