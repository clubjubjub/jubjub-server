const router = require('express').Router()
const axios = require('axios')
const path = require('path')
const fs = require('fs')
const vision = require('@google-cloud/vision')
const multer = require('multer')
module.exports = router

const visionConfig = {
  key: process.env.GOOGLE_VISION
}

router.post('/', async (req, res, next) => {
  try {
    const client = new vision.ImageAnnotatorClient()
    const blob = req.body.base64
    let binaryData = new Buffer.from(blob, 'base64').toString('binary')
    await fs.writeFile('out.png', binaryData, 'binary', function(err) {
      console.log('image error: ', err) // writes out file without error, but it's not a valid image
    })

    const filename = path.join(__dirname, '../../out.png')

    const [
      landmarkDectectionResult,
      webDetectionResult,
      labelDetectionResult
    ] = await Promise.all([
      client.landmarkDetection(filename),
      client.webDetection(filename),
      client.labelDetection(filename)
    ])

    const landmark = landmarkDectectionResult[0].landmarkAnnotations[0]

    var returnObj = {}
    if (landmark) {
      returnObj = {
        name: landmark.description,
        image: blob,
        coordinates: [
          landmark.locations[0].latLng.latitude,
          landmark.locations[0].latLng.longitude
        ],
        accuracy: Number(landmark.score.toFixed(2)),
        webEntities: webDetectionResult[0].webDetection.webEntities,
        webImages: webDetectionResult[0].webDetection.visuallySimilarImages,
        label: labelDetectionResult[0].labelAnnotations[0]
      }
    } else {
      returnObj = {
        webEntities: webDetectionResult[0].webDetection.webEntities,
        webImages: webDetectionResult[0].webDetection.visuallySimilarImages,
        label: labelDetectionResult[0].labelAnnotations[0]
      }
    }

    res.send(returnObj)

    res.end()
  } catch (err) {
    next(err)
  }
})

// router.post('/upload', upload.array(), async (req, res, next) => {
//   console.log(`

//     Vision Upload route
//     req.body.uri: ${req.body.uri}
//     req.body: ${req.body}

//   `)
//   try {
//     const base64Data = req.body.uri
//     console.log(`Writing file... ${base64Data}`)
//     fs.writeFile(
//       path.join(__dirname, '..', '..', 'public', req.body.name),
//       base64Data,
//       'base64',
//       function(err) {
//         if (err) console.log(err)
//         fs.readFile(
//           path.join(__dirname, '..', '..', 'public', req.body.name, function(
//             error,
//             data
//           ) {
//             if (error) throw error
//             console.log('reading file...', data.toString('base64'))
//             res.send(data)
//           })
//         )
//       }
//     )
//   } catch (err) {
//     next(err)
//   }
// })

// router.post('/', async (req, res, next) => {
//   try {
//     // const { data } = await axios.post('/')
//     console.log('inside vision post route')
//     console.log(req.body)
//     res.json('brrp')
//   } catch (err) {
//     next(err)
//   }
// })

// Store the single image in memory.
// let latestPhoto = null

// // Upload the latest photo for this session
// router.post('/', (req, res) => {
//   // Very light error handling
//   if (!req.body) return res.sendStatus(400)

//   console.log('got photo')

//   // Update the image and respond happily
//   latestPhoto = req.body.image
//   res.sendStatus(200)
// })

// // View latest image
// router.get('/', (req, res) => {
//   // Does this session have an image yet?
//   if (!latestPhoto) {
//     return res.status(404).send('Nothing here yet')
//   }

//   console.log('sending photo')

//   try {
//     // Send the image
//     var img = Buffer.from(latestPhoto, 'base64')
//     res.writeHead(200, {
//       'Content-Type': 'image/png',
//       'Content-Length': img.length
//     })
//     res.end(img)
//   } catch (e) {
//     // Log the error and stay alive
//     console.log(e)
//     return res.sendStatus(500)
//   }
// })

// const body = {
//   requests: [
//     {
//       image: {
//         // content: photo.base64
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

// const response = await fetch(
//   `https://vision.googleapis.com/v1/images:annotate?key=${key}`,
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

// const body = {
//   requests: [
//     {
//       image: {
//         content: photo.base64
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

// router.post('/', async (req, res, next) => {
//   // Req.body: ${JSON.parse(req.body)}
//   // Req.body.photoUri: ${JSON.parse(req.body.photoUri)}
//   console.log(`

//     Inside the visions route:

//   `)

//   try {
//     const { data } = await axios.post(
//       `https://vision.googleapis.com/v1/images:annotate?key=${
//         process.env.GOOGLE_VISION
//       }`,
//       req.body.photoUri
//     )

//     console.log(`Received your POST request. You sent: ${req.body.photoUri}`)
//     res.json(data)
//     // res.send(`Received your POST request. You sent: ${req.body.photoUri}`)
//   } catch (err) {
//     next(err)
//   }
//   // res.json({ brrp: 'brrrrp' })
//   /**
//   try {
//     const { data } = await axios.post(      `https://vision.googleapis.com/v1/images:annotate?key=${
//         visionConfig.key
//       }`,
//       {
//         body: req.body
//       }
//     )

//     // const { data } = await axios.post(
//     //   `https://vision.googleapis.com/v1/images:annotate?key=${
//     //     process.env.GOOGLE_VISION
//     //   }`,
//     //   req.body
//     // )
//     console.log('DATA: ', data)
//     res.json(data)
//   } catch (err) {
//     next(err)
//   }
// */
// })
