const router = require('express').Router()
const { User } = require('../db/models')
const fs = require('fs')
const path = require('path')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'firstName', 'lastName', 'email', 'phone', 'createdAt']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    console.log('inside user route')
    const id = Number(req.params.id)
    console.log(id, typeof id)
    const user = await User.findById(id)
    console.log('this is the user', user)
    req.login(user, err => (err ? next(err) : res.json(user)))
  } catch (err) {
    console.log('err', err)
    next(err)
  }
})

//update user profile image
router.put('/avatar', async (req, res, next) => {
  try {
    const userId = req.user.id
    const base64 = req.body.base64
    const photo = new Buffer.from(base64, 'base64').toString('binary')

    const UPLOADS_DIR = path.join(__dirname, '..', '..', 'uploads')
    const DATE_NOW = Date.now()
    const file = `uploads/avatars/${userId}-avatar-${DATE_NOW}.png`

    await fs.writeFile(file, photo, 'binary', err => {
      if (err) throw err
      console.log(`The file has been saved!`)
    })

    console.log(`

    File (location + name): ${file}

    Req.body.base64: ${req.body.base64}

    Req.body.base64: ${JSON.stringify(req.body.base64).slice(0, 20)}

  `)

    // const user = await User.findOne({
    //   where: {
    //     id: userId
    //   }
    // })
    // const updated = await user.update({
    //   avatar
    // })
    // res.json(updated)
  } catch (err) {
    next(err)
  }
})

//update user email
router.put('/email', async (req, res, next) => {
  try {
    const userId = req.user.id
    const email = req.body.email
    console.log('this is the email -------------', email)
    const user = await User.findOne({
      where: {
        id: userId
      }
    })
    const updated = await user.update({
      email
    })
    res.json(updated)
  } catch (err) {
    next(err)
  }
})

//update user name
router.put('/name', async (req, res, next) => {
  try {
    const userId = req.user.id

    const firstName = req.body.firstName
    const lastName = req.body.lastName
    console.log('this is the name -------------', firstName, lastName)
    const user = await User.findOne({
      where: {
        id: userId
      }
    })
    const updated = await user.update({
      firstName,
      lastName
    })
    res.json(updated)
  } catch (err) {
    next(err)
  }
})

//update user password
router.put('/password', async (req, res, next) => {
  try {
    const userId = req.user.id
    const password = req.body.password
    console.log('this is the pass -------------', password)
    const user = await User.findOne({
      where: {
        id: userId
      }
    })
    const updated = await user.update({
      password
    })
    res.json(updated)
  } catch (err) {
    next(err)
  }
})

//update user phone
router.put('/phone', async (req, res, next) => {
  try {
    const userId = req.user.id
    const phone = req.body.phone
    console.log('this is the phone -------------', phone)
    const user = await User.findOne({
      where: {
        id: userId
      }
    })
    const updated = await user.update({
      phone
    })
    res.json(updated)
  } catch (err) {
    next(err)
  }
})
