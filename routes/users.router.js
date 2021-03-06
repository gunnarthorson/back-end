const router = require('express').Router();

const Users = require('../models/users-model');

router.get('/', (req, res) => {
  Users.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => res.send(err));
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  if (!id) {
    res
      .status(404)
      .json({ message: 'The user with the specified id does not exist.' });
  } else {
    Users.findById(id)
      .then(user => {
        res.status(201).json(user);
      })
      .catch(err => {
        res
          .status(500)
          .json({ message: 'The user information could not be retrieved.' });
      });
  }
});

router.delete('/:id', (req, res) => {
  const id = req.params.id;
  if (!id) {
    res
      .status(404)
      .json({ message: 'The user with the specified ID does not exist.' });
  }
  Users.remove(id)
    .then(user => {
      res.json(user);
    })
    .catch(err => {
      res.status(500).json({ message: 'The user could not be removed' });
    });
});

router.get('/:id/listings', (req, res) => {
  const { id } = req.params;

  Users.findListings(id)
    .then(listings => {
      if (listings.length) {
        res.json(listings);
      } else {
        res.status(404).json({ message: 'Could not find listings' });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'Failed to get listings' });
    });
});

module.exports = router;
