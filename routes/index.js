const express = require('express')
const router = express.Router()

/* GET home page. */
router.get('/', async (req, res, next) => {
  if(req.session.currentUser){
    if (req.session.currentUser.type = 'User') {
        return res.render('users/feed')
    } else if (req.session.currentUser.type = 'Shelter') {
    return res.render('shelters/feed')
  }}
  res.render('index')
})

module.exports = router
