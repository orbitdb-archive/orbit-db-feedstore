'use strict';

const EventIndex = require('orbit-db-eventstore/src/EventIndex');

class FeedIndex extends EventIndex {
  updateIndex(oplog, added) {
    added.reduce((handled, item) => {
      if(handled.indexOf(item.hash) === -1) {
        handled.push(item.hash);
        if(item.payload.op === 'ADD') {
          this._index[item.hash] = item.payload
        } else if(item.payload.op === 'DEL') {
          delete this._index[item.payload.value];
        }
      }
      return handled;
    }, []);
  }
}

module.exports = FeedIndex;
