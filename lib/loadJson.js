const fs = require('fs')
const addressesFile = 'addresses.json'
const { promisify } = require('util')
const readFile = promisify(fs.readFile)

async function loadJson (jsonFile) {
  try {
    if (!fs.existsSync(jsonFile)) throw new Error(`Missing ${addressesFile}`)
    let content = await readFile(jsonFile)
    content = JSON.parse(content)
    return content
  } catch (err) {
    return Promise.reject(err)
  }
}

module.exports = loadJson