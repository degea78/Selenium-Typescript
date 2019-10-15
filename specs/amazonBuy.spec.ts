import amazonPO from "../po/amazonPo";
import { browser, element, by, ExpectedConditions as EC } from "protractor";


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
                //await browser.wait(EC.visibilityOf(amaPO.amazonBasicsHeader), 6000);
            })
            it("Amazon Basics tab is correct", async () => {
                expect(await amaPO.amazonBasicsHeader.getText()).toContain('AmazonBasics');                 
            })
        })



        it("All Tab's are correct", async () => {              
            browser.sleep(4000);
        })
    })

    it('Amazon site is work correctly', async () => {

    })
})