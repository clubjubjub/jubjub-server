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

    let visionResults = {
      text: null,
      logo: null
    }

    if (text && text.description) visionResults.text = text.description
    if (logo && logo.description) visionResults.logo = logo.description

    let finalResult = ''

    if (visionResults.text !== null) finalResult += visionResults.text
    if (visionResults.logo !== null) finalResult += visionResults.logo

    console.log(`

    visionResults: ${JSON.stringify(visionResults)}

    finalResult: ${JSON.stringify(finalResult)}

    `)

    res.json(finalResult)
  } catch (err) {
    next(err)
  }
})
