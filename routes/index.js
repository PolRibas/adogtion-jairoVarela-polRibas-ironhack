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
      const user = await req.session.currentUser /*populate('likeDogs')*/;
    if (user.type === 'User') {
        // let likedDogs = [];
        // let notLikedDogs = []; 
        // for (dog in dogs){
        //     if(await user.likeDogs.find(dog)){
        //         await likedDogs.push(dog)
        //     }else{
        //         await notLikedDogs.push(dog)
        //     }
        // }
        // const data = {
        //     likedDogs,notLikedDogs
        // } 
        return res.render('users/feed', {dogs})
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
        return res.render('shelters/feed', {shelterdog})
    }
  }
  res.render('index')
}catch (err) {
    next(err)
}
})

module.exports = router
