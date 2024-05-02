class AccountOverivewPage{


async GetAccountDetails(request,AccountNo)
{
    //to send API request to get the account details
    const GetAccountInfo = await request.get(`https://parabank.parasoft.com/parabank/services_proxy/bank/accounts/${AccountNo}`,)
    const Info = await GetAccountInfo.text()
    const Details = JSON.parse(Info)
    return Details
}



}
module.exports = {AccountOverivewPage}