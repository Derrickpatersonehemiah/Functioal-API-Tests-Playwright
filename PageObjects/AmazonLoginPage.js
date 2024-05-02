const { expect } = require("@playwright/test");

class LoginPage{

constructor(page)
{
    this.page = page;
    this.Username = page.locator("//*[@id='ap_email']")
    this.Password = page.locator("//*[@id='ap_password']")
    this.ContinueBtn = page.locator("//*[@id='continue'][@type='submit']")
    this.SignInBtn = page.locator("//*[@id='signInSubmit']")
    this.NoEmailAlert = page.locator("//*[@id='auth-email-missing-alert']/div/div")
    this.NoAccountAlert = page.locator("//*[@id='auth-error-message-box']//span")
    this.MailIdDisplayed = page.locator("//*[@class='a-row a-spacing-base']/span")
    this.NoPassAlert = page.locator("//*[@id='auth-password-missing-alert']/div/div")
    this.InvalidPassAlert = page.locator("//*[@id='auth-error-message-box']//span")
    this.LoginPageURL = 'https://www.amazon.com/ap/signin?openid.pape.max_auth_age=900&openid.return_to=https%3A%2F%2Fwww.amazon.com%2Fgp%2Fhomepage.html%3F_encoding%3DUTF8%26ref_%3Dnavm_em_signin%26action%3Dsign-out%26path%3D%252Fgp%252Fhomepage.html%253F_encoding%253DUTF8%2526ref_%253Dnavm_em_signin%26signIn%3D1%26useRedirectOnSuccess%3D1%26ref_%3Dnav_em_signout_0_1_1_39&openid.assoc_handle=usflex&openid.mode=checkid_setup&openid.ns=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0'
}

async ProceedWithUsername(user)
{
    //to login
    await this.Username.fill(user)
    await expect(this.Username).toHaveValue(user)
    await this.ContinueBtn.click()
}
async ProceedWithPassword(pass)
{
    //to login
    await this.Password.fill(pass)
    await expect(this.Password).toHaveValue(pass)
    await this.SignInBtn.click()
}



}
module.exports = {LoginPage}