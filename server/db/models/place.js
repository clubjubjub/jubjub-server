const Sequelize = require('sequelize')
const db = require('../db')

const Place = db.define('place', {
  name: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  lat: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  lng: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  imageUrl: {
    type: Sequelize.TEXT
  },
  rating: {
    type: Sequelize.DECIMAL
  },
  phone: {
    type: Sequelize.STRING
  },
  addressOne: {
    type: Sequelize.TEXT
  },
  addressTwo: {
    type: Sequelize.TEXT
  },
  addressThree: {
    type: Sequelize.TEXT
  },
  city: {
    type: Sequelize.TEXT
  },
  state: {
    type: Sequelize.TEXT
  },
  zipCode: {
    type: Sequelize.TEXT
  },
  country: {
    type: Sequelize.STRING
  }
})

module.exports = Place
