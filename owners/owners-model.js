const db = require('../data/db')

module.exports = {
  get,
  getById,
  getByOwner
}

function get() {
  return db('owners')
}

function getById(id) {
  return db('owners').where({id}).first()
    .then(owner => {
      return getByOwner(owner.id)
        .then(pets => {
          return {...owner, pets: pets}
        })
    })
}

function getByOwner(id) {
  return get()
  .select([
    'pets.name AS pet_name'
  ])
  .join('pets', 'pets.owner_id', 'owners.id')
  .where({ "owners.id": id })
}
