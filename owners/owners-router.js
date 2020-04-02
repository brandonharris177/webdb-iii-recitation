const router = require('express').Router()
const Owners = require('./owners-model')
const Pets = require('../pets/pets-model')

router.get('/', (req, res) => {
  Owners.get()
    .then(owners => {
      res.status(200).json(owners)
    })
    .catch(error => {
      res.status(500).json(error)
    })
});

router.get('/:id', (req, res) => {
  const id = req.params.id
  Owners.getById(id)
    .then(owner => {
      if (owner) {
        res.status(200).json(owner)
      } else {
        res.status(404).json("Owner with given Id does not exist")
      }
    })
    .catch(error => {
      res.status(500).json(error)
    })
});

router.get('/:id/pets', (req, res) => {
  const id = req.params.id
  Owners.getByOwner(id)
    .then(owner => {
      console.log(owner)
      if (owner) {
        res.status(200).json(owner)
      } else {
        res.status(404).json("Owner with given Id does not exist")
      }
    })
    .catch(error => {
      res.status(500).json(error)
    })
});

router.post('/', (req, res) => {
  const {name, email} = req.body
  Owners.insert({name, email})
    .then(owner => {
      res.status(201).json(owner)
    })
})

router.post('/:id/pets', (req, res) => {
  const id = req.params.id
  const {name, age, care_instructions, species_id} = req.body
  Pets.insert({name, age, care_instructions, species_id, owner_id: parseInt(id, 10)})
    .then(pets => {
      res.status(201).json(pets)
    })
});

module.exports = router
