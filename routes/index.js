const express = require('express')
const router = express.Router()

const User = require('../models/User.js')
const Shelter = require('../models/Shelter.js')
const Dogs = require('../models/Dog.js')
const Notes = require('../models/Notes.js')

/* GET home page. */
router.get('/', async (req, res, next) => {
try{
  if(req.session.currentUser){
      const dogs = await Dogs.find()
      const user = req.session.currentUser;
    if (req.session.currentUser.type === 'User') {
        return res.render('users/feed', dogs)
    } else if (req.session.currentUser.type === 'Shelter') {
        let shelterdog = [];
        for (shelter in dogs){

        }
        return res.render('shelters/feed', {dogs})
    }
  }
  res.render('index')
}catch (err) {
    next(err)
}
})

module.exports = router
