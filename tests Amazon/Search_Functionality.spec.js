const { test, expect } = require('@playwright/test')
const { LoginPage } = require('../PageObjects/AmazonLoginPage')
const { HomePage } = require('../PageObjects/AmazonHomePage')
var testdata = require('../test-data/AmazonProductCheckout-test-data.json')


//to verify the Search Functionality of Amazon.com
test.describe.configure({ mode: 'serial' })
testdata.forEach(data => {
  test.describe(`Validation Search Functionality `, async () => {
    let page
    test.beforeAll(async ({ browser }) => {
      page = await browser.newPage()
      const loginPage = new LoginPage(page,expect)
      const homePage = new HomePage(page,expect)
      await page.goto(loginPage.LoginPageURL)
      await loginPage.ProceedWithUsername(data.Username)
      await loginPage.ProceedWithPassword(data.Password)
      await homePage.VerifyNavigaitonToHomepage(page)
    })

    test(`Searching for a product and verification of its result`, async () => {

      //verification of error message by proceeding without Mail Id.
      const homePage = new HomePage(page,expect)
      await homePage.SearchForAProduct(data.SearchProduct)
      const ResultNo = await homePage.VerifySearchResults(page,data.ProductName,data.Detail1,data.Detail2)
      console.log(`Result ${ResultNo} matches the details of searched product`)
    })

  })

})

