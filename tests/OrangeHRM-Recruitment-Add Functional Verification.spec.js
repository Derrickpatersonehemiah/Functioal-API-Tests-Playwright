const { test,expect } = require('@playwright/test');
const { LoginPage } = require('../PageObjects/LoginPage');
const { RecruitmentPage } = require('../PageObjects/RecruitmentPage');
var testdata = require('../test-data/test-data.json')

testdata.forEach(data => {

  test(`Adding Candidate ${data.FirstName} in Recruitment page`, async ({ page }) => {

    const loginPage =  new LoginPage(page,expect)
    const recruitmentPage = new RecruitmentPage(page)
    await loginPage.Login(data)
    //await page.pause(1000)
    await recruitmentPage.AccessRecuitmentPage()
    await recruitmentPage.AccessAddCandidate()
    await recruitmentPage.FillCandidateDetails(data)
    await recruitmentPage.VerificationOfFilledValues(data)
    await recruitmentPage.SubmissionVerification()
  })

});  


