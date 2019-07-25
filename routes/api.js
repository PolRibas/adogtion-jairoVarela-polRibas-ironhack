const express = require('express')
const router = express.Router()

const User = require('../models/User')

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

module.exports = router
