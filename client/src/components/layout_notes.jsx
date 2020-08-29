`https://api.github.com/users/{user}/repos`,
  [

    {
      id: 85738,
      name 'repo name 1',
      owner: {
        name: yuto
      }
    },
    {
      id: 85739,
      name 'repo name 2',
      owner: {
        name: yuto
      }
    },
    {
      id: 85740,
      name 'repo name 3',
      owner: {
        name: yuto
      }
    },

  ]

repos[i].html_url
repos[i].name


use tong_db
db.createCollection('cats')

db.cats.insert({ name: 'Gracie', age: '3' })

db.cats.update({ name: 'Gracie', age: '3' }, { $set: { name: "Gray bb", age: '3.5' } })
