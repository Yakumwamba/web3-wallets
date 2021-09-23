import { getWallet } from 'src'
import { mock, resetMocks, trigger } from 'depay-web3-mock'

describe('Coinbase Wallet', () => {

  ['ethereum', 'bsc'].forEach((blockchain)=>{

    describe(blockchain, ()=> {

      const accounts = ['0xd8da6bf26964af9d7eed9e03e53415d37aa96045']
      beforeEach(()=>{
        resetMocks()
        mock({ blockchain, wallet: 'coinbase' })
      })
      beforeEach(()=>mock({ blockchain, accounts: { return: accounts } }))

      it('should detect the wallet type', () => {
        expect(getWallet().name).toBe('Coinbase Wallet');
      });

      it('provides a connect function', async () => {
        expect(await getWallet().connect()).toStrictEqual(['0xd8da6bf26964af9d7eed9e03e53415d37aa96045']);
      });

      it('provides an account function', async () => {
        expect(await getWallet().account()).toStrictEqual('0xd8da6bf26964af9d7eed9e03e53415d37aa96045');
      });

      it('provides an accounts function', async () => {
        expect(await getWallet().accounts()).toStrictEqual(['0xd8da6bf26964af9d7eed9e03e53415d37aa96045']);
      });

      it('provides an logo', async () => {
        expect(getWallet().logo).toStrictEqual('data:image/png;base64,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');
      });

      it('registers a callback and informs about active connected account changes', async () => {
        let accountChangedTo;

        getWallet().on('account', (newAccount)=>{
          accountChangedTo = newAccount;
        })

        trigger('accountsChanged', ['0xd8da6bf26964af9d7eed9e03e53415d37aa96045'])

        expect(accountChangedTo).toEqual('0xd8da6bf26964af9d7eed9e03e53415d37aa96045')
      })

      it('registers a callback and informs about if any connected accounts have changed', async () => {
        let accountsChangedTo;

        getWallet().on('accounts', (newAccounts)=>{
          accountsChangedTo = newAccounts;
        })

        trigger('accountsChanged', ['0xd8da6bf26964af9d7eed9e03e53415d37aa96045'])

        expect(accountsChangedTo).toEqual(['0xd8da6bf26964af9d7eed9e03e53415d37aa96045'])
      })

      it('registers a callback and informs about wallet changes network', async () => {
        let networkChangedTo;

        getWallet().on('network', (newNetwork)=>{
          networkChangedTo = newNetwork;
        })

        trigger('chainChanged', '0x38')
        expect(networkChangedTo).toEqual('bsc')

        trigger('chainChanged', '0x89')
        expect(networkChangedTo).toEqual('polygon')

        trigger('chainChanged', '0x1')
        expect(networkChangedTo).toEqual('ethereum')
      })

      it('provides the blockchains that are supported by the wallet', () => {
        expect(getWallet().blockchains).toEqual(['ethereum', 'bsc']);
      });
      
      it('provides a link to install the wallet', () => {
        expect(getWallet().install).toEqual('https://wallet.coinbase.com');
      });
    });
  });
});
