const { User } = require('./server/db/models')
const db = require('./server/db/db')
const { green, red } = require('chalk')

const seed = async () => {
  await db.sync({ force: true })

  // seed your database here!
  const user = await Promise.all([
    User.bulkCreate([
      {
        firstName: 'Augustine',
        lastName: 'McPharlain',
        email: 'amcpharlain0@skype.com',
        password: 'MSxwZlJCF'
      },
      {
        firstName: 'Sibilla',
        lastName: 'Bream',
        email: 'sbream1@wufoo.com',
        password: 'S1sgs0WQ'
      },
      {
        firstName: 'Cacilie',
        lastName: 'Wooffinden',
        email: 'cwooffinden2@hexun.com',
        password: 'zndRTR'
      },
      {
        firstName: 'Odette',
        lastName: 'Le Gallo',
        email: 'olegallo3@cbc.ca',
        password: 'fEYpQz9yHUV'
      },
      {
        firstName: 'Lamond',
        lastName: 'Bearfoot',
        email: 'lbearfoot4@google.es',
        password: 'yUeoAajvjByP'
      },
      {
        firstName: 'Cordie',
        lastName: 'Gaines',
        email: 'cgaines5@vkontakte.ru',
        password: 'htiW1R9'
      },
      {
        firstName: 'Angil',
        lastName: 'Beauchamp',
        email: 'abeauchamp6@list-manage.com',
        password: 'By2shKJ'
      },
      {
        firstName: 'Lyssa',
        lastName: 'Prujean',
        email: 'lprujean7@wsj.com',
        password: 'iswLowGIhQMt'
      },
      {
        firstName: 'Jaine',
        lastName: 'Tatnell',
        email: 'jtatnell8@usatoday.com',
        password: 'AdrkLvCQ7Ml'
      },
      {
        firstName: 'Kelli',
        lastName: 'Domegan',
        email: 'kdomegan9@homestead.com',
        password: 'puL1ofuYO'
      }
    ])
  ])

  console.log(green('Seeding success!'))
  db.close()
}

seed().catch(err => {
  console.error(red('Oh noes! Something went wrong!'))
  console.error(err)
  db.close()
})
