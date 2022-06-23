import Store from '../src/stores/file.js'
import { Indexer } from '../src/index.js'
import dotenv from 'dotenv'
import path from 'path'
import fs from 'fs'

dotenv.config()

const CONTRACT = '0x2a77052d0777f4f02ddb96f69416adcf130c32b0' // Shop Pass Mainnet
const GATEWAY = `https://mainnet.infura.io/v3/${process.env.INFURA_ID}`

const abiString = fs.readFileSync('example/abi.json', 'utf8')
const abi = JSON.parse(abiString).abi

const sync = async () => {
    const indexing = {
        events: {
            Transfer: {
                keys: ['from', 'to'],
            },
        },
    }
    const store = new Store(indexing, './example/data')
    const indexer = new Indexer(store, abi, CONTRACT, GATEWAY)
    await indexer.syncAll({
        fromBlock: 14979977,
        batchSize: 5,
    })
}

sync()
    .then(() => {})
    .catch((error) => {
        console.error('Fatal error', error)
    })
