const { test, expect } = require('@playwright/test')
const { LoginPage } = require('../PageObjects/ParaBankLoginPage')
const { CreateNewAccountPage } = require('../PageObjects/CreateNewAccountPage')
const { AccountOverivewPage } = require('../PageObjects/AccountOverivewPage')
const { TransferFundsPage } = require('../PageObjects/TransferFundsPage')
var testdata = require('../test-data/parabank-test-data.json')

//API verification banking functionalities through data driven method
testdata.forEach(data => {
    test.describe('API Verification of Banking operations, ', () => {

        test.beforeEach(async ({request}) => {
            //Login Request
            const loginPage = new LoginPage(expect)
            await loginPage.ParaBankLogin(request,data)
          })
        var ExistingAccountBalance
        var NewAccountNo
        var NewAccountBalance
        var AccountDetails

        test('Open new account', async ({ request }) => {

            const newAccountPage = new CreateNewAccountPage()
            const accountOverviewPage = new AccountOverivewPage()

            //Get Account Balance
            AccountDetails = await accountOverviewPage.GetAccountDetails(request, data.ExistingAccNo)
            console.log("Existing Account balance before new account:", AccountDetails.balance)
            ExistingAccountBalance = AccountDetails.balance

            //Create New Account request
            NewAccountNo = newAccountPage.CreateNewAccount(request, CustomerId,  data.ExistingAccNo)
            console.log("New Account created! ID:", NewAccountNo)

            //To create a new account $100 will be transfered to new account from existing Account
            //Verify whether balance is updated for Existing account   
            AccountDetails = await accountOverviewPage.GetAccountDetails(request,  data.ExistingAccNo)
            console.log("Existing Account balance after new account:", AccountDetails.balance, '\n')
            expect(await AccountDetails.balance).toBe(ExistingAccountBalance - 100)
            ExistingAccountBalance = AccountDetails.balance
        })




        test('Verify created account details', async ({ request }) => {

            const accountOverviewPage = new AccountOverivewPage()

            //Get New account details
            AccountDetails = await accountOverviewPage.GetAccountDetails(request, NewAccountNo)
            NewAccountBalance = AccountDetails.balance
            console.log(AccountDetails, '\n')

            //Verification of New account details
            expect(await AccountDetails.id).toBe(NewAccountNo)
            expect(await AccountDetails.customerId).toBe(data.CustomerId)
            expect(await AccountDetails.type).toBe(data.NewAccountType)
            expect(await AccountDetails.balance).toBe(100)
        })



        test('Transfer Funds', async ({ request }) => {

            const accountOverviewPage = new AccountOverivewPage()
            const transferFundsPage = new TransferFundsPage()

            //Request to transfer funds
            TransferResponse = await transferFundsPage.TransferFunds(request, data.ExistingAccNo, NewAccountNo, data.TransferAmount)
            console.log(await TransferResponse)

            //Verification of transferred funds
            //verification of new account balance
            AccountDetails = await accountOverviewPage.GetAccountDetails(request, NewAccountNo)
            expect(await AccountDetails.balance).toBe(NewAccountBalance + TransferAmount)
            console.log("New Account balance after transfer:", AccountDetails.balance)
            NewAccountBalance = AccountDetails.balance

            //verifyication of existing account balance
            AccountDetails = await accountOverviewPage.GetAccountDetails(request, data.ExistingAccNo)
            expect(await AccountDetails.balance).toBe(ExistingAccountBalance - TransferAmount)
            console.log("Existing Account balance after transfer:", AccountDetails.balance)
            ExistingAccountBalance = AccountDetails.balance


        })


    })

})
