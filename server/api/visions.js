const router = require('express').Router()
const axios = require('axios')
module.exports = router

router.post('/', async (req, res, next) => {
  console.log(`

    Inside the visions route:
    ${req.body}

  `)
  try {
    const { data } = await axios.post(
      `https://vision.googleapis.com/v1/images:annotate?key=${
        process.env.GOOGLE_VISION
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
})
