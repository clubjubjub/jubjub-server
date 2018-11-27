const router = require('express').Router()
const axios = require('axios')
const path = require('path')
const fs = require('fs')
const vision = require('@google-cloud/vision')
module.exports = router

router.post('/', async (req, res, next) => {
  try {
    const client = new vision.ImageAnnotatorClient()
    const base64 = req.body.base64
    const photo = new Buffer.from(base64, 'base64').toString('binary')
    const file = 'photo.png'

    await fs.writeFile(file, photo, 'binary', err => {
      if (err) throw err
      console.log(`The file has been saved!`)
    })

    const filename = path.join(__dirname, '../../photo.png')

    const [
      logoDetectionResults,
      documentTextDetectionResults
    ] = await Promise.all([
      client.logoDetection(filename),
      client.documentTextDetection(filename)
    ])

    const logo = logoDetectionResults[0].logoAnnotations[0]
    const text = documentTextDetectionResults[0].textAnnotations[0]

    if (logo && logo.description) {
      console.log(`

        Yass to logo.

        Logo result: ${JSON.stringify(logo)}

        Logo result: ${JSON.stringify(logo.description)}

      `)
      res.json(logo.description)
    } else if (text && text.description) {
      console.log(`

        Yass to text.

        Text result: ${JSON.stringify(text)}

        Text result: ${JSON.stringify(text.description)}

      `)
      res.json(text.description)
    } else {
      console.log(`

        Failed for logo and text detection

      `)
      res.end()
    }
  } catch (err) {
    next(err)
  }
})
