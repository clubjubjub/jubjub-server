const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'))
router.use('/places', require('./places'))
router.use('/visions', require('./visions'))
router.use('/styles', require('./styles'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
