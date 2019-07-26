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
    }
})

router.get('/dogs/create', isNotLoggedIn, (req, res, next) => {
    if (req.session.currentUser.type === 'User') {
        return res.render('/')
    } else if (req.session.currentUser.type === 'Shelter') {
        return res.render('shelters/create')
    }
})

router.post('/dogs/create', isNotLoggedIn, (req, res, next) => {
    return res.redirect('/')
})

router.post('/dogs/:id/update', isNotLoggedIn, (req, res, next) => {
    return res.redirect('/')
})

router.post('/dogs/:id/delete', isNotLoggedIn, (req, res, next) => {
    return res.redirect('/')
})


router.get('/settings', isNotLoggedIn, (req, res, next) => {
    if (req.session.currentUser.type === 'User') {
        return res.render('users/settings')
    } else if (req.session.currentUser.type === 'Shelter') {
        return res.render('shelters/settings')
    }
})

router.get('/profile', isNotLoggedIn, (req, res, next) => {
    if (req.session.currentUser.type === 'User') {
        const user = req.session.currentUser;
        console.log(user)
        return res.render('users/profile', user)
    } else if (req.session.currentUser.type === 'Shelter') {
        return res.render('shelters/profile')
    }
})

router.post('/profile/update',isNotLoggedIn, (req, res, next) => {
    return res.redirect('/')
})

router.post('/profile/delete', isNotLoggedIn, (req, res, next) => {
    return res.redirect('/')
})

router.get('/notifications', isNotLoggedIn, (req, res, next) => {
    if (req.session.currentUser.type === 'User') {
        return res.render('users/notifications')
    } else if (req.session.currentUser.type === 'Shelter') {
        return res.render('shelters/notifications')
    }
})

router.get('/', isNotLoggedIn, (req, res, next) => {
    return res.redirect('/')
})

module.exports = router
