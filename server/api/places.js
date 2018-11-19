const router = require('express').Router()
const axios = require('axios')
const { Place } = require('../db/models')
module.exports = router

const yelpConfig = {
  key: process.env.YELP_BUSINESS_SEARCH
}

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
      `https://api.yelp.com/v3/businesses/search?latitude=${
        req.params.lat
      }&longitude=${req.params.lng}&sort_by=distance`,
      {
        headers: {
          Authorization: `Bearer ${yelpConfig.key}`
        }
      }
    )
    res.json(data)
  } catch (err) {
    next(err)
  }
})

/** Route for Google Places API: */
// router.get('/nearby/:lat/:lng', async (req, res, next) => {
//   try {
//     const { data } = await axios.get(
//       `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${
//         req.params.lat
//       }
//       ,${req.params.lng}&rankby=distance&type=restaurant&key=${
//         process.env.GOOGLE_PLACES
//       }`
//     )
//     res.json(data)
//   } catch (err) {
//     next(err)
//   }
// })
