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
    // if user tiene al perro en like
    const note = await Notes.create({idDog: req.body.dog, idUser: id},{ new: true})
    await Notes.findByIdAndUpdate(note[0]._id,{$push: {message: `${username}: I want to be adopted`}})
    await User.findByIdAndUpdate(id,{$push: {notes: note[0]._id}})
    await Shelter.findByIdAndUpdate(shelterId,{$push: {notes: note[0]._id}})
    await Dogs.findByIdAndUpdate(dogId,{ status: 'Liked' })
    // else user crea un nuevo mensaje
    res.redirect('/')
    }catch(err){
        next(err)
    }
})

router.post('/unLikeDog', async (req, res, next) => {
    // if user tiene al perro en like
    // else user crea un nuevo mensaje
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
