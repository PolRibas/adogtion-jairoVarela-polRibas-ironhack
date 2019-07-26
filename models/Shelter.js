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
    type: String
  },
  password: {
    type: String,
    required: true
  },
  image: {
    type: String,
    default: 'https://estaticos.muyinteresante.es/media/cache/760x570_thumb/uploads/images/article/5c3871215bafe83b078adbe3/perro.jpg'
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
  address: {
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
