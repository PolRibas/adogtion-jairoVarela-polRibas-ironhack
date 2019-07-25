'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const shelterSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  phone: {
    type: Number
  },
  email: {
    type: String
  },
  website: {
    type: String
  },
  adress: {
    type: String
  },
  type:{
    type: String,
    default: 'Shelter'
  },
  dogs: [{
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

const Shelter = mongoose.model('Shelter', shelterSchema)

module.exports = Shelter
