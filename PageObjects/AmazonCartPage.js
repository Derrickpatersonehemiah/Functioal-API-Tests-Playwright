const {expect} = require('@playwright/test')

class CartPage{

    constructor(page)
    {
        this.ItemsInCart = page.locator("//*[@class='sc-list-item-content']")
        this.SubTotal = page.locator("//*[@id='sc-subtotal-amount-activecart']/span")
        this.ProceedToCheckoutBtn = page.locator("//*[@id='sc-buy-box-ptc-button']/span/input")
    }

async VerifyItemInCart(page,ProductName,Detail1,Detail2,Price,Quantity)
{
    //to verify the details of the product in cart matches the one added.
    await this.ItemsInCart.nth(0).waitFor()
    const ItemsCount = await this.ItemsInCart.count()
    const value = await this.SubTotal.textContent()
    console.log(value)
    const SubTotalPrice = value.replace(/[$,]/g, "")
    console.log(SubTotalPrice)
    const total = (SubTotalPrice * Quantity)
    Price = Number(Price)
    await expect(Price).toEqual(total)
    for(let i=1; i<ItemsCount; i++)
    {
        const ItemInfo = await page.locator(`(//*[@class='sc-list-item-content']//span[@class="a-truncate-full a-offscreen"])[${i}]`).textContent()
        expect(await ItemInfo).toContain(ProductName)
        expect(await ItemInfo).toContain(Detail1)
        expect(await ItemInfo).toContain(Detail2)
        break
    }
    
}



}
module.exports = {CartPage}