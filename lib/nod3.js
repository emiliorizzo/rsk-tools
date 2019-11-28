const Nod3 = require('nod3').default
const url = process.env['url'] || 'http://localhost:4444'
const nod3 = new Nod3(new Nod3.providers.HttpProvider(url))

module.exports = { nod3 }