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
    if (visionResults.logo !== null) finalResult += ` ${visionResults.logo}`

    console.log(`

    visionResults: ${JSON.stringify(visionResults)}

    finalResult: ${JSON.stringify(finalResult)}

    `)

    res.json(finalResult)
  } catch (err) {
    next(err)
  }
})

// router.post('/', async (req, res, next) => {
//   try {
//     const client = new vision.ImageAnnotatorClient()
//     const base64 = req.body.base64
//     const photo = new Buffer.from(base64, 'base64').toString('binary')
//     const file = 'photo.png'

//     await fs.writeFile(file, photo, 'binary', err => {
//       if (err) throw err
//       console.log(`The file has been saved!`)
//     })

//     const filename = path.join(__dirname, '../../photo.png')

//     const [
//       logoDetectionResults,
//       documentTextDetectionResults
//     ] = await Promise.all([
//       client.logoDetection(filename),
//       client.documentTextDetection(filename)
//     ])

//     const logo = logoDetectionResults[0].logoAnnotations[0]
//     const text = documentTextDetectionResults[0].textAnnotations[0]

//     console.log(`

//       logoDetectionResults: ${JSON.stringify(logoDetectionResults)}

//       documentTextDetectionResults: ${JSON.stringify(
//         documentTextDetectionResults
//       )}

//       Logo w/o desc result: ${JSON.stringify(
//         logoDetectionResults[0].logoAnnotations[0]
//       )}

//       Text w/o desc result: ${JSON.stringify(
//         documentTextDetectionResults[0].textAnnotations[0]
//       )}

//     `)

//     if (text && text.description) {
//       console.log(`

//       Yass to text.

//       Text result: ${JSON.stringify(text)}

//       Text result: ${JSON.stringify(text.description)}

//     `)
//       res.json(text.description)
//     } else if (logo && logo.description) {
//       console.log(`

//         Yass to logo.

//         Logo result: ${JSON.stringify(logo)}

//         Logo result: ${JSON.stringify(logo.description)}

//       `)
//       res.json(logo.description)
//     } else {
//       console.log(`

//         Failed for logo and text detection

//       `)
//       res.end()
//     }
//   } catch (err) {
//     next(err)
//   }
// })
