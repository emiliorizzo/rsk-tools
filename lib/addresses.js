const loadJson = require('./loadJson')

function Addresses (file = 'addresses.json') {
  let addresses = []

  const list = () => addresses
  const load = async () => {
    try {
      if (addresses.length > 1) return addresses
      addresses = await loadJson(file)
      if (!Array.isArray(addresses)) throw new Error(`Invalid address file, addresses must be an array`)
      if (addresses.length < 1) throw new Error(`The addresses file is empty`)
      return addresses
    } catch (err) {
      return Promise.reject(err)
    }
  }
  const getAddressData = (address) => {
    if (addresses.length < 1) throw new Error(`The addresses list is empty`)
    if (!address) {
      let index = Math.floor(Math.random() * addresses.length)
      return addresses[index]
    }
    return addresses.find(a => a.address === address)
  }
  return Object.freeze({ list, load, getAddressData })
}

module.exports = Addresses