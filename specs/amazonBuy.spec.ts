import amazonPO from "../po/amazonPo";
import { browser, element, by, ExpectedConditions as EC, protractor } from "protractor";
import { waitService } from "../helpers/wait-service";
import { async } from "q";


let amaPO = new amazonPO();

describe('Amazon Buy Test', async () => {
    beforeAll(async () => {
        browser.get('https://www.amazon.co.uk/');        
    })
    describe('Amazon Test All tabs', async () => {
        describe("Today's deal tab", async () => {
            beforeAll(async () => {
                await amaPO.todayDealTab.click()
            })
            it("Today's deal tab is correct", async () => {
                expect(await amaPO.todayDealHeader.getText()).toContain("Today's Deals");                 
            })
        })
        describe("Vouchers tab", async () => {
            beforeAll(async () => {
                await amaPO.voucherTab.click()
            })
            it("Vouchers tab is correct", async () => {
                expect(await amaPO.voucherHeader.getText()).toContain("Amazon Vouchers");                 
            })
        })
        describe("Amazon Basics tab", async () => {
            beforeAll(async () => {
                await amaPO.amazonBasicsTab.click();
                await waitService.waitForElementToBePresentVisibleClickable_Promise(amaPO.amazonBasicsHeader); 
            })
            it("Amazon Basics tab is correct", async () => {
                expect(await amaPO.amazonBasicsHeader.getText()).toContain('AmazonBasics');                 
            })
        })
        describe("Gift Ideas tab", async () => {
            beforeAll(async () => {
                await amaPO.giftIdeas.click();
                await waitService.waitForElementToBePresentVisibleClickable(amaPO.giftIdeasHeader); 
            })
            it("Gift Ideas tab is correct", async () => {
                expect(await amaPO.giftIdeasHeader.getText()).toContain('Amazon Gift Ideas');                 
            })
        })
        describe("New Releases tab", async () => {
            beforeAll(async () => {
                await amaPO.newReleases.click();
                await waitService.waitForElementToBePresentVisibleClickable(amaPO.newReleasesHeader); 
            })
            it("New Releases tab is correct", async () => {
                expect(await amaPO.newReleasesHeader.getText()).toContain('Amazon Hot New Releases');                 
            })
        })
        describe("Gift Cards tab", async () => {
            beforeAll(async () => {
                await amaPO.giftCards.click();
                await waitService.waitForElementToBePresentVisibleClickable(amaPO.giftCardsHeader); 
            })
            it("Gift Cards tab is correct", async () => {
                expect(await amaPO.giftCardsHeader.getText()).toContain('Gift Cards & Top Up');                 
            })
        })
        it("All Tab's are correct", async () => {              
            
        })
    })
    describe("Buy a laptop", async() => {
        beforeAll(async () => {
            amaPO.findTextBox.sendKeys("lenovo carbon x1 laptop");
            amaPO.findTextBox.sendKeys(protractor.Key.ENTER);
        })
        it("Laptop was buy successfuly", async() =>{
            browser.sleep(4000);
        })
    })


    it('Amazon site is work correctly', async () => {

    })
})