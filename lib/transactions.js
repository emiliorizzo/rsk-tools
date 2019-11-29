const Tx = require('ethereumjs-tx')
const { nod3 } = require('./nod3')
const { add0x, remove0x, isAddress } = require('rsk-utils')

async function sendTransaction (tx, privKey) {
  const { toHexStr } = nod3.utils
  try {
    if (!isAddress(tx.from)) throw new Error(`Invalid from: ${tx.from}`)
    if (!isAddress(tx.to)) throw new Error(`Invalid to: ${tx.to}`)
    const connected = await nod3.isConnected()
    if (!connected) throw new Error('nod3 is not connected!')
    let { nonce } = tx
    if (!nonce) nonce = await nod3.eth.getTransactionCount(tx.from)
    tx.nonce = toHexStr(nonce)


    const block = await nod3.eth.getBlock('latest')
    const { minimumGasPrice, gasLimit } = block
    tx.gasPrice = tx.gasPrice || toHexStr(minimumGasPrice)
    tx.gas = tx.gas || toHexStr(gasLimit)

    const transaction = new Tx(tx)
    if (privKey) transaction.sign(Buffer.from(remove0x(privKey), 'hex'))
    let hash = await nod3.eth.sendRawTransaction(add0x(transaction.serialize().toString('hex')))
    return { hash, tx }
  } catch (err) {
    return Promise.reject(err)
  }
}

module.exports = { sendTransaction }