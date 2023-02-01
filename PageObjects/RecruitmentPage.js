const {test,expect} = require('@playwright/test')
class RecruitmentPage
{

constructor(page)
{   
    this.page = page;
    this.PgHeader = page.locator(".oxd-topbar-header-title");
    this.AddButton = page.locator("button[class='oxd-button oxd-button--medium oxd-button--secondary']");
    this.RecruitmtentOption = page.locator("[href='/web/index.php/recruitment/viewRecruitmentModule']");
    this.FName = page.locator("[name='firstName']");
    this.LName = page.locator("[name='lastName']");
    this.MName = page.locator("[name='middleName']");
    this.Email = page.locator("[placeholder='Type here']").first();
    this.PhNum = page.locator("[placeholder='Type here']").nth(1);
    this.UploadFile = page.locator("[class='oxd-file-input-div']");
    this.Note =  page.locator("[class='oxd-textarea oxd-textarea--active oxd-textarea--resize-vertical']");
    this.Keywords = page.locator("[placeholder='Enter comma seperated words...']");
    this.AppDate =  page.locator("[placeholder='yyyy-mm-dd']");
    this.ConsentChkbox = page.locator("[class='oxd-icon bi-check oxd-checkbox-input-icon']");
    this.DrpDown = page.locator("[class='oxd-select-text oxd-select-text--active']");
    this.ListBox = page.locator("div [role='listbox']");
    this.OptSeniorQA = page.locator("text= Senior QA Lead");
    this.SubmitBtn = page.locator("[Type='Submit']");
    this.Alert = page.locator("[class='oxd-text oxd-text--p oxd-text--toast-message oxd-toast-content-text']");
    this.RecruitmentPageURL = "https://opensource-demo.orangehrmlive.com/web/index.php/recruitment/viewCandidates";
    this.AddCandidateURL = "https://opensource-demo.orangehrmlive.com/web/index.php/recruitment/addCandidate";


}

async AccessRecuitmentPage()
{
    await this.RecruitmtentOption.click();
    await expect(this.page).toHaveURL(this.RecruitmentPageURL);
    await expect(this.PgHeader).toHaveText("Recruitment");
}

async AccessAddCandidate()
{
    await this.AddButton.click();
    await expect(this.page).toHaveURL(this.AddCandidateURL);
}

async FillCandidateDetails(Fname,Lname)
{
  await this.FName.fill(Fname);
  await this.LName.fill(Lname);
  await this.MName.fill("Test");
  await this.DrpDown.click();
  await this.ListBox.waitFor();
  await this.OptSeniorQA.click();
  await this.Email.fill("Test@test.com");
  await this.PhNum.fill("9876543210");
  await this.page.setInputFiles("div [type='file']", 'Test-Data/Document.docx');
  await this.Keywords.fill("Test,Testrun,Testdata,Example,verification");
  await this.AppDate.fill("2023-01-10");
  await this.Note.fill("Candidate Addition submission verification, Test Run with all fields");
  await this.ConsentChkbox.check();

}

async VerificationOfFilledValues(Fname,Lname)
{
    await expect(this.FName).toHaveValue(Fname);
    await expect(this.LName).toHaveValue(Lname);
    await expect(this.MName).toHaveValue("Test");
    await expect(this.DrpDown).toHaveText("Senior QA Lead");
    await expect(this.Email).toHaveValue("Test@test.com");
    await expect(this.PhNum).toHaveValue("9876543210");
    await expect(this.UploadFile).toHaveText("Document.docx");
    await expect(this.Keywords).toHaveValue("Test,Testrun,Testdata,Example,verification");
    await expect(this.AppDate).toHaveValue("2023-01-10");
    await expect(this.Note).toHaveValue("Candidate Addition submission verification, Test Run with all fields");
    await expect(this.ConsentChkbox).toBeChecked();
    
}

async SubmissionVerification()
{
    await this.SubmitBtn.click();
    await this.Alert.waitFor();
    await expect(this.Alert).toHaveText("Successfully Saved");
}


}
module.exports ={RecruitmentPage}