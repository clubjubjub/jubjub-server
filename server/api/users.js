const router = require('express').Router()
const { User } = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'firstName', 'lastName', 'email', 'createdAt']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

//update user email
router.put('/email', async (req, res, next) => {
  const userId = 1

  const email = req.body.email
  try {
    const user = await User.findOne({
      where: {
        userId
      }
    })
    const updated = user.update({
      email
    })
    res.json(updated)
  } catch (err) {
    next(err)
  }
})
