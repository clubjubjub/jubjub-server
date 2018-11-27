const Sequelize = require('sequelize')
const db = require('../db')

const Place = db.define('place', {
  name: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  imageUrl: {
    type: Sequelize.TEXT
  },
  yelpId: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  dateVisited: {
    type: Sequelize.TEXT
  },
  lat: {
    type: Sequelize.DECIMAL
  },
  lng: {
    type: Sequelize.DECIMAL
  }
})

module.exports = Place
