const db = require('../data/db')

module.exports = {
  get,
  getById,
  getByOwner, 
  insert
}

function get() {
  return db('owners')
}

function getById(id) {
  const ownerQuery = db('owners').where({id}).first()
  const getPetsQuery = getByOwner(id)
  return Promise.all([ownerQuery, getPetsQuery])
    .then(([owner, pets]) => {
      owner.pets = pets
      return owner
    })
  // return db('owners').where({id}).first()
  //   .then(owner => {
  //     return getByOwner(owner.id)
  //       .then(pets => {
  //         // return {...owner, pets: pets}
  //         owner.pets = pets
  //         return owner
  //       })
  //   })
}

function getByOwner(id) {
  return get()
  .select([
    'pets.name AS pet_name'
  ])
  .join('pets', 'pets.owner_id', 'owners.id')
  .where({ "owners.id": id })
}

function insert(owner) {
  return db('owners')
  .insert(owner, "id")
  .then(([id]) => getById(id))
}
