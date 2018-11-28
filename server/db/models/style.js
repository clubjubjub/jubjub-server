const Sequelize = require('sequelize')
const db = require('../db')

const Style = db.define('style', {
  darkMode: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  primary: {
    type: Sequelize.STRING,
    defaultValue: '00FFAB'
  }
})

module.exports = Style
