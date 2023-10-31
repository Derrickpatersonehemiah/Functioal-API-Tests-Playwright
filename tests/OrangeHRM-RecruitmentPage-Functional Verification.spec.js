const { test,expect } = require('@playwright/test');
const { LoginPage } = require('../PageObjects/LoginPage');
const { RecruitmentPage } = require('../PageObjects/RecruitmentPage');
var testdata = require('../test-data/test-data.json')



test.describe.configure({mode:'serial'})
testdata.forEach(data => {
  test.describe(`Verification of Add, Search and Deletion functionality of candidate ${data.FirstName} in Recruitment page`, async ()=>{ 
   let page
   test.beforeAll(async ({ browser }) => {
   page = await browser.newPage() })
   
   
    test(`Verifying Adding a Candidate ${data.FirstName}`, async () => {

     const loginPage =  new LoginPage(page,expect)
     const recruitmentPage = new RecruitmentPage(page)
     await loginPage.Login(data)
     await recruitmentPage.AccessRecuitmentPage()
     await recruitmentPage.AccessAddCandidate()
     await recruitmentPage.FillCandidateDetails(data)
     await recruitmentPage.VerificationOfFilledValues(data)
     await recruitmentPage.SubmissionVerification()
   })

    test(`Verifying search and the results of Candidate ${data.FirstName} based on different details `, async () => {
    
     const recruitmentPage = new RecruitmentPage(page)
     await recruitmentPage.AccessRecuitmentPage()
     await recruitmentPage.SearchCandidateBasedOnJobTitle(data)
     await recruitmentPage.VerifySearchResult(data)
     await recruitmentPage.SearchCandidateBasedOnName(data)
     await recruitmentPage.VerifySearchResult(data)
     await recruitmentPage.SearchCandidateBasedOnStatus()
     await recruitmentPage.VerifySearchResult(data)
     await recruitmentPage.SearchCandidateBasedOnAppDate()
     await recruitmentPage.VerifySearchResult(data)
   })

    test(`Verifying Deletion of added Candidate ${data.FirstName}`, async () => {
    
     const recruitmentPage = new RecruitmentPage(page)
     await recruitmentPage.AccessRecuitmentPage()
     await recruitmentPage.SearchCandidateBasedOnAppDate()
     await recruitmentPage.SelectRowsBasedOnName(data)
     await recruitmentPage.DeleteSelectedRows()
     await recruitmentPage.VerifyDeletionOfCandidate(data)
     await page.close()
   })

  }) 

}) 
