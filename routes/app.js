const express = require('express')
const router = express.Router()
const { isNotLoggedIn } = require('../middlewares/authMiddlewares')
const User = require('../models/User.js')
const Shelter = require('../models/Shelter.js')
const Dogs = require('../models/Dog.js')
const Notes = require('../models/Notes.js')
const parser = require('../config/cloudinary')

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

router.post('/dogs/create', parser.single('image'), isNotLoggedIn, async (req, res, next) => {
    const id = req.session.currentUser._id
    const {name, breed, size, website, address} = req.body
    const picture = req.file.secure_url
    await Dogs.create({name, breed, size, website, address, image: picture, shelter: id})
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
        return res.render('users/profile', user)
    } else if (req.session.currentUser.type === 'Shelter') {
        const shelter = req.session.currentUser;
        return res.render('shelters/profile', shelter)
    }
})

router.post('/profile/update',isNotLoggedIn, async (req, res, next) => {
    if (req.session.currentUser.type === 'User') {
        try{
        const id = req.session.currentUser._id
        const {name, surName, email, age, city, ocupation, civilStatus} = req.body
        await User.findByIdAndUpdate(id,{name, surName, email, age, city, ocupation, civilStatus})
        const user = await User.findById(id)
        req.session.currentUser = user
        return res.redirect('/app/profile')
        }catch (err){
            next(err)
        }
    } else if (req.session.currentUser.type === 'Shelter') {
        try{
        const id = req.session.currentUser._id
        const {name, email, phone, website, address} = req.body
        await Shelter.findByIdAndUpdate(id,{name, email, phone, website, address})
        const shelter = await Shelter.findById(id)
        req.session.currentUser = shelter
        return res.redirect('/app/profile')
        }catch (err){
            next(err)
        }
    }
})

router.post('/profile/delete', isNotLoggedIn, (req, res, next) => {
    return res.redirect('/')
})


router.post('/changePhoto', parser.single('image'), isNotLoggedIn, async (req, res, next) => {
    if (req.session.currentUser.type === 'User') {
    console.log('u arrive')
    try{
        const image = req.file.secure_url
        const {_id} = req.session.currentUser;
        await User.findByIdAndUpdate(_id, {image:image}) 
        user = await User.findById(_id)
        req.session.currentUser = user
        return res.redirect('/app/profile')
    }catch(err){
        next(err)
    }
    } else if (req.session.currentUser.type === 'Shelter') {
        try{
        const image = req.file.secure_url
        const {_id} = req.session.currentUser;
        await Shelter.findByIdAndUpdate(_id, {image:image}) 
        shelter = await Shelter.findById(_id)
        req.session.currentUser = shelter
        return res.redirect('/app/profile')
    }catch(err){
        next(err)
    }
    }
})

router.get('/notifications', isNotLoggedIn, async (req, res, next) => {
    try{
    const id = req.session.currentUser._id
    if (req.session.currentUser.type === 'User') {
        const userNotes = await User.findById(id).populate({ 
            path: 'Notes',
            populate: {
                path: 'idDog',
                model: 'Dog',
                populate: {
                    path: 'shelter',
                    model: 'Shelter'
                } 
            } 
        })
        console.log(userNotes.Notes)
        return res.render('users/notifications', {userNotes})
    } else if (req.session.currentUser.type === 'Shelter') {
        return res.render('shelters/notifications')
    }
    }catch(err){
        next(err)
    }
})

router.get('/', isNotLoggedIn, (req, res, next) => {
    return res.redirect('/')
})

//codigo para reciclar, no usar
//router.post('/subirArchivo', parser.single('photo'), async (req, res, next) => {
//     const imageUrl = req.file.secure_url
//     await Imagen.create({ image: imageUrl })
//     res.redirect('/subirArchivo')
// })

module.exports = router