const {expect} = require('@playwright/test')

class WishListPage{

    constructor(page)
    {
        this.ItemsInList = page.locator("//h2[@class='a-size-base']")
        this.SubTotal = page.locator("(//*[@class='a-price']/span)[1]")
        this.ProceedToCheckoutBtn = page.locator("//*[@id='sc-buy-box-ptc-button']/span/input")
    }

async VerifyItemInWishList(page,ProductName,Detail1,Detail2,Price)
{
    //to verify the details of the product in wishlist matches the one added.
    await this.ItemsInList.nth(0).waitFor()
    const ItemsCount = await this.ItemsInList.count()
    const value = await this.SubTotal.textContent()
    console.log(value)
    const SubTotalPrice = value.replace(/[$,]/g, "")
    console.log(SubTotalPrice)
    Price = Price.trim() 
    await expect(Price).toEqual(SubTotalPrice)
    for(let i=1; i<ItemsCount; i++)
    {
        const ItemInfo = await page.locator(`(//*[@class='a-row a-size-small']//a)[${i}]`).textContent()
        expect(await ItemInfo).toContain(ProductName)
        expect(await ItemInfo).toContain(Detail1)
        expect(await ItemInfo).toContain(Detail2)
        break
    }
    
}



}
module.exports = {WishListPage}