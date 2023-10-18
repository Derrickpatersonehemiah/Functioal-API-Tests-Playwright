class LoginPage{

constructor(page)
{
    this.page = page;
    this.Username = page.locator("[name='username']")
    this.Password = page.locator("[name='password']")
    this.SubmitBtn = page.locator("[type='submit']")
}

async Login(data)
{
    await this.page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login")
    await this.Username.fill(data.Username)
    await this.Password.fill(data.Password)
    await this.SubmitBtn.click()
}



}
module.exports = {LoginPage}