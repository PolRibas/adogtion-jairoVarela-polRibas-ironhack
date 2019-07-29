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
      const dogs = await Dogs.find().populate('shelter')
      const user = await req.session.currentUser;
    if (user.type === 'User') {
        const id = user._id;
        const userWithDogs = await User.findById(id).populate('likeDogs')
        console.log(userWithDogs)
        let likedDogs = [];
        let notLikedDogs = []; 
        for (dog of dogs){
            if(userWithDogs.likeDogs._id === dog._id){
                await likedDogs.push(dog)
                console.log(dog)
            }else{
                await notLikedDogs.push(dog)
            }
        }
        notLikedDogs.sort((a, b) => { 
             if (a > b){
               return -1;}
             if (a < b){
               return 1;}
             return 0;
         }) 
        return res.render('users/feed', {notLikedDogs})
    } else if (user.type === 'Shelter') {
        let shelterdog = [];
        for (dog in dogs){
            if(dogs[dog].shelter[0].username === user.username){
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
        return res.render('shelters/feed', {shelterdog})
    }
  }
  res.render('index')
}catch (err) {
    next(err)
}
})

module.exports = router
