const db = require('../data/db.js');

module.exports = {
  get,
  getById,
};

function get() {
  return db('pets')
  .select([
    'pets.id',
    'pets.name',
    'pets.care_instructions',
    'owners.name AS owners_name',
    'species.species'
  ])
  .join('owners', 'owners.id', 'pets.owner_id')
  .join('species', 'species.id', 'pets.species_id')
}

function getById(id) {
  return get().where({ "pets.id": id }).first();
}
