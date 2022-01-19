const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const data = require('../data.json')

const Producent = require('../models/Producent');

router.get('/', async (req, res) => {
  try {
    const producents = await Producent.find({});
    return res.send({allProducents: [...producents]});
  } catch(err) {
    return res.status(500).send({error: err.message})
  }
});


router.post('/reload', async (req, res) => {
  try {
    await Producent.deleteMany()

    await Producent.insertMany(data.producents)
    res.status(200).send(true)
  }
  catch(err) {
    res.status(500).send({error: err.message})
  }

})

router.post('/', async (req, res) => {
  const producent = new Producent({
    name: req.body.name,
    phone: req.body.phone,
    address: req.body.address,
    country: req.body.country,
  })

  try {
    const newProducent = await producent.save();
    return res.status(201).send(newProducent);
  } catch(err) {
    return res.status(400).send({error: err.message});
  }
});



router.get('/:id', async (req, res) => {
try {
  const producent = await Producent.findById(req.params.id);
  if (!producent) {
    return res.status(404).send({message: 'producent with this id does not exist'});
  }
  return res.send(producent);
} catch (err) {
  return res.status(500).send({error: err.message});
}
});


router.put('/:id', async (req, res) => {
  const id = req.params.id;
  const producent = new Producent({
    name: req.body.name,
    series: req.body.series,
    releaseDate: req.body.releaseDate
  })

  try {
    const producentToUpdate = await Producent.findById(id);
    if (producentToUpdate) {
      const updated = await Producent.updateOne(producentToUpdate, {...req.body})
      return res.send("producent has been updated")
    }
    const newProducent = await producent.save();
    return res.send(newProducent)
  } catch(err) {
    return res.status(500).send({error: err.message});
  }
});


router.delete('/:id', async (req, res) => {
const id = req.params.id;
try {
  const producent = await Producent.findById(id);
  if (!producent) {
    return res.status(404).send({message: 'unable to delete, producent with this id does not exist'});
  }
  await producent.remove();
  return res.send({message: `Producent with id: ${id} has been deleted`});
} catch(err) {
  res.status(500).send({error: err.message});
}
});


router.patch('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const producent = await Producent.findById(id);
    if (!producent) {
      return res.status(404).send({message: 'producent with this id does not exist'});
    }
    const result = await Producent.updateOne(producent, {$set: req.body});
    return res.send({message: `producent with id: ${id} has been updated`});
  } catch(err) {
    return res.status(400).send({error: err.message});
  }
});

module.exports = router;