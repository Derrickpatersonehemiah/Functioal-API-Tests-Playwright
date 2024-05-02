const { test, expect } = require('@playwright/test')
const { LoginPage } = require('../PageObjects/AmazonLoginPage')
const { HomePage } = require('../PageObjects/AmazonHomePage')
var testdata = require('../test-data/AmazonProductCheckout-test-data.json')
const { WishListPage } = require('../PageObjects/AmazonWishListPage')


//to verify the Wishlist cycle functionality of Amazon.com
test.describe.configure({ mode: 'serial' })
testdata.forEach(data => {
  test.describe(`Verification of wishlist actions `, async () => {
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

    test(`Adding product to wishlist`, async () => {

      //verification of the process of adding a product to wishlist.
      const homePage = new HomePage(page,expect)
      await homePage.SearchForAProduct(data.SearchProduct)
      const ResultNo = await homePage.VerifySearchResults(page,data.ProductName,data.Detail1,data.Detail2)
      await homePage.SelectProduct(ResultNo)
      Price = await homePage.AddToWishList(page,data.Quantity)
    })

    test(`Verification of product in wishlist`, async () => {

      //verification of details of product in wishlist.
      const homePage = new HomePage(page,expect)
      const wishlistPage = new WishListPage(page,expect)
      await homePage.ViewList.click()
      await wishlistPage.VerifyItemInWishList(page,data.ProductName,data.Detail1,data.Detail2,Price,data.Quantity)
    })

  })

})

