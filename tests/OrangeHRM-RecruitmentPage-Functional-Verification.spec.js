const { test, expect } = require('@playwright/test')
const { LoginPage } = require('../PageObjects/LoginPage')
const { RecruitmentPage } = require('../PageObjects/RecruitmentPage')
var testdata = require('../test-data/recruitment-test-data.json')


//to verify the Addition/Searching/Deletion functionalities of recruitment through data driven method
test.describe.configure({ mode: 'serial' })
testdata.forEach(data => {
  test.describe(`Functioality verification of the cycle of candidate ${data.FirstName} in Recruitment page`, async () => {
    let page
    test.beforeAll(async ({ browser }) => {
      page = await browser.newPage()
    })


    test(`Verifying Adding a Candidate ${data.FirstName}`, async () => {

      //verification of creation by Adding candidate/details via recruitment form and verifying the addition
      const loginPage = new LoginPage(page,expect)
      const recruitmentPage = new RecruitmentPage(page)
      await loginPage.Login(data)
      await recruitmentPage.AccessRecuitmentPage()
      await recruitmentPage.AccessAddCandidate()
      await recruitmentPage.FillCandidateDetails(data)
      await recruitmentPage.VerificationOfFilledValues(data)
      await recruitmentPage.SubmissionVerification()
    })

    test(`Verifying search and the results of Candidate ${data.FirstName} based on different details `, async () => {

      //verifying search functionality by different sorting methods based on the added candidate details
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

      //verifying deletion functionality by searching and deleting rows of added candidate
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