const router = require('express').Router()
const axios = require('axios')
module.exports = router

const visionConfig = {
  key: process.env.GOOGLE_VISION
}

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
let latestPhoto = null

// Upload the latest photo for this session
router.post('/', (req, res) => {
  // Very light error handling
  if (!req.body) return res.sendStatus(400)

  console.log('got photo')

  // Update the image and respond happily
  latestPhoto = req.body.image
  res.sendStatus(200)
})

// View latest image
router.get('/', (req, res) => {
  // Does this session have an image yet?
  if (!latestPhoto) {
    return res.status(404).send('Nothing here yet')
  }

  console.log('sending photo')

  try {
    // Send the image
    var img = Buffer.from(latestPhoto, 'base64')
    res.writeHead(200, {
      'Content-Type': 'image/png',
      'Content-Length': img.length
    })
    res.end(img)
  } catch (e) {
    // Log the error and stay alive
    console.log(e)
    return res.sendStatus(500)
  }
})

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
