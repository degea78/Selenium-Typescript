import { element, by } from "protractor";

export default class amazonPO{

    fatherTab = element(by.id('nav-xshop-container'));
    todayDealTab = this.fatherTab.element(by.cssContainingText('.nav-a  ', "Today's Deals"));
    todayDealHeader = element(by.cssContainingText('.gbh1-bold', "Today's Deals"));

    voucherTab = this.fatherTab.element(by.cssContainingText('.nav-a  ', "Vouchers"));
    voucherHeader = element(by.cssContainingText('.bxw-pageheader__title__text', "Amazon Vouchers"));

    amazonBasicsTab = this.fatherTab.element(by.cssContainingText('.nav-a  ', "AmazonBasics"));
    amazonBasicsHeader = element(by.cssContainingText('.style__breadcrumb__3KWWY', "AmazonBasics"));

    freeDelivery = this.fatherTab.element(by.cssContainingText('.nav-a  ', "Free Delivery"));
    freeHeader = element(by.cssContainingText('.bxc-grid__text.a-text-center.bxc-grid__text--light', "Available to all customers on qualifying orders over £20"));

    giftIdeas = this.fatherTab.element(by.cssContainingText('.nav-a  ', "Gift Ideas	"));
    giftIdeasHeader = element(by.id('zg_banner_text_wrapper'));

    newReleases = this.fatherTab.element(by.cssContainingText('.nav-a  ', "New Releases"));
    newReleasesHeader = element(by.id("zg_banner_text_wrapper"));

    giftCards = this.fatherTab.element(by.cssContainingText('.nav-a  ', 'Gift Cards'));
    giftCardsHeader = element(by.css('.bxw-pageheader__title__text'));
}