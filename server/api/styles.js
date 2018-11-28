const router = require('express').Router()
const { User, Styles } = require('../db/models')
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

router.put('/primary/:id', async (req, res, next) => {
  try {
    const userId = req.params.id
    const primary = req.body.primary
    const style = await Style.findOne({
      where: {
        userId
      }
    })
    const updated = await style.update({
      primary
    })
    res.json(updated)
  } catch (err) {
    next(err)
  }
})
