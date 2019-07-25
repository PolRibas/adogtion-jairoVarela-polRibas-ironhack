'use strict'

const express = require('express')
const router = express.Router()
const User = require('../models/User.js')
const bcrypt = require('bcrypt')
const saltRounds = 10
const { isLoggedIn, isNotLoggedIn, isFormFilled } = require('../middlewares/authMiddlewares')

/* GET home page. */
router.get('/signup', isLoggedIn, (req, res, next) => {
  const data = {
    messages: req.flash('errorFormNotFielled'),
    name: req.flash('name'),
    password: req.flash('passwordBad')
  }
  res.render('signup', data)
})

router.post('/signup', isLoggedIn, isFormFilled, async (req, res, next) => {
  if (req.body.password !== req.body.passwordtwo) {
    req.flash('passwordBad', 'This is not the password for this user')
    return res.redirect('/auth/signup')
  }
  try {
    const { username, password } = req.body
    const user = await User.findOne({ username })
    if (user) {
      req.flash('errorUserFind', 'This username is allready registred')
      return res.redirect('/auth/signup')
    }
    const salt = bcrypt.genSaltSync(saltRounds)
    const hashedPassword = bcrypt.hashSync(password, salt)
    const newUser = await User.create({ username, password: hashedPassword })
    req.session.currentUser = newUser
    res.redirect('/')
  } catch (error) {
    next(error)
  }
})

router.get('/login', (req, res, next) => {
  const data = {
    messages: req.flash('noUser'),
    name: req.flash('name'),
    password: req.flash('passwordBad')
  }
  console.log(data)
  res.render('login', data)
})

router.post('/login', async (req, res, next) => {
  const { username, password } = req.body
  try {
    const user = await User.findOne({ username })
    if (user) {
      if (bcrypt.compareSync(password, user.password)) {
        req.session.currentUser = user
        res.redirect('/')
      } else {
        req.flash('passwordBad', 'This is not the password for this user')
        req.flash('name', username)
        res.redirect('/auth/login')
      }
    } else {
      req.flash('noUser', 'Is not user with this username')
      req.flash('name', username)
      res.redirect('/auth/login')
    }
    res.redirect('/')
  } catch (error) {
    next(error)
  }
})

router.post('/logout', isNotLoggedIn, (req, res, next) => {
  delete req.session.currentUser
  res.redirect('/')
})

module.exports = router
