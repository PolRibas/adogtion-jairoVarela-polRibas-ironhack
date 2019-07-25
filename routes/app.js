const express = require('express')
const router = express.Router()
const { isNotLoggedIn } = require('../middlewares/authMiddlewares')
const User = require('../models/User.js')
const Shelter = require('../models/Shelter.js')
const Dogs = require('../models/Dog.js')
const Notes = require('../models/Notes.js')

router.get('/dog/:id', isNotLoggedIn, (req, res, next) => {
    const id = req.params;
    const { dog } = Dogs.findById(id)
    if (req.session.currentUser.type === 'User') {
        return res.render('users/dogs', dog)
    } else if (req.session.currentUser.type === 'Shelter') {
        return res.render('shelters/dogs', dog)
    }}
)

router.post('/dogs/create', (req, res, next) => {
    return res.redirect('/')
})

router.post('/dogs/:id/update', (req, res, next) => {
    return res.redirect('/')
})

router.post('/dogs/:id/delete', (req, res, next) => {
    return res.redirect('/')
})

router.get('/settings', (req, res, next) => {
    return res.redirect('/')
})

router.get('/profile', (req, res, next) => {
    return res.redirect('/')
})

router.post('/profile/update', (req, res, next) => {
    return res.redirect('/')
})

router.post('/profile/delete', (req, res, next) => {
    return res.redirect('/')
})

router.get('/notifications', (req, res, next) => {
    return res.redirect('/')
})

router.get('/', (req, res, next) => {
    return res.redirect('/')
})

module.exports = router
