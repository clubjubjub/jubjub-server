const router = require('express').Router()
const { Place } = require('../db/models')
const axios = require('axios')
const yelpKey = process.env.YELP_BUSINESS_SEARCH

module.exports = router

//GET --> api/places/recent
router.get('/recent', async (req, res, next) => {
  try {
    const places = await Place.findAll()
    res.json(places)
  } catch (err) {
    next(err)
  }
})

//GET --> api/places/nearby/:lat/:lng
router.get('/nearby/:lat/:lng', async (req, res, next) => {
  try {
    const { data } = await axios.get(
      `https://api.yelp.com/v3/businesses/search?latitude=${
        req.params.lat
      }&longitude=${req.params.lng}&sort_by=distance`,
      {
        headers: {
          Authorization: `Bearer ${yelpKey}`
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
      `https://api.yelp.com/v3/businesses/${id}`,
      {
        headers: {
          Authorization: `Bearer ${yelpKey}`
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
  const userId = 1 //req.user
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
