const {expect} = require('@playwright/test')
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
    this.AppDate =  page.locator("[class='oxd-date-input'] input")
    this.ConsentChkbox = page.locator("[class='oxd-icon bi-check oxd-checkbox-input-icon']")
    this.DrpDown = page.locator("[class='oxd-select-text oxd-select-text--active']")
    this.ListBox = page.locator("div [role='listbox']")
    this.NameListBox = page.locator("div [role='option'] span")
    this.JobTitleDrpDown = page.locator("[class='oxd-select-text oxd-select-text--active']").first()
    this.AppStatusDrpDown = page.locator("[class='oxd-select-text oxd-select-text--active']").nth(3)
    this.SearchName = page.locator("[placeholder='Type for hints...']")
    this.FrmDate = page.locator("[placeholder='From']")
    this.ToDate = page.locator("[placeholder='To']")
    this.AppInitiatedStatus = page.locator("//div/span[contains(text(),'Application Initiated')]")
    this.SubmitBtn = page.locator("[Type='Submit']")
    this.ResetBtn = page.locator("[Type='Reset']")
    this.DeleteSelectedBtn = page.locator("//*[text()=' Delete Selected ']")
    this.DeleteDialogBox = page.locator("[role='document']")
    this.DeleteconfBtn = page.locator("//*[text()=' Yes, Delete ']")
    this.RowLocator = page.locator("//*[@class='oxd-table-card']//span/i")
    this.RowNotext = page.locator("//*[@class='orangehrm-paper-container']/div/div/span")
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

async SearchCandidateBasedOnJobTitle(data)
{
    console.log("Search by Job title")
    await this.JobTitleDrpDown.click()
    await this.ListBox.waitFor()
    await this.page.locator(`//div/span[contains(text(),"${data.Job}")]`).click()
    await this.SubmitBtn.click()
}

async SearchCandidateBasedOnName(data)
{
    console.log("Search by Candidate Name")
    await this.SearchName.fill(data.FirstName)
    await this.NameListBox.first().waitFor()
    await this.page.locator(`//div/span[contains(text(),"${data.FirstName} Test${data.no} ${data.LastName}")]`).first().click()
    await this.SubmitBtn.click()
}

async SearchCandidateBasedOnStatus()
{
    console.log("Search by Status of application")
    await this.AppStatusDrpDown.click()
    await this.ListBox.waitFor()
    await this.AppInitiatedStatus.click()
    await this.SubmitBtn.click()
}

async SearchCandidateBasedOnAppDate()
{
    console.log("Search by Application date")
    const Tdydate = new Date()
    const Tdate = date.format(Tdydate, 'YYYY-MM-DD')  
    const Yesdate = date.addDays(Tdydate,-1)
    const Fmdate = date.format(Yesdate, 'YYYY-MM-DD')
    await this.FrmDate.fill(Fmdate)
    await this.ToDate.fill(Tdate)
    await this.SubmitBtn.click()
}

async VerifySearchResult(data)
{
    const Getdate = new Date()  
    const Enterdate = date.format(Getdate, 'YYYY-MM-DD')
    await this.page.getByRole('row').first().waitFor()
    const text = await this.RowNotext.textContent()
    const text1 = (text).replace(') Records Found','')
    const text2 = (text1).replace(') Record Found','')
    const text3 = (text2).replace('(','')
    const Rows = text3.trim()
    console.log(Rows, "row resulted")
    for(var i=1; i<=Rows; i++)
    {
      const GetName = await this.page.locator(`//*[@class='oxd-table-card'][${i}]/div/div[3]`).textContent() 
      if(GetName == `${data.FirstName} Test${data.no} ${data.LastName}`)
      {
        expect(this.page.locator(`//*[@class='oxd-table-card'][${i}]/div/div[2]`)).toHaveText(data.Job)
        expect(this.page.locator(`//*[@class='oxd-table-card'][${i}]/div/div[5]`)).toHaveText(Enterdate)
        expect(this.page.locator(`//*[@class='oxd-table-card'][${i}]/div/div[3]`)).toHaveText(`${data.FirstName} Test${data.no} ${data.LastName}`)
        expect(this.page.locator(`//*[@class='oxd-table-card'][${i}]/div/div[6]`)).toHaveText("Application Initiated")
        break
      }
    }
    await this.ResetBtn.click()
}

async SelectRowsBasedOnName(data)
{
    console.log("Selecting rows based on name")
    await this.page.getByRole('row').first().waitFor()
    const text = await this.RowNotext.textContent()
    const text1 = (text).replace(') Records Found','')
    const text2 = (text1).replace(') Record Found','')
    const text3 = (text2).replace('(','')
    const Rows = text3.trim()
    console.log(Rows-10, "row resulted")
    for(var i=1; i<=Rows-10; i++)
    {
      const GetName = await this.page.locator(`//*[@class='oxd-table-card'][${i}]/div/div[3]/div`).textContent() 
      if(GetName == `${data.FirstName} Test${data.no} ${data.LastName}`)
      {
        await this.page.locator(`(//*[@class="oxd-table-card"]//span/i)[${i}]`).check()
      }
    }
}

async DeleteSelectedRows()
{
    await this.DeleteSelectedBtn.click()
    await this.DeleteconfBtn.click()
    await this.Alert.waitFor()
    await expect(this.Alert).toHaveText("Successfully Deleted")
}

async VerifyDeletionOfCandidate(data)
{
    await this.SearchName.fill(data.FirstName)
    await expect(this.SearchName).toHaveValue(data.FirstName)
    await expect(this.page.locator(`//div/span[contains(text(),"${data.FirstName} Test${data.no} ${data.LastName}")]`)).toBeHidden()
}

}
module.exports = {RecruitmentPage}