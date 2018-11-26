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

    // const filename = `/uploads/photo-${DATE_NOW}.png`
    const filename = path.join(__dirname, '../../photo.png')

    console.log(`

      filename: ${filename}

    `)

    const result = await client.documentTextDetection(filename)
    // const text = await result.json()
    const text = result[0].textAnnotations[0]

    console.log(`

      result: ${result}
      resultStringify: ${JSON.stringify(result)}
      text: ${text}
      text: ${JSON.stringify(text)}

    `)

    res.json(result)
    // const body = {
    //   requests: [
    //     {
    //       image: {
    //         content: base64
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

    // try {
    //   const { data } = await axios.post(
    //     `https://vision.googleapis.com/v1/images:annotate?key=${
    //       process.env.GOOGLE_VISION
    //     }`,
    //     {
    //       image: {
    //         content: base64
    //       },
    //       features: [
    //         {
    //           type: 'DOCUMENT_TEXT_DETECTION',
    //           maxResults: 1
    //         }
    //       ]
    //     }
    //   )

    //   console.log('GOOGLE VISION INFORMATION', data)
    //   res.json(data)
    // } catch (err) {
    //   next(err)
    // }

    // axios({
    //   `https://vision.googleapis.com/v1/images:annotate?key=${process.env.GOOGLE_VISION}`,

    //     method: 'POST',
    //     headers: {
    //       Accept: 'application/json',
    //       'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify(body)
    //   }
    // )

    // const parsed = await response.json()
    // this.setState({
    //   text: parsed.responses[0].textAnnotations[0].description
    // })

    // const [result] = await Promise.all([client.documentTextDetection])

    // client
    //   .labelDetection(filename)
    //   .then(results => {
    //     const labels = results[0].labelAnnotations

    //     console.log('Labels:')
    //     labels.forEach(label => console.log(label.description))
    //   })
    //   .catch(err => {
    //     console.error('ERROR:', err)
    //   })

    // const request = {
    //   image: {
    //     source: {
    //       imageUri: filename
    //     }
    //   },
    //   features: [
    //     {
    //       type: 'DOCUMENT_TEXT_DETECTION',
    //       maxResults: 1
    //     }
    //   ]
    // }
    // const res1 = await client.annotateImage(request).then(visionRes => {
    //   console.log(JSON.stringify(visionRes))
    // })
    // res.json(res1)

    // client
    //   .documentTextDetection(filename)
    //   .then(results => {
    //     const fullTextAnnotation = results[0].fullTextAnnotation
    //     console.log(`Full text: ${fullTextAnnotation.text}`)

    //     fullTextAnnotation.pages.forEach(page => {
    //       page.blocks.forEach(block => {
    //         console.log(`Block confidence: ${block.confidence}`)
    //         block.paragraphs.forEach(paragraph => {
    //           console.log(`Paragraph confidence: ${paragraph.confidence}`)
    //           paragraph.words.forEach(word => {
    //             const wordText = word.symbols.map(s => s.text).join('')
    //             console.log(`Word text: ${wordText}`)
    //             console.log(`Word confidence: ${word.confidence}`)
    //             word.symbols.forEach(symbol => {
    //               console.log(`Symbol text: ${symbol.text}`)
    //               console.log(`Symbol confidence: ${symbol.confidence}`)
    //             })
    //           })
    //         })
    //       })
    //     })
    //   })
    //   .catch(err => {
    //     console.error('ERROR:', err)
    //   })

    // const result = await client.documentTextDetection(filename)
    // const fullTextAnnotation = result.fullTextAnnotation
    // console.log(`

    //   Result: ${result}
    //   Full text: ${fullTextAnnotation.text}
    //   Res: ${result.responses[0].textAnnotations[0]}

    // `)

    // res.json(result)

    // const matches = visionsReponse.responses[0].textAnnotations[0].description

    // console.log(`

    //   result: ${JSON.stringify(result)}

    // `)
    // const body = {
    //   requests: [
    //     {
    //       image: {
    //         content: base64
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
    // // const parsed = await response.json()
    // console.log(`

    //   Response: ${response}

    // `)

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
    // res.json(response)
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
