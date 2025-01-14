import BigNumber from 'bignumber.js'
import FileStore from '../file'

let store
beforeAll(() => {
    const indexing = {
        events: {
            Withdraw: {
                keys: ['user'],
            },
            Deposit: {
                keys: ['user'],
            },
            Trade: {
                keys: ['tokenGive', 'tokenGet', 'get', 'give'],
            },
        },
    }
    store = new FileStore(indexing, '/tmp/indexer-file-test')
})

test('Should index events according to indexing settings', async () => {
    const depositEvent = {
        args: {
            user: '0xD0M',
            amount: new BigNumber('1000'),
        },
        event: 'Deposit',
    }
    const depositEvent2 = {
        args: {
            user: '0xD0M',
            amount: new BigNumber('1000'),
        },
        event: 'Deposit',
    }
    const depositEvent3 = {
        args: {
            user: '0xD0M2',
            amount: new BigNumber('1000'),
        },
        event: 'Deposit',
    }
    const withdrawEvent = {
        args: {
            user: '0xD0M',
            amount: new BigNumber('100'),
        },
        event: 'Withdraw',
    }
    await store.reset()
    await store.put([depositEvent, depositEvent2, depositEvent3, withdrawEvent])
    const depositEvents = await store.get('Deposit', 'user', '0xD0M')
    expect(depositEvents.length).toBe(2)
    expect(depositEvents[0].args.amount.toString()).toBe('1000')
    const withdrawEvents = await store.get('Withdraw', 'user', '0xD0M')
    expect(withdrawEvents.length).toBe(1)
})
