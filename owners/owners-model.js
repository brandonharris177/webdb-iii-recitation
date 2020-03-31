const db = require('../data/db')

module.exports = {
  get,
  getById
}

function get() {
  return db('owners')
}

function getById(id) {
  return db('owners').where({id}).first()
}
