const router = require('express').Router()
const axios = require('axios')
const { Place } = require('../db/models')
const yelpConfig = {
  key: process.env.YELP_BUSINESS_SEARCH
}
module.exports = router

//GET --> api/places/recent
router.get('/recent', async (req, res, next) => {
  try {
    const places = await Place.findAll({
      where: {
        userId: req.user.userId
      }
    })
    res.json(places)
  } catch (err) {
    next(err)
  }
})

//GET --> api/places/nearby/:lat/:lng
// router.post('/recent', async (req, res, next) => {
//   const {
//     name,
//     coordinates,
//     image_url,
//     rating,
//     location,
//     display_phone
//   } = req.body
//   const userId = 1 //req.user

//   try {
//     const created = await Place.create({
//       name,
//       lat: coordinates.latitude,
//       lng: coordinates.longitude,
//       imageUrl: image_url,
//       rating,
//       phone: display_phone,
//       addressOne: location.address1,
//       addressTwo: location.address2,
//       addressThree: location.address3,
//       city: location.city,
//       state: location.state,
//       zipCode: location.zip_code,
//       country: location.country,
//       userId
//     })
//     console.log('SAVED TO RECENTS: ', created)
//     res.json(created)
//   } catch (err) {
//     console.error(err)
//   }
// })

router.get('/nearby/:lat/:lng', async (req, res, next) => {
  try {
    const { data } = await axios.get(
      `https://api.yelp.com/v3/businesses/search?latitude=${
        req.params.lat
      }&longitude=${req.params.lng}&sort_by=distance&limit=40`,
      {
        headers: {
          Authorization: `Bearer ${yelpConfig.key}`
        }
      }
    )
    console.log('THIS IS THE YELP DATA', data)
    res.json(data)
  } catch (err) {
    next(err)
  }
})

//GET ==> api/places/recent/:id
router.get('/recent/:id', async (req, res, next) => {
  try {
    const { data } = await axios.get(
      `https://api.yelp.com/v3/businesses/${req.params.id}`,
      {
        headers: {
          Authorization: `Bearer ${yelpConfig.key}`
        }
      }
    )

    console.log('YELP DATA for SINGLE BUSINESS', data)
    res.json(data)
  } catch (err) {
    next(err)
  }
})

//POST --> api/places/recent
router.post('/recent', async (req, res, next) => {
  console.log('THE REQ USER: ', req.user)
  const userId = req.user.userId
  const { name, image_url, id } = req.body
  const date = new Date()
  const dateVisited = date.toString()

  try {
    await Place.findOrCreate({
      where: {
        userId,
        name,
        imageUrl: image_url,
        yelpId: id
      }
    })

    const [numberOfAffectedRows, affectedRows] = await Place.update(
      {
        dateVisited
      },
      {
        where: { yelpId: id, userId },
        returning: true
      }
    )

    res.json(affectedRows)
  } catch (err) {
    console.error(err)
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
