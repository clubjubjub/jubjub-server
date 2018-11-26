const router = require('express').Router()
const axios = require('axios')
const path = require('path')
const fs = require('fs')
const vision = require('@google-cloud/vision')
const multer = require('multer')
const multerS3 = require('multer-s3')
const AWS = require('aws-sdk')
module.exports = router

const visionConfig = {
  key: process.env.GOOGLE_VISION
}

router.post('/', async (req, res, next) => {
  try {
    // const client = new vision.ImageAnnotatorClient()
    const base64 = req.body.base64
    const photo = new Buffer.from(base64, 'base64').toString('binary')

    const UPLOADS_DIR = path.join(__dirname, '..', '..', 'uploads')
    const DATE_NOW = Date.now()
    const file = `photo-${DATE_NOW}.png`

    await fs.writeFile(file, photo, err => {
      if (err) throw err
      console.log(`The file has been saved!`)
    })

    const filename = `/uploads/photo-${DATE_NOW}.png`

    // const [result] = await client.documentTextDetection(filename)
    // const fullTextAnnotation = result.fullTextAnnotation
    // console.log(`Full text: ${fullTextAnnotation.text}`)

    // const matches = visionsReponse.responses[0].textAnnotations[0].description

    // console.log(`

    //   matches: ${filename}

    // `)
    const body = {
      requests: [
        {
          image: {
            content: base64
          },
          features: [
            {
              type: 'DOCUMENT_TEXT_DETECTION',
              maxResults: 1
            }
          ]
        }
      ]
    }

    const response = await axios.post(
      `https://vision.googleapis.com/v1/images:annotate?key=${
        process.env.GOOGLE_VISION
      }`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      }
    )
    // const parsed = await response.json()
    console.log(`

      Response: ${response}

    `)

    // const fileName = `uploads/img-${DATE_NOW}.png`

    // await fs.writeFile(
    //   `${UPLOADS_DIR}/img-${DATE_NOW}.png`,
    //   binaryData,
    //   'binary',
    //   function(err) {
    //     console.log(`Error: ${err}`)
    //   }
    // )

    // fs.writeFile(`uploads/out.png`, binaryData, 'binary', err =>
    //   console.log(err)
    // )

    // const imgpath = `${UPLOADS_DIR}/${DATE_NOW}-out.png`
    res.json(response)
  } catch (err) {
    next(err)
  }
})

// const body = {
//   requests: [
//     {
//       image: {
//         content: imgpath
//       },
//       features: [
//         {
//           type: 'DOCUMENT_TEXT_DETECTION',
//           maxResults: 1
//         }
//       ]
//     }
//   ]
// }

// const response = await axios.post(
//   `https://vision.googleapis.com/v1/images:annotate?key=${
//     process.env.GOOGLE_VISION
//   }`,
//   {
//     method: 'POST',
//     headers: {
//       Accept: 'application/json',
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(body)
//   }
// )
// const parsed = await response.json()

// console.log(`

// parsed: ${parsed}

// `)

// res.json('brrrrrp da brrp')
