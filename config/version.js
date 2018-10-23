const fs = require('fs')
const pack = require('../package.json')

// update installation.md
const installation = fs
  .readFileSync('./gitbook/installation.md', 'utf-8')
  .replace(
    /https:\/\/unpkg\.com\/vuex-orm-lokijs@[\d.]+.[\d]+\/dist\/vuex-orm-lokijs\.js/,
    'https://unpkg.com/vuex-orm-lokijs@' + pack.version + '/dist/vuex-orm-lokijs.js.'
  )
fs.writeFileSync('./gitbook/installation.md', installation)
