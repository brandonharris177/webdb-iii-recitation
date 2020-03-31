const router = require('express').Router()
const Owners = require('./owners-model')

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

module.exports = router
