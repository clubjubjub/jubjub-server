'use strict'

const express = require('express')
const volleyball = require('volleyball')
const PORT = process.env.PORT || 3000
const db = require('./db')
const passport = require('passport')
const session = require('express-session')
const SequelizeStore = require('connect-session-sequelize')(session.Store)
const sessionStore = new SequelizeStore({ db })
// const AWS = require('aws-sdk')
// const fs = require('fs')
// const fileType = require('file-type')
// const bluebird = require('bluebird')
// const multiparty = require('multiparty')
const app = express()

if (process.env.NODE_ENV !== 'production') require('../secrets.js')

// var AWS = require('aws-sdk');
// var s3 = new AWS.S3({accessKeyId: process.env.AWS_ACCESS_KEY_ID, secretAccessKey:process.env.AWS_SECRET_ACCESS_KEY, region:'REGION'});

// var params = {Bucket: 'test-bucket-tutorial', Key: 'images/myimage.jpg', ContentType: 'image/jpeg'};
// s3.getSignedUrl('putObject', params, function (err, url) {
//     console.log('Your generated pre-signed URL is', url);
// });

// AWS.config.update({
//   accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
// })
// AWS.config.setPromisesDependency(bluebird)
// const s3 = new AWS.S3()
// // abstracts function to upload a file returning a promise
// const uploadFile = (buffer, name, type) => {
//   const params = {
//     ACL: 'public-read',
//     Body: buffer,
//     Bucket: process.env.DANIK_S3_BUCKET,
//     ContentType: type.mime,
//     Key: `${name}.${type.ext}`
//   }
//   return s3.upload(params).promise()
// }

// // Define POST route
// app.post('/test-upload', (request, response) => {
//   const form = new multiparty.Form()
//   form.parse(request, async (error, fields, files) => {
//     if (error) throw new Error(error)
//     try {
//       const path = files.file[0].path
//       const buffer = fs.readFileSync(path)
//       const type = fileType(buffer)
//       const timestamp = Date.now().toString()
//       const fileName = `bucketFolder/${timestamp}-lg`
//       const data = await uploadFile(buffer, fileName, type)
//       return response.status(200).send(data)
//     } catch (error) {
//       return response.status(400).send(error)
//     }
//   })
// })

// passport registration
passport.serializeUser((user, done) => done(null, user.id))

passport.deserializeUser(async (id, done) => {
  try {
    const user = await db.models.user.findById(id)
    done(null, user)
  } catch (err) {
    done(err)
  }
})

// const createApp = () => {
// logging middleware
app.use(volleyball)

// body parsing middleware
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ extended: true, limit: '50mb' }))
// session middleware with passport
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'my best friend is Cody',
    store: sessionStore,
    resave: false,
    saveUninitialized: false
  })
)

app.use(passport.initialize())
app.use(passport.session())

app.use('/auth', require('./auth'))
app.use('/api', require('./api')) // include our routes!

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(err.status || 500).send(err.message || 'Internal server error')
})
// };
const startListening = () => {
  // start listening (and create a 'server' object representing our server)
  app.listen(PORT, () => console.log(`Listening on ${PORT}`))
}

// createApp();

startListening()

db.sync()

module.exports = app
