const db = require('../knexConfig.js');

module.exports = {
  insert,
  remove,
  getAll,
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

function getAll() {
  return db('games');
}

