const createAddress = require('./lib/createAddress')
const total = parseInt(process.argv[2] || 1)
const addresses = [...Array(total)].map(() => createAddress())
console.log(JSON.stringify(addresses, null, 2))
