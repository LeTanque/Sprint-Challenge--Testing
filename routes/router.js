const db = require('../knexConfig.js');


module.exports = {
    insert,
    remove,
    getAll,
    getById
};

async function insert(game) {
    const [id] = await db('games').insert(game);

    return db('games')
        .where({ id })
        .first();
}

function remove(id) {
    return db('games')
        .where('id', id)
        .del();
}

async function getAll() {
    const games = await db('games');
    if (!games) return []
    return db('games')
}

function getById(id) {
    return db('games')
      .where({ id })
      .first();
  }
  