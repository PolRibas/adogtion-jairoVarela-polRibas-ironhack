const express = require('express')
const router = express.Router()
const moment = require('moment')
moment.locale('es');

const User = require('../models/User.js')
const Shelter = require('../models/Shelter.js')
const Dogs = require('../models/Dog.js')
const Notes = require('../models/Notes.js')
const {parser, cloudinary} = require('../config/cloudinary')

/* GET home page. */
router.get('/', async (req, res, next) => {
try{
  if(req.session.currentUser){
      const dogs = await Dogs.find().populate('shelter')
      const user = req.session.currentUser;
    if (user.type === 'User') {
        const id = user._id;
        const userWithDogs = await User.findById(id).populate('likeDogs')
        let notLikedDogs = []; 
        for (dog of dogs){
            let iHaveit = false;
            userWithDogs.likeDogs.forEach((likeDog) => {       
                if (likeDog._id.equals(dog._id)){
                    iHaveit = true
                }})
            if(!iHaveit){
                notLikedDogs.push(dog)
            }
        }
        notLikedDogs.sort((a, b) => { 
             if (a > b){
               return -1;}
             if (a < b){
               return 1;}
             return 0;
         }) 
         notLikedDogs.forEach((dog) => {
             dog.date = moment(dog.createdAt).startOf('minutes').fromNow()
             const image = cloudinary.image(dog.image, { transformation: [{width: 360, height: 640, crop: 'fill'}], type: 'fetch' });
             const splittedImage = image.split(' ');
             const src = splittedImage[1];
             const url = src.split("'")[1];
             dog.cropped = url;
         })

        return res.render('users/feed', {notLikedDogs})
    } else if (user.type === 'Shelter') {
        let shelterdog = [];
        for (dog in dogs){
            if(dogs[dog].shelter.username === user.username){
                shelterdog.push(dogs[dog])
            }
        }
        if(shelterdog.length === 0){
            const nonDogs = {};
            return res.render('shelters/feed', {nonDogs})
        }
        shelterdog.sort((a, b) => { 
            if (a > b){
              return -1;}
            if (a < b){
              return 1;}
            return 0;
        }) 
        shelterdog.forEach((dog) => {
            dog.date = moment(dog.createdAt).startOf('minutes').fromNow()
             const image = cloudinary.image(dog.image, { transformation: [{width: 360, height: 640, crop: 'fill'}], type: 'fetch' });
             const splittedImage = image.split(' ');
             const src = splittedImage[1];
             const url = src.split("'")[1];
             dog.cropped = url;
        })
        return res.render('shelters/feed', {shelterdog})
    }
  }
  res.render('index')
}catch (err) {
    next(err)
}
})

module.exports = router
