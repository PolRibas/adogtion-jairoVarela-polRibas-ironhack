'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  name: String,
  surName: String,
  password: {
    type: String,
    required: true
  },
  type:{
    type: String,
    default: 'User'
  },
  email: String,
  phone: String,
  image: {
    type: String,
    default: 'https://www.startupdelta.org/wp-content/uploads/2018/04/No-profile-LinkedIn.jpg'
  },
  age: Number,
  city: String,
  ocupation: String,
  civilStatus: {
    type: String,
    enum: ['Married', 'Single', `It's complicated`, 'Divorced']
},
  likeDogs: [{
    type: ObjectId,
    ref: 'Dog'
  }],
  notes: [{
    type: ObjectId,
    ref: 'Notes'
  }]
}, {
  timestamps: true
})

const User = mongoose.model('User', userSchema)

module.exports = User