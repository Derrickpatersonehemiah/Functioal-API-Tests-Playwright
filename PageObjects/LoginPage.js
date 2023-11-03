class LoginPage{

constructor(page)
{
    this.page = page;
    this.Username = page.locator("[name='username']")
    this.Password = page.locator("[name='password']")
    this.SubmitBtn = page.locator("[type='submit']")
    this.LoginRequest = 'https://parabank.parasoft.com/parabank/login.htm'
}

async Login(data)
{
    await this.page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login")
    await this.Username.fill(data.Username)
    await this.Password.fill(data.Password)
    await this.SubmitBtn.click()
}

async ParaBankLogin(request,data)
{
    const Login = await request.post(this.LoginRequest,
            {
                form: {
                    username: "realuser@2345A",
                    password: "realuser@2345A"
                }
            })
        expect(Login.status()).toBe(200)
}



}
module.exports = {LoginPage}