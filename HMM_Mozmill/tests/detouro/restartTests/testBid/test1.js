var tabs = require("../../../../firefoxLib/tabs");
var domUtils = require("../../../../firefoxLib/dom-utils");
var les = require("../../../../deTouroLib/les");
var testData = require("../../../../deTouroLib/test-data");

const PAGE_SOURCE = "http://ebs.hmm.lan/";

const BENUTZERNAME = "vladebs";
const PASSWORT = "ungam+20";

const TIMEOUT = 10000;
const TIMEOUT_PAGE = 30000;

function setupModule() {
  controller = mozmill.getBrowserController();
  nodeCollector = new domUtils.nodeCollector(controller.window.document);
  les = new les.Les(controller);
  
  controller.window.maximize();

  tabs.closeAllTabs(controller);
}

function teardownModule() {
}

function testEnterAnOffer() {
  var lePage,
    user,
    detailsImageAuction,
    elemDetailsImgAuction,
    pageButtons,
    submitBidButton,
    bidField,
    bidFieldId,
    actualBidFieldElem,
    confirmBidButton,
    yesBidButton,
    bidValue;

  // open ebs.hmm.lan
  controller.open(PAGE_SOURCE);
  controller.waitForPageLoad(TIMEOUT_PAGE);
  
  // open de touro LE
  lePage =  new elementslib.XPath(controller.tabs.activeTab, "/html/body/div[@id='content-outer']/" +
                                                             "div[@id='content']/div/div[@id='banners']/" +
																                             "table[2]/tbody/tr[1]/td[2]/a/b");
  controller.click(lePage);
  controller.waitForPageLoad(TIMEOUT_PAGE);

  les.loginHelper(BENUTZERNAME, PASSWORT);
  controller.waitForPageLoad(TIMEOUT_PAGE);

  // Check we receive the correct login state of UI
  user = new elementslib.ID(controller.tabs.activeTab, "label-1323");

  controller.waitThenClick(user);
  
  controller.waitFor(function () {
    return (user.getNode().textContent.contains(BENUTZERNAME) === true);
  }, "Login was correct", TIMEOUT);

  detailsImageAuction = controller.tabs.activeTab.querySelectorAll(".x-action-col-icon.x-action-col-0.icon16-details");
  elemDetailsImgAuction = new elementslib.Elem(detailsImageAuction[0]);

  controller.click(elemDetailsImgAuction);
  // XXX: Debugging purposes
  //controller.sleep(TIMEOUT);

  pageButtons = controller.tabs.activeTab.querySelectorAll(".x-btn-center");
  submitBidButton = new elementslib.Elem(pageButtons[16]);

  controller.click(submitBidButton);

  // XXX: Debugging purposes
  //controller.sleep(TIMEOUT);

  // Id is changind at every session so we need to get the proper id every time we test this
  bidField = controller.tabs.activeTab.querySelectorAll(".x-form-trigger-input-cell");
  bidFieldId = bidField[1].firstChild.id;

  actualBidFieldElem = new elementslib.ID(controller.window.document, bidFieldId);

  controller.type(actualBidFieldElem, "35");
  controller.waitFor(function () {
    return actualBidFieldElem.getNode().value === "35";
  }, "Bid typed correctly in the bid field");

  // Now click to add the bid
  // XXX: Debugging purposes
  //controller.sleep(TIMEOUT);

  pageButtons = controller.tabs.activeTab.querySelectorAll(".x-btn-center");
  confirmBidButton = new elementslib.Elem(pageButtons[18]);

  controller.click(confirmBidButton);

  pageButtons = controller.tabs.activeTab.querySelectorAll(".x-btn-center");
  yesBidButton = new elementslib.Elem(pageButtons[20]);

  controller.click(yesBidButton);

  bidValue = new elementslib.Elem(controller.tabs.activeTab.querySelectorAll(".x-form-display-field")[24]);

  controller.waitFor(function () {
    return bidValue.getNode().textContent.contains("35");
  }, "Bid value is displayed in the proper window");
}