const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const data = require('../data.json')

const Card = require('../models/Card');

router.get('/', async (req, res) => {
  try {
    const cards = await Card.find({});
    return res.send({allCards: [...cards]});
  } catch(err) {
    return res.status(500).send({error: err.message})
  }
});


router.post('/reload', async (req, res) => {
  try {
    await Card.deleteMany()

    await Card.insertMany(data.cards)
    res.status(200).send(true)
  }
  catch(err) {
    res.status(500).send({error: err.message})
  }

})

router.post('/', async (req, res) => {
  const card = new Card({
    name: req.body.name,
    series: req.body.series,
    releaseDate: req.body.releaseDate,
    architecture: req.body.architecture,
    company: req.body.company,
    aib: req.body.aib,
    model: req.body.model,
    score: req.body.score,
    imageurl: req.body.imageurl
  })

  try {
    const newCard = await card.save();
    return res.status(201).send(newCard);
  } catch(err) {
    return res.status(400).send({error: err.message});
  }
});



router.get('/:id', async (req, res) => {
try {
  const card = await Card.findById(req.params.id);
  if (!card) {
    return res.status(404).send({message: 'card with this id does not exist'});
  }
  return res.send(card);
} catch (err) {
  return res.status(500).send({error: err.message});
}
});


router.put('/:id', async (req, res) => {
  const id = req.params.id;
  const card = new Card({
    name: req.body.name,
    series: req.body.series,
    releaseDate: req.body.releaseDate
  })

  try {
    const cardToUpdate = await Card.findById(id);
    if (cardToUpdate) {
      const updated = await Card.updateOne(cardToUpdate, {...req.body})
      return res.send("card has been updated")
    }
    const newCard = await card.save();
    return res.send(newCard)
  } catch(err) {
    return res.status(500).send({error: err.message});
  }
});


router.delete('/:id', async (req, res) => {
const id = req.params.id;
try {
  const card = await Card.findById(id);
  if (!card) {
    return res.status(404).send({message: 'unable to delete, card with this id does not exist'});
  }
  await card.remove();
  return res.send({message: `Card with id: ${id} has been deleted`});
} catch(err) {
  res.status(500).send({error: err.message});
}
});


router.patch('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const card = await Card.findById(id);
    if (!card) {
      return res.status(404).send({message: 'card with this id does not exist'});
    }
    const result = await Card.updateOne(card, {$set: req.body});
    return res.send({message: `card with id: ${id} has been updated`});
  } catch(err) {
    return res.status(400).send({error: err.message});
  }
});

module.exports = router;