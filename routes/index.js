const express = require('express')
const router = express.Router()

const User = require('../models/User.js')

/* GET home page. */
router.get('/', async (req, res, next) => {
  if (req.session.currentUser) {
    //es un Usuario
    return res.render('homeForUser')
    //es un Shelter
    // return res.render('homeForShelter')
  }
  res.render('index')
  // Pagina inicial con login + splash inicial de entrar + botton signup: auth/signup
})

module.exports = router
