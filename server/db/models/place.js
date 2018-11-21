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
  }
})

module.exports = Place
