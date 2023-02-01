const {test,expect} = require('@playwright/test')
class LoginPage
{

constructor(page)
{
    this.page = page;
    this.Username = page.locator("[name='username']")
    this.Password = page.locator("[name='password']")
    this.SubmitBtn = page.locator("[type='submit']")
}

async Login(username,password)
{
    await this.page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
    await this.Username.fill(username);
    await this.Password.fill(password);
    await this.SubmitBtn.click()
}



}
module.exports ={LoginPage}