const { User, Place } = require('./server/db/models')
const db = require('./server/db/db')
const { green, red } = require('chalk')

const seed = async () => {
  await db.sync({ force: true })

  // seed your database here!
  const user = await Promise.all([
    User.create({
      firstName: 'James',
      lastName: 'Stephens',
      email: 'brrp@brrp.com',
      password: '123'
    }),
    User.create({
      firstName: 'Loren',
      lastName: 'Mariquit',
      email: 'loren@loren.com',
      password: '123'
    }),
    User.create({
      firstName: 'Tyler',
      lastName: 'Swartz',
      email: 'tyler@tyler.com',
      password: '123'
    }),
    User.create({
      firstName: 'Augustine',
      lastName: 'McPharlain',
      email: 'amcpharlain0@skype.com',
      password: 'MSxwZlJCF'
    }),
    User.create({
      firstName: 'Sibilla',
      lastName: 'Bream',
      email: 'sbream1@wufoo.com',
      password: 'S1sgs0WQ'
    }),
    User.create({
      firstName: 'Cacilie',
      lastName: 'Wooffinden',
      email: 'cwooffinden2@hexun.com',
      password: 'zndRTR'
    }),
    User.create({
      firstName: 'Odette',
      lastName: 'Le Gallo',
      email: 'olegallo3@cbc.ca',
      password: 'fEYpQz9yHUV'
    }),
    User.create({
      firstName: 'Lamond',
      lastName: 'Bearfoot',
      email: 'lbearfoot4@google.es',
      password: 'yUeoAajvjByP'
    }),
    User.create({
      firstName: 'Cordie',
      lastName: 'Gaines',
      email: 'cgaines5@vkontakte.ru',
      password: 'htiW1R9'
    }),
    User.create({
      firstName: 'Angil',
      lastName: 'Beauchamp',
      email: 'abeauchamp6@list-manage.com',
      password: 'By2shKJ'
    }),
    User.create({
      firstName: 'Lyssa',
      lastName: 'Prujean',
      email: 'lprujean7@wsj.com',
      password: 'iswLowGIhQMt'
    }),
    User.create({
      firstName: 'Jaine',
      lastName: 'Tatnell',
      email: 'jtatnell8@usatoday.com',
      password: 'AdrkLvCQ7Ml'
    }),
    User.create({
      firstName: 'Kelli',
      lastName: 'Domegan',
      email: 'kdomegan9@homestead.com',
      password: 'puL1ofuYO'
    })
  ])

  const places = await Promise.all([
    Place.bulkCreate([
      {
        name: 'Feedbug',
        imageUrl: 'https://picsum.photos/150/150',
        yelpId: 1,
        dateVisited: new Date().toString(),
        userId: 1
      },
      {
        name: 'Quatz',
        imageUrl: 'https://picsum.photos/150/150',
        yelpId: 2,
        dateVisited: new Date().toString(),
        userId: 1
      },
      {
        name: 'Thoughtstorm',
        imageUrl: 'https://picsum.photos/150/150',
        yelpId: 3,
        dateVisited: new Date().toString(),
        userId: 1
      },
      {
        name: 'Thoughtbeat',
        imageUrl: 'https://picsum.photos/150/150',
        yelpId: 4,
        dateVisited: new Date().toString(),
        userId: 1
      },
      {
        name: 'Gigazoom',
        imageUrl: 'https://picsum.photos/150/150',
        yelpId: 5,
        dateVisited: new Date().toString(),
        userId: 1
      },
      {
        name: 'Avaveo',
        imageUrl: 'https://picsum.photos/150/150',
        yelpId: 6,
        dateVisited: new Date().toString(),
        userId: 2
      },
      {
        name: 'Yacero',
        imageUrl: 'https://picsum.photos/150/150',
        yelpId: 7,
        dateVisited: new Date().toString(),
        userId: 2
      },
      {
        name: 'Fadeo',
        imageUrl: 'https://picsum.photos/150/150',
        yelpId: 8,
        dateVisited: new Date().toString(),
        userId: 1
      },
      {
        name: 'Jayo',
        imageUrl: 'https://picsum.photos/150/150',
        yelpId: 9,
        dateVisited: new Date().toString(),
        userId: 1
      },
      {
        name: 'Livepath',
        imageUrl: 'https://picsum.photos/150/150',
        yelpId: 10,
        dateVisited: new Date().toString(),
        userId: 1
      },
      {
        name: 'Edgepulse',
        imageUrl: 'https://picsum.photos/150/150',
        yelpId: 11,
        dateVisited: new Date().toString(),
        userId: 1
      },
      {
        name: 'Mybuzz',
        imageUrl: 'https://picsum.photos/150/150',
        yelpId: 12,
        dateVisited: new Date().toString(),
        userId: 1
      },
      {
        name: 'Buzzbean',
        imageUrl: 'https://picsum.photos/150/150',
        yelpId: 13,
        dateVisited: new Date().toString(),
        userId: 1
      },
      {
        name: 'Livetube',
        imageUrl: 'https://picsum.photos/150/150',
        yelpId: 14,
        dateVisited: new Date().toString(),
        userId: 2
      },
      {
        name: 'Roomm',
        imageUrl: 'https://picsum.photos/150/150',
        yelpId: 15,
        dateVisited: new Date().toString(),
        userId: 2
      },
      {
        name: 'Skiba',
        imageUrl: 'https://picsum.photos/150/150',
        yelpId: 16,
        dateVisited: new Date().toString(),
        userId: 2
      },
      {
        name: 'Browsebug',
        imageUrl: 'https://picsum.photos/150/150',
        yelpId: 17,
        dateVisited: new Date().toString(),
        userId: 2
      },
      {
        name: 'Kimia',
        imageUrl: 'https://picsum.photos/150/150',
        yelpId: 18,
        dateVisited: new Date().toString(),
        userId: 2
      },
      {
        name: 'Skibox',
        imageUrl: 'https://picsum.photos/150/150',
        yelpId: 19,
        dateVisited: new Date().toString(),
        userId: 2
      },
      {
        name: 'Tanoodle',
        imageUrl: 'https://picsum.photos/150/150',
        yelpId: 20,
        dateVisited: new Date().toString(),
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
