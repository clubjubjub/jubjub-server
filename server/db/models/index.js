const User = require('./user')
const Place = require('./place')
const Style = require('./style')

User.hasMany(Place)
Place.belongsTo(User)
User.hasOne(Style)
Style.belongsTo(User)

module.exports = {
  User,
  Place,
  Style
}
