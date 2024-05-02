const { test, expect } = require('@playwright/test')
const { LoginPage } = require('../PageObjects/AmazonLoginPage')
const { HomePage } = require('../PageObjects/AmazonHomePage')
const { CartPage } = require('../PageObjects/AmazonCartPage')
var testdata = require('../test-data/AmazonProductCheckout-test-data.json')
const { CheckoutPage } = require('../PageObjects/AmazonCheckoutPage')


//to verify the checkout functionality of Amazon.com
test.describe.configure({ mode: 'serial' })
testdata.forEach(data => {
  test.describe(`Verification of checkout action `, async () => {
    let page
    let Price
    test.beforeAll(async ({ browser }) => {
      page = await browser.newPage()
      const loginPage = new LoginPage(page,expect)
      const homePage = new HomePage(page,expect)
      await page.goto(loginPage.LoginPageURL)
      await loginPage.ProceedWithUsername(data.Username)
      await loginPage.ProceedWithPassword(data.Password)
      await homePage.VerifyNavigaitonToHomepage(page)
    })

    test(`Adding product and proceeding to cart`, async () => {

      //verification of the process of adding a product to cart.
      const homePage = new HomePage(page,expect)
      await homePage.SearchForAProduct(data.SearchProduct)
      const ResultNo = await homePage.VerifySearchResults(page,data.ProductName,data.Detail1,data.Detail2)
      await homePage.SelectProduct(ResultNo)
      Price = await homePage.AddToCart(page,data.Quantity)
    })

    test(`Verification of product in cart`, async () => {

      //verification of details of product in cart.
      const homePage = new HomePage(page,expect)
      const cartPage = new CartPage(page,expect)
      await homePage.GoToCart.click()
      await cartPage.VerifyItemInCart(page,data.ProductName,data.Detail1,data.Detail2,Price,data.Quantity)
    })

    test(`Checkout action`, async () => {

      //verification of Checkout actions.
      const cartPage = new CartPage(page,expect)
      const checkoutPage = new CheckoutPage(page,expect)
      await cartPage.ProceedToCheckoutBtn.click()
      await checkoutPage.ShippingAddressVerification(data.Address,data.City,data.ZipCode)
      await checkoutPage.PaymentMethodVerification()
      await checkoutPage.ContinueToApplicationBtn.click()



    })

  })

})

