const crypto = require('crypto')
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
  }
})

module.exports = Place
