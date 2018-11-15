const router = require('express').Router()
const { Place } = require('../db/models')
const axios = require('axios')
module.exports = router

router.get('/recent', async (req, res, next) => {
  try {
    const places = await Place.findAll()
    res.json(places)
  } catch (err) {
    next(err)
  }
})

router.get('/nearby/:lat/:lng', async (req, res, next) => {
  try {
    const { data } = await axios.get(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${
        req.params.lat
      }
      },${req.params.lng}&rankby=distance&key=${process.env.GOOGLE_PLACES}`
    )
    res.json(data)
  } catch (err) {
    next(err)
  }
})
