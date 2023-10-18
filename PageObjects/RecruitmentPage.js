const {test,expect} = require('@playwright/test')
const date = require('date-and-time')
class RecruitmentPage
{

constructor(page)
{   
    this.page = page;
    this.PgHeader = page.locator(".oxd-topbar-header-title")
    this.AddButton = page.locator("button[class='oxd-button oxd-button--medium oxd-button--secondary']")
    this.RecruitmtentOption = page.locator("[href='/web/index.php/recruitment/viewRecruitmentModule']")
    this.FName = page.locator("[name='firstName']")
    this.LName = page.locator("[name='lastName']")
    this.MName = page.locator("[name='middleName']");
    this.Email = page.locator("[placeholder='Type here']").first()
    this.PhNum = page.locator("[placeholder='Type here']").nth(1)
    this.UploadFile = page.locator("[class='oxd-file-input-div']")
    this.Note =  page.locator("[class='oxd-textarea oxd-textarea--active oxd-textarea--resize-vertical']")
    this.Keywords = page.locator("[placeholder='Enter comma seperated words...']")
    this.AppDate =  page.locator("[placeholder='yyyy-mm-dd']")
    this.ConsentChkbox = page.locator("[class='oxd-icon bi-check oxd-checkbox-input-icon']")
    this.DrpDown = page.locator("[class='oxd-select-text oxd-select-text--active']")
    this.ListBox = page.locator("div [role='listbox']")
    //this.OptSeniorQA = page.locator("text= Senior QA Lead");
    //this.SoftEng = page.locator("text= Software Engineer");
    //this.SaleRep = page.locator("text= Sales Representative");
    this.SubmitBtn = page.locator("[Type='Submit']")
    this.Alert = page.locator("[class='oxd-text oxd-text--p oxd-text--toast-message oxd-toast-content-text']")
    this.RecruitmentPageURL = "https://opensource-demo.orangehrmlive.com/web/index.php/recruitment/viewCandidates"
    this.AddCandidateURL = "https://opensource-demo.orangehrmlive.com/web/index.php/recruitment/addCandidate"


}

async AccessRecuitmentPage()
{
    await this.RecruitmtentOption.click()
    await expect(this.page).toHaveURL(this.RecruitmentPageURL)
    await expect(this.PgHeader).toHaveText("Recruitment")
}

async AccessAddCandidate()
{
    await this.AddButton.click()
    await expect(this.page).toHaveURL(this.AddCandidateURL)
}

async FillCandidateDetails(data)
{
  const Getdate = new Date()  
  const Enterdate = date.format(Getdate, 'YYYY-MM-DD')
  await this.FName.fill(data.FirstName)
  await this.LName.fill(data.LastName)
  await this.MName.fill(`Test${data.no}`)
  await this.DrpDown.click()
  await this.ListBox.waitFor()
  await this.page.locator(`text= ${data.Job}`).click()
  await this.Email.fill(data.Email)
  await this.PhNum.fill(data.PhoneNo)
  await this.page.setInputFiles("div [type='file']", 'Test-Artifacts/Document.docx')
  await this.Keywords.fill(`Test${data.no},Testrun${data.no},Testdata${data.no},Example${data.no},verification${data.no}`)
  await this.AppDate.fill(Enterdate)
  await this.Note.fill(`Candidate Addition submission verification, Test Run ${data.no} with all fields`)
  await this.ConsentChkbox.check()

}

async VerificationOfFilledValues(data)
{
    const Getdate = new Date()  
    const Enterdate = date.format(Getdate, 'YYYY-MM-DD')
    await expect(this.FName).toHaveValue(data.FirstName)
    await expect(this.LName).toHaveValue(data.LastName)
    await expect(this.MName).toHaveValue(`Test${data.no}`)
    await expect(this.DrpDown).toHaveText(`${data.Job}`)
    await expect(this.Email).toHaveValue(data.Email)
    await expect(this.PhNum).toHaveValue(data.PhoneNo)
    await expect(this.UploadFile).toHaveText("Document.docx")
    await expect(this.Keywords).toHaveValue(`Test${data.no},Testrun${data.no},Testdata${data.no},Example${data.no},verification${data.no}`)
    await expect(this.AppDate).toHaveValue(Enterdate)
    await expect(this.Note).toHaveValue(`Candidate Addition submission verification, Test Run ${data.no} with all fields`)
    await expect(this.ConsentChkbox).toBeChecked()
    
}

async SubmissionVerification()
{
    await this.SubmitBtn.click()
    await this.Alert.waitFor()
    await expect(this.Alert).toHaveText("Successfully Saved")
}


}
module.exports = {RecruitmentPage}