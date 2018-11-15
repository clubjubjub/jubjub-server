const router = require('express').Router()
const axios = require('axios')
module.exports = router

//https://vision.googleapis.com/v1/images:annotate?key=${key}`

router.post('/', async (req, res, next) => {
  console.log(`

    Inside the visions route:
    ${req.body}

  `)
  try {
    const { data } = await fetch(
      `https://vision.googleapis.com/v1/images:annotate?key=${
        process.env.GOOGLE_VISION
      }`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: req.body
      }
    )

    // const { data } = await axios.post(
    //   `https://vision.googleapis.com/v1/images:annotate?key=${
    //     process.env.GOOGLE_VISION
    //   }`,
    //   req.body
    // )
    res.json(data)
  } catch (err) {
    next(err)
  }
})
