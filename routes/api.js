const express = require('express')
const router = express.Router()

const User = require('../models/User.js')
const Shelter = require('../models/Shelter.js')
const Dogs = require('../models/Dog.js')
const Notes = require('../models/Notes.js')

//algunas rutas json para poder filtrar los perros


/* GET home page. */
// router.post('/recipes', async (req, res, next) => {
//   const { title, level, cuisine, duration } = req.body
//   try {
//     const recipe = await Recipe.create({ title, level, cuisine, duration })
//     const recipeID = recipe._id
//     const userID = req.session.currentUser._id
//     await User.findByIdAndUpdate(userID, { $push: { recipes: recipeID } })
//     res.json(recipe)
//   } catch (err) {
//     next(err)
//   }
// })

// router.post('/recipes/:id/delate', async (req, res, next) => {
//   const { id } = req.params
//   await Recipe.findByIdAndDelete(id)
//   res.json({ message: 'Recipe deleted' })
// })

router.post('/likeDog', async (req, res, next) => {
    try{
    const id = req.session.currentUser._id
    const shelterId = req.body.shelter
    const dogId = req.body.dog;
    const note = await Notes.create({message: 'liked', idDog: req.body.dog},{ new: true})
    await User.findByIdAndUpdate(id,{$push: {Notes: note[0]._id}})
    await Shelter.findByIdAndUpdate(shelterId,{$push: {notes: note[0]._id}})
    await Dogs.findByIdAndUpdate(dogId,{ status: 'Liked' })
    res.redirect('/')
    }catch(err){
        next(err)
    }
})

module.exports = router
