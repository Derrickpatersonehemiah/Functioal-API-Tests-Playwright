const {expect} = require('@playwright/test')
class LoginPage{

    constructor()
    {
        this.LoginRequest = 'https://parabank.parasoft.com/parabank/login.htm'
    }    

async ParaBankLogin(request,data)
{
    //to send API request for logging in and verifying login response
    const Login = await request.post(this.LoginRequest,
            {
                form: {
                    username: data.Username,
                    password: data.Password
                }
            })
        expect(Login.status()).toBe(200)
}



}
module.exports = {LoginPage}