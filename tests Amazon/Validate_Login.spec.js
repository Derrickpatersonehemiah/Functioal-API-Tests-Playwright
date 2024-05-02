const { test, expect } = require('@playwright/test')
const { LoginPage } = require('../PageObjects/AmazonLoginPage')
const { HomePage } = require('../PageObjects/AmazonHomePage')
var testdata = require('../test-data/AmazonLoginVerification-test-data.json')


//to verify the Addition/Searching/Deletion functionalities of recruitment through data driven method
test.describe.configure({ mode: 'serial' })
testdata.forEach(data => {
  test.describe(`Validation of login functionality `, async () => {
    let page
    test.beforeAll(async ({ browser }) => {
      page = await browser.newPage()
    })
    test.beforeEach(async () => {
      const loginPage = new LoginPage(page,expect)
      await page.goto(loginPage.LoginPageURL)
    })

    test(`by proceeding without a Mail-Id`, async () => {

      //verification of error message by proceeding without Mail Id.
      const loginPage = new LoginPage(page,expect)
      await loginPage.ProceedWithUsername("")
      await expect(loginPage.NoEmailAlert).toHaveText("Enter your email or mobile phone number")
    })

    test(`by proceeding with invalid mail-Id`, async () => {

      //verification of error message by proceeding with invalid Mail Id.
      const loginPage = new LoginPage(page,expect)
      await loginPage.ProceedWithUsername(data.InvalidUsername)
      await expect(loginPage.NoAccountAlert).toHaveText("We cannot find an account with that email address")
    })

    test(`by proceeding with valid mail-Id and without a passoword`, async () => {

      //verification of error message by proceeding with a valid Mail Id, without a password.
      const loginPage = new LoginPage(page,expect)
      await loginPage.ProceedWithUsername(data.Username)
      await expect(loginPage.MailIdDisplayed).toHaveText(data.Username)
      await loginPage.ProceedWithPassword("")
      await expect(loginPage.NoPassAlert).toHaveText("Enter your password")

    })

    test(`by proceeding with valid mail-Id and invalid passoword`, async () => {

      //verification of error message by proceeding with a valid Mail Id, with an invalid passoword.
      const loginPage = new LoginPage(page,expect)
      await loginPage.ProceedWithUsername(data.Username)
      await expect(loginPage.MailIdDisplayed).toHaveText(data.Username)
      await loginPage.ProceedWithPassword(data.InvalidPassword)
      await expect(loginPage.InvalidPassAlert).toHaveText("Your password is incorrect")

    })

    test(`Successful login by proceeding with valid mail-Id and passoword`, async () => {

      //verification of successful navigation to home page by proceeding with a valid Mail Id and passoword.
      const loginPage = new LoginPage(page,expect)
      const homePage = new HomePage(page,expect)
      await loginPage.ProceedWithUsername(data.Username)
      await expect(loginPage.MailIdDisplayed).toHaveText(data.Username)
      await loginPage.ProceedWithPassword(data.Password)
      await homePage.VerifyNavigaitonToHomepage(page)

    })

  })

})

