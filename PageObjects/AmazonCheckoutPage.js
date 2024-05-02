const {expect} = require('@playwright/test')
class CheckoutPage{

    constructor(page)
    {
        this.FullNameField = page.locator("//*[@id='address-ui-widgets-enterAddressFullName']")
        this.NumberField = page.locator("//*[@id='address-ui-widgets-enterAddressPhoneNumber']")
        this.AdddressField = page.locator("//*[@id='address-ui-widgets-enterAddressLine1']")
        this.CityField = page.locator("//*[@id='address-ui-widgets-enterAddressCity']")
        this.ZipcodeField = page.locator("//*[@id='address-ui-widgets-enterAddressPostalCode']")
        this.StateDrpdwn = page.locator("//*[@id='address-ui-widgets-enterAddressStateOrRegion']/span/span")
        this.UseThisAdd = page.locator("//*[@id='address-ui-widgets-form-submit-button']/span/input")
        this.Fnamedisplayed = page.locator("//*[@class='displayAddressLI displayAddressAddressLine1']/li")
        this.AddDisplayed = page.locator("//*[@id='shipaddress']/div[3]/div/div[1]/div[2]/div[1]/ul/li[2]")
        this.CityDisplayed = page.locator("//*[@id='shipaddress']/div[3]/div/div[1]/div[2]/div[1]/ul/li[3]")
        this.RegPostalDisplayed = page.locator("//*[@class='displayAddressLI displayAddressCityStateOrRegionPostalCode']")
        this.UseAddressChkbox = page.locator("//*[@name='submissionURL']")
        this.UseThisAdddressBtn = page.locator("//*[@id='shipToThisAddressButton']/span/input")
        this.UseThisPaymentBtn = page.locator("(//*[@class='a-button-input a-button-text'])[2]")
        this.PaymentMethod = page.locator("//*[@name='ppw-instrumentRowSelection']")
        this.ContinueToApplicationBtn = page.locator("//*[@id='bottomSubmitOrderButtonId']/span/input")
    }    

async ShippingAddressVerification(address,city,zipcode)
{
    //Verification of Checkout Address details.
    //--await expect(this.UseAddressChkbox).toBeChecked()
    await expect(this.AddDisplayed).toContainText(address.toUpperCase())
    await expect(this.CityDisplayed).toContainText(city.toUpperCase())
    await expect(this.CityDisplayed).toContainText(zipcode.toUpperCase())
    //--await this.UseThisAdddressBtn.click()
}

async PaymentMethodVerification()
{
    //Verification of Checkout form payment details.
    await this.PaymentMethod.click()
    await expect(this.PaymentMethod).toBeChecked()
    await this.UseThisPaymentBtn.click()
    await expect(this.ContinueToApplicationBtn).toBeVisible()      
}





}
module.exports = {CheckoutPage}