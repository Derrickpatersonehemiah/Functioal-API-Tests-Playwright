const {expect} = require('@playwright/test')

class CreateNewAccountPage{


async CreateNewAccount(request,CustomerId,FromAccount)
{
    //to send API request to create an account and get the account id form response
    const OpenAccount = await request.post(` https://parabank.parasoft.com/parabank/services_proxy/bank/createAccount?customerId=${CustomerId}&newAccountType=1&fromAccountId=${FromAccount}`,)       
    expect(OpenAccount .status()).toBe(200)
    const OpenAccResponse = await OpenAccount.text()
    const NewAccountDetails = JSON.parse(OpenAccResponse)
    return NewAccountDetails.id
}



}
module.exports = {CreateNewAccountPage}