'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const notesSchema = new Schema({
  message: Array,
  idDog: {
      type: ObjectId,
      ref: 'Dog'
    },
  idUser: {
    type: ObjectId,
    ref: 'User'
    }
},{
    timestamps: true
  })

const Notes = mongoose.model('Notes', notesSchema)

module.exports = Notes