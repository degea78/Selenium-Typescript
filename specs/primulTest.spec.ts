import { waitService } from '../helpers/wait-service';
import { browser, element, $$ } from 'protractor';

describe('Testing YourLogo site', function () {

    beforeEach(function () {
        browser.get('http://automationpractice.com/index.php');
    });

    it('Login/Sign in. Invalid email adress', async function () {
        expect(browser.getTitle()).toEqual('My Store');
        $$('.login').click();
        $$('.icon-user left').click();
      });
    it('Sing in', async function () {
        $$('.is_required validate account_input form-control').sendKeys("degea@mail.com");
        $$('.icon-user left').click();
        element(by.id("id_gender1")).click;
        
        $$("input[name=customer_firstname]").sendKeys('Degea');
        $$("input[name=customer_lastname]").sendKeys('Eugen');
        $$("input[name=passwd]").sendKeys('12345678');
        await browser.get('http://google.com');
    });
});