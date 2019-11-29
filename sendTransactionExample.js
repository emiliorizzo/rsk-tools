
const { sendTransaction } = require('./lib/transactions')
const Addresses = require('./lib/addresses')
const addresses = Addresses()


sendTx({ value: '0x0001' })

async function sendTx (tx) {
  try {
    await addresses.load()
    let sender = addresses.getAddressData(tx.from)
    tx.from = sender.address
    if (!tx.to) tx.to = addresses.getAddressData().address
    let { privKey } = sender
    if (!privKey) throw new Error(`Missing sender privKey`)
    const { hash, nonce } = await sendTransaction(tx, privKey)
    console.log(`Tx hash: ${hash}`)
    console.log(`${JSON.stringify(tx, null, 2)}`)
  } catch (err) {
    console.error(err)
    process.exit(9)
  }
}



