const {expect} = require('@playwright/test')

class TransferFundsPage{

constructor()
{
   
}

async TransferFunds(request,FromAccount,ToAccount,TransferAmount)
{
    //to send API request to transfer funds from one account to another based on account id's passed
    const TransferResponse = await request.post(`https://parabank.parasoft.com/parabank/services_proxy/bank/transfer?fromAccountId=${FromAccount}&toAccountId=${ToAccount}&amount=${TransferAmount}`,)
    expect(TransferResponse.status()).toBe(200)
    expect(await TransferResponse.text()).toContain('Successfully transferred')
    return TransferResponse.text()
}



}
module.exports = {TransferFundsPage}