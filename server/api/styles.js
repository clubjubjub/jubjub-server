const router = require('express').Router()
const { Style } = require('../db/models')
module.exports = router

router.get('/:id', async (req, res, next) => {
  try {
    const userId = Number(req.params.id)
    const style = await Style.findOne({
      where: {
        userId
      }
    })
    res.json(style)
  } catch (err) {
    console.log('err', err)
    next(err)
  }
})

router.put('/darkMode/:id', async (req, res, next) => {
  try {
    const userId = req.params.id
    const darkMode = req.body.darkMode
    const style = await Style.findOne({
      where: {
        userId
      }
    })
    const updated = await style.update({
      darkMode
    })
    res.json(updated)
  } catch (err) {
    next(err)
  }
})

router.put('/darkMode/:id', async (req, res, next) => {
  try {
    const userId = req.params.id
    const darkMode = req.body.darkMode
    console.log('this is darkMode status', darkMode)
    const style = await Style.findOne({
      where: {
        userId
      }
    })
    const updated = await style.update({
      darkMode
    })
    res.json(updated)
  } catch (err) {
    next(err)
  }
})
