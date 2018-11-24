const path = require('path')
const express = require('express')
const morgan = require('morgan')
const compression = require('compression')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const session = require('express-session')
const passport = require('passport')
const SequelizeStore = require('connect-session-sequelize')(session.Store)
const db = require('./db')
const sessionStore = new SequelizeStore({ db })
const PORT = process.env.PORT || 3000
const app = express()
const { blue } = require('chalk')
module.exports = app

if (process.env.NODE_ENV !== 'production') require('../secrets.js')

// passport registration
passport.serializeUser((user, done) => done(null, user.id))

passport.deserializeUser(async (id, done) => {
  try {
    const user = await db.models.user.findById(id)
    done(null, user)
  } catch (err) {
    done(err)
  }
})

const createApp = () => {
  app.use(cors())
  app.use(morgan('dev'))
  app.use(express.json({ limit: '100mb' })) // limit for images
  app.use(express.urlencoded({ extended: true, limit: '100mb' }))
  app.use(compression())

  // session middleware with passport
  app.use(
    session({
      secret: process.env.SESSION_SECRET || 'jub jub',
      store: sessionStore,
      resave: false,
      saveUninitialized: false
    })
  )

  app.use(passport.initialize())
  app.use(passport.session())

  app.post('/upload', async (req, res, next) => {
    console.log(`

      Request received:

    `)
    console.log(req.body)
    res.send('image RECEIVEDDDDDDDDDDDDDDd')
  })

  app.use('/auth', require('./auth'))
  app.use('/api', require('./api'))

  app.use(express.static(path.join(__dirname, '..', 'public')))

  app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(err.status || 500).send(err.message || 'Internal server error')
  })
}

const startListening = () => {
  app.listen(PORT, () =>
    console.log(
      blue(`

        Listening on port ${PORT}
        http://localhost:${PORT}/

      `)
    )
  )
}

const syncDb = () => db.sync()

async function bootApp() {
  await sessionStore.sync()
  await syncDb()
  await createApp()
  await startListening()
}

require.main === module ? bootApp() : createApp()
