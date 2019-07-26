'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const dogSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  breed: {
    type: String,
    default: 'No Breed'
  },
  breed: {
    type: String,
    default: 'No Breed'
  },
  breed: {
    type: String,
    default: 'No Breed'
  },
  size: [{
    type: String,
    enum: ['Small','Medium','Large','Extra Large']
  }],
  age: {
    type: String
  },
  image: {
    type: String
  },
  shelter: [{
    type: ObjectId,
    ref: 'Shelter'
  }],
  status: {
    type: String,
    enum: ['Liked', 'Matched', 'Accepted', 'Adopted']
  }
}, {
  timestamps: true
})

const Dog = mongoose.model('Dog', dogSchema)

module.exports = Dog
