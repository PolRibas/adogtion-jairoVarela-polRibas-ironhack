const express = require('express')
const router = express.Router()

const User = require('../models/User.js')

/* GET home page. */
router.get('/', async (req, res, next) => {
  if (req.session.currentUser.type = 'User') {
    return res.render('homeForUser')
  } else if (req.session.currentUser.type = 'Shelter') {
   return res.render('homeForShelter')
  }
  res.render('index')
})

module.exports = router
