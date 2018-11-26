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

    const UPLOADS_DIR = path.join(__dirname, '..', '..', 'uploads')
    const DATE_NOW = Date.now()
    const file = `photo.png`

    await fs.writeFile(file, photo, 'binary', err => {
      if (err) throw err
      console.log(`The file has been saved!`)
    })

    const filename = path.join(__dirname, '../../photo.png')
    const result = await client.documentTextDetection(filename)
    const text = result[0].textAnnotations[0].description

    console.log(`

      result: ${result}
      resultStringify: ${JSON.stringify(result)}
      text: ${text}
      text: ${JSON.stringify(text)}

    `)

    res.json(text)
  } catch (err) {
    next(err)
  }
})
