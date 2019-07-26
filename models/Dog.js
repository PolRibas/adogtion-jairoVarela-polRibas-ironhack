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
  size: [{
    type: String,
    enum: ['Small','Medium','Large','Extra Large']
  }],
  age: {
    type: String,
    default: 'Unknown'
  },
  image: {
    type: String,
    default: 'https://st-listas.20minutos.es/images/2013-11/371972/4234737_640px.jpg?1383885591'
  },
  shelter: [{
    type: ObjectId,
    ref: 'Shelter'
  }],
  status: {
    type: String,
    enum: ['None','Liked', 'Matched', 'Accepted', 'Adopted'],
    default: 'None'
  }
}, {
  timestamps: true
})

const Dog = mongoose.model('Dog', dogSchema)

module.exports = Dog
