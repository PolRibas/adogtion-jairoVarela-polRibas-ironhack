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
  age: Number,
  city: String,
  ocupation: String,
  civilStatus: String,
  Notes: [{
    type: ObjectId,
    ref: 'Notes'
  }]
}, {
  timestamps: true
})

const User = mongoose.model('User', userSchema)

module.exports = User