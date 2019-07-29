const express = require('express')
const router = express.Router()

const User = require('../models/User.js')
const Shelter = require('../models/Shelter.js')
const Dogs = require('../models/Dog.js')
const Notes = require('../models/Notes.js')

router.post('/likeDog', async (req, res, next) => {
    try{
    const id = req.session.currentUser._id
    const username = req.session.currentUser.username
    const shelterId = req.body.shelter
    const dogId = req.body.dog;
    const note = await Notes.create({idDog: req.body.dog, idUser: id},{ new: true})
    await Notes.findByIdAndUpdate(note[0]._id,{$push: {message: `${username}: I want to be adopted`}})
    await Shelter.findByIdAndUpdate(shelterId,{$push: {notes: note[0]._id}})
    await Dogs.findByIdAndUpdate(dogId,{ status: 'Liked' })
    await User.findByIdAndUpdate(id,{$push: {notes: note[0]._id}})
    await User.findByIdAndUpdate(id, {$push: {likeDogs: dogId}})
    res.redirect('/')
    }catch(err){
        next(err)
    }
})

router.post('/:id', async (req, res, next) => {
    try{
        const id = req.params.id
        const nota = await Notes.findById(id).populate('idDog')
        const dogId = nota.idDog._id
        const dog = await Dogs.findById(dogId)
        await Notes.findByIdAndUpdate(id,{$push: {message: `${dog.name}: I need more information for adopt you`}})
        res.json({message: `${dog.name}: I need more information for adopt you`})
    }catch(err){
        (err)
    }
})

router.post('/message/:id', async (req, res, next) => {
    try{
        const id = req.params.id
        const username = req.session.currentUser.username
        const message = req.body.information
        await Notes.findByIdAndUpdate(id,{$push: {message: `${username}: ${message}`}})
        res.json({message: `${username}: ${message}`})
    }catch(err){
        (err)
    }
})


router.post('/Dogmessage/:id', async (req, res, next) => {
    try{
        const id = req.params.id
        const nota = await Notes.findById(id).populate('idDog')
        const dogId = nota.idDog._id
        const dog = await Dogs.findById(dogId)
        const message = req.body.information
        await Notes.findByIdAndUpdate(id,{$push: {message: `${dog.name}: ${message}`}})
        res.json({message: `${dog.name}: ${message}`})
    }catch(err){
        (err)
    }
})


module.exports = router
