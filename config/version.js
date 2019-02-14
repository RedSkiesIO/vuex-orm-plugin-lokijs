const fs = require('fs')
const pack = require('../package.json')

// update installation.md
const installation = fs
  .readFileSync('./gitbook/installation.md', 'utf-8')
  .replace(
    /https:\/\/unpkg\.com\/vuex-orm-plugin-loki@[\d.]+.[\d]+\/dist\/vuex-orm-plugin-loki\.js/,
    'https://unpkg.com/vuex-orm-plugin-loki@' + pack.version + '/dist/vuex-orm-plugin-loki.js.'
  )
fs.writeFileSync('./gitbook/installation.md', installation)
