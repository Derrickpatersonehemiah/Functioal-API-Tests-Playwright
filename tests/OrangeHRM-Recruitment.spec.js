const { test,expect } = require('@playwright/test');
const { LoginPage } = require('../PageObjects/LoginPage');
const { RecruitmentPage } = require('../PageObjects/RecruitmentPage');



test('Adding a Candidate in Recruitment', async ({ page }) => {

  const loginPage =  new LoginPage(page,expect);
  const recruitmentPage = new RecruitmentPage(page);
  const Naming = Date();
  const FirstName = Naming.slice(0,15);
  const LastName = Naming.slice(16,30);
  await loginPage.Login("Admin","admin123");
  await recruitmentPage.AccessRecuitmentPage();
  await recruitmentPage.AccessAddCandidate();
  await recruitmentPage.FillCandidateDetails(FirstName,LastName);
  await recruitmentPage.VerificationOfFilledValues(FirstName,LastName);
  await recruitmentPage.SubmissionVerification();
  



});


