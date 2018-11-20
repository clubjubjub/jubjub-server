const { User, Place } = require('./server/db/models')
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
      },
      {
        firstName: 'James',
        lastName: 'Stephens',
        email: 'brrp@brrp.com',
        password: '123'
      }
    ])
  ])

  const places = await Promise.all([
    Place.bulkCreate([
      {
        lat: 52.5687063,
        lng: 17.2581487,
        name: 'Feedbug',
        userId: 1
      },
      {
        lat: 40.0480719,
        lng: 20.7528378,
        name: 'Quatz',
        userId: 1
      },
      {
        lat: -11.388934,
        lng: 43.390991,
        name: 'Thoughtstorm',
        userId: 1
      },
      {
        lat: 13.034203,
        lng: 123.449929,
        name: 'Thoughtbeat',
        userId: 1
      },
      {
        lat: 39.2762158,
        lng: -9.2806096,
        name: 'Gigazoom',
        userId: 1
      },
      {
        lat: 54.4658152,
        lng: 19.9348453,
        name: 'Avaveo',
        userId: 1
      },
      {
        lat: -34.8411832,
        lng: -58.4389753,
        name: 'Yacero',
        userId: 1
      },
      {
        lat: 3.1035814,
        lng: 101.640078,
        name: 'Fadeo',
        userId: 1
      },
      {
        lat: '45.85007',
        lng: '-72.0658',
        name: 'Jayo',
        userId: 1
      },
      {
        lat: 61.228665,
        lng: 14.040054,
        name: 'Livepath',
        userId: 1
      },
      {
        lat: -6.8686728,
        lng: 107.516493,
        name: 'Edgepulse',
        userId: 1
      },
      {
        lat: 59.1280914,
        lng: 9.6693512,
        name: 'Mybuzz',
        userId: 1
      },
      {
        lat: 51.9328106,
        lng: 21.3032807,
        name: 'Buzzbean',
        userId: 1
      },
      {
        lat: 39.728885,
        lng: 116.341609,
        name: 'Livetube',
        userId: 2
      },
      {
        lat: -12.182745,
        lng: -39.2167652,
        name: 'Roomm',
        userId: 2
      },
      {
        lat: 40.824367,
        lng: 119.837124,
        name: 'Skiba',
        userId: 2
      },
      {
        lat: 45.3612879,
        lng: 18.693916,
        name: 'Browsebug',
        userId: 2
      },
      {
        lat: 30.66974,
        lng: 120.79411,
        name: 'Kimia',
        userId: 2
      },
      {
        lat: 1.78925,
        lng: 99.1089779,
        name: 'Skibox',
        userId: 2
      },
      {
        lat: 38.7554084,
        lng: -9.3408903,
        name: 'Tanoodle',
        userId: 2
      }
    ])
  ])

  console.log(
    green(`

      Seeding success!

    `)
  )
  db.close()
}

seed().catch(err => {
  console.error(red('Oh noes! Something went wrong!'))
  console.error(err)
  db.close()
})
