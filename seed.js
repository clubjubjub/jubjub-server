const { User } = require('./server/db/models')
const db = require('./server/db/db')
const { green, red } = require('chalk')

const seed = async () => {
  await db.sync({ force: true })

  // seed your database here!
  const user = await Promise.all([
    User.bulkCreate([
      {
        id: 1,
        firstName: 'Augustine',
        lastName: 'McPharlain',
        email: 'amcpharlain0@skype.com',
        password: 'MSxwZlJCF',
        riskLevel: 9
      },
      {
        id: 2,
        firstName: 'Sibilla',
        lastName: 'Bream',
        email: 'sbream1@wufoo.com',
        password: 'S1sgs0WQ',
        riskLevel: 76
      },
      {
        id: 3,
        firstName: 'Cacilie',
        lastName: 'Wooffinden',
        email: 'cwooffinden2@hexun.com',
        password: 'zndRTR',
        riskLevel: 99
      },
      {
        id: 4,
        firstName: 'Odette',
        lastName: 'Le Gallo',
        email: 'olegallo3@cbc.ca',
        password: 'fEYpQz9yHUV',
        riskLevel: 78
      },
      {
        id: 5,
        firstName: 'Lamond',
        lastName: 'Bearfoot',
        email: 'lbearfoot4@google.es',
        password: 'yUeoAajvjByP',
        riskLevel: 58
      },
      {
        id: 6,
        firstName: 'Cordie',
        lastName: 'Gaines',
        email: 'cgaines5@vkontakte.ru',
        password: 'htiW1R9',
        riskLevel: 65
      },
      {
        id: 7,
        firstName: 'Angil',
        lastName: 'Beauchamp',
        email: 'abeauchamp6@list-manage.com',
        password: 'By2shKJ',
        riskLevel: 64
      },
      {
        id: 8,
        firstName: 'Lyssa',
        lastName: 'Prujean',
        email: 'lprujean7@wsj.com',
        password: 'iswLowGIhQMt',
        riskLevel: 44
      },
      {
        id: 9,
        firstName: 'Jaine',
        lastName: 'Tatnell',
        email: 'jtatnell8@usatoday.com',
        password: 'AdrkLvCQ7Ml',
        riskLevel: 5
      },
      {
        id: 10,
        firstName: 'Kelli',
        lastName: 'Domegan',
        email: 'kdomegan9@homestead.com',
        password: 'puL1ofuYO',
        riskLevel: 78
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
