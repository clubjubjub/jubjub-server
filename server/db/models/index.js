const User = require('./user')
const Place = require('./place')

User.hasMany(Place)
Place.belongsTo(User)

module.exports = {
  User,
  Place
}
