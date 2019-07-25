'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const notesSchema = new Schema({
  message: String,
  idDog: {
      type: ObjectId,
      ref: 'User'
    }
})

const Notes = mongoose.model('Notes', notesSchema)

module.exports = Notes