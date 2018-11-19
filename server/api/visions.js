const router = require('express').Router()
const axios = require('axios')
module.exports = router

const visionConfig = {
  key: process.env.GOOGLE_VISION
}

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

router.post('/', async (req, res, next) => {
  // Req.body: ${JSON.parse(req.body)}
  // Req.body.photoUri: ${JSON.parse(req.body.photoUri)}
  console.log(`

    Inside the visions route:

  `)

  try {
    const { data } = await axios.post(
      `https://vision.googleapis.com/v1/images:annotate?key=${
        process.env.GOOGLE_VISION
      }`,
      req.body.photoUri
    )

    console.log(`Received your POST request. You sent: ${req.body.photoUri}`)
    res.json(data)
    // res.send(`Received your POST request. You sent: ${req.body.photoUri}`)
  } catch (err) {
    next(err)
  }
  // res.json({ brrp: 'brrrrp' })
  /**
  try {
    const { data } = await axios.post(      `https://vision.googleapis.com/v1/images:annotate?key=${
        visionConfig.key
      }`,
      {
        body: req.body
      }
    )

    // const { data } = await axios.post(
    //   `https://vision.googleapis.com/v1/images:annotate?key=${
    //     process.env.GOOGLE_VISION
    //   }`,
    //   req.body
    // )
    console.log('DATA: ', data)
    res.json(data)
  } catch (err) {
    next(err)
  }
*/
})
