const db = require('../database/dbConfig');

module.exports = {
  add,
  find,
  findBy,
  findById,
  findListings,
  update,
  remove
};

function find() {
  return db('users').select('id', 'username', 'email');
}

function findBy(filter) {
  return db('users').where(filter);
}

async function add(user) {
  const [id] = await db('users').insert(user, 'id');
  return findById(id);
}

function findById(id) {
  return db('users')
    .select('id', 'username')
    .where({ id })
    .first();
}

function update(id, user) {
  return db('users')
    .where('id', Number(id))
    .update(user);
}

function remove(id) {
  return db('users')
    .where('id', Number(id))
    .del();
}

function findListings(id) {
  return db('listings as l')
    .select(
      'l.id',
      'l.location',
      'l.description',
      'l.price',
      'l.image',
      'l.start_date',
      'l.end_date'
    )
    .join('users as u', 'u.id', 'l.id')
    .where('l.id', id);
}
