'use strict';

const NdjsonParser = require('./ndjson-parser')

class Games {
  constructor(client) {
    this._client = client
  }

  current(options) {
    const path = 'api/account/playing'

    return this._client.get(path, {}, options).then(JSON.parse)
  }

  get(gameId, options = {}) {
    const path = `game/export/${gameId}`

    const headers = {
      'Accept': 'application/json',
    }

    return this._client.get(path, headers, options)
      .then(JSON.parse)
  }

  listByIds(ids, options = {}) {
    const idString = ids.join(',')
    const path = 'games/export/_ids'

    const headers = {
      'Accept': 'application/x-ndjson',
    }

    return this._client.post(path, headers, idString, options)
      .then(games => games === "" ? [] : NdjsonParser.parse(games))
  }

  listByUser(username, options = {}) {
    const path = `api/games/user/${username}`

    const headers = {
      'Accept': 'application/x-ndjson',
    }

    return this._client.get(path, headers, options)
      .then(games => games === "" ? [] : NdjsonParser.parse(games))
  }
}

module.exports = Games
