const crypto = require('crypto')
const ethUtil = require('ethereumjs-util')
const { add0x } = require('rsk-utils')

function createAddress () {
  const private = crypto.randomBytes(32)
  const pubKey = add0x(ethUtil.privateToPublic(private).toString('hex'))
  const address = add0x(ethUtil.privateToAddress(private).toString('hex'))
  let privKey = add0x(private.toString('hex'))
  return { address, privKey, pubKey }
}

module.exports = createAddress 