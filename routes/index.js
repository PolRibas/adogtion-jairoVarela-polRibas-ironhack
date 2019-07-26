const express = require('express')
const router = express.Router()

const User = require('../models/User.js')
const Shelter = require('../models/Shelter.js')
const Dogs = require('../models/Dog.js')
const Notes = require('../models/Notes.js')

/* GET home page. */
router.get('/', async (req, res, next) => {
    console.log(req.session.currentUser)
  if(req.session.currentUser){
    if (req.session.currentUser.type === 'User') {
        //datos de perros
        return res.render('users/feed')
    } else if (req.session.currentUser.type === 'Shelter') {
        //datos de perros
        return res.render('shelters/feed')
  }}
  res.render('index')
})

module.exports = router
