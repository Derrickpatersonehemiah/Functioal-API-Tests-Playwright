const { expect } = require("@playwright/test");

class HomePage{

    constructor(page)
    {
        this.Logo = page.locator("//*[@id='nav-logo-sprites']")
        this.SearchBar = page.locator("//*[@id='twotabsearchtextbox']")
        this.SearchResultsBox = page.locator("//*[@id='nav-flyout-searchAjax'][contains(@style,'display: block;')]")
        this.SearchButton = page.locator("//*[@id='nav-search-submit-button']")
        this.ResultsHeader = page.locator("//*[@id='search']//span[contains(text(),'Results')]")
        this.Results = page.locator("//*[@data-component-type='s-search-result']")
        this.ResultsLink = page.locator("//*[@data-component-type='s-search-result']//a[@class='a-link-normal s-underline-text s-underline-link-text s-link-style a-text-normal']")
        this.Availability = page.locator("//*[@id='availability']/span")
        this.QuantityBtn = page.locator("//*[@id='a-autoid-0-announce']")
        this.AddToCartBtn = page.locator("//*[@id='add-to-cart-button']")
        this.AddToOrder = page.locator("//*[text()='Add to your order']")
        this.NoThanksBtn = page.locator("//*[@id='attachSiNoCoverage']/span/input")
        this.GoToCart = page.locator("//*[@id='sw-gtc']")
        this.Price = page.locator("(//*[@id='corePriceDisplay_desktop_feature_div']/div/span[1])[1]")
        this.AddToList = page.locator("//*[@id='add-to-wishlist-button-submit']")
        this.ViewList = page.locator("//*[@id='huc-view-your-list-button']/span/a")
        this.HomePageURL = "https://www.amazon.com/gp/homepage"
    }

async VerifyNavigaitonToHomepage(page)
{
    //to verify the successful navigation to Homepage.
    await page.waitForTimeout(5000)
    await expect(this.Logo).toBeAttached()
    const Url = await page.url()
    await page.waitForTimeout(5000)
    await expect(Url).toContain(this.HomePageURL)
    
}

async SearchForAProduct(SearchProduct)
{
    //to enter a product detail and search for its result.
    await this.SearchBar.fill(SearchProduct)
    await expect(this.SearchResultsBox).toBeVisible()
    await this.SearchButton.click()    
}

async VerifySearchResults(page,ProductName,Detail1,Detail2)
{
    // to verify the search results and return the absolute result.
   await expect(this.ResultsHeader).toBeVisible()
   await this.Results.nth(0).waitFor()
   const ResultsCount = await this.Results.count()
   for (var i=1; i<ResultsCount; i++)
   {
    const ProductInfo = await page.locator(`(//*[@class='a-size-medium a-color-base a-text-normal'])[${i}]`).textContent()
    expect(await ProductInfo).toContain(ProductName)
    expect(await ProductInfo).toContain(Detail1)
    expect(await ProductInfo).toContain(Detail2)
    break
   }
   return i
}

async SelectProduct(ResultNo)
{
    // to select a product based on the no of the result matching.
   await this.ResultsLink.nth(ResultNo-1).click()
}

async AddToCart(page,qty)
{
    //to add product to cart and get return price of it.
    const value = await this.Price.textContent()
    const Price = value.replace(/[,$]/g , "")
    await this.QuantityBtn.click()
    await page.locator(`//*[@id="quantity_${qty-1}"]`)
    await this.AddToCartBtn.click()
    if(this.AddToOrder.isVisible())
    {
        await this.NoThanksBtn.click()
    }
    return Price
}

async AddToWishList(page,qty)
{
    //to add a product to wishlist and return the price.
    const value = await this.Price.textContent()
    const Price = value.replace(/[,$]/g , "")
    await this.QuantityBtn.click()
    await page.locator(`//*[@id="quantity_${qty-1}"]`)
    await this.AddToList.click()
    return Price
}




}
module.exports = {HomePage}