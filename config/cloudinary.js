'use strict'

const cloudinary = require('cloudinary')
const cloudinaryStorage = require('multer-storage-cloudinary')
const multer = require('multer')

cloudinary.config({
  cloud_name: 'dsybjs8ua',
  api_key: '151441949992826',
  api_secret: 'IKB5VNoqyQ_vN9DEBIG55DZ7oLM'
})

const storage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: 'adogtion',
  allowedFormats: ['jpg', 'png']
})

const parser = multer({ storage: storage })

module.exports = parser