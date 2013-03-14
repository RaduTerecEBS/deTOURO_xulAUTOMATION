var tabs = require("../../../../firefoxLib/tabs");
var domUtils = require("../../../../firefoxLib/dom-utils");
var les = require("../../../../deTouroLib/les");

const PAGE_SOURCE = "http://ebs.hmm.lan/";

const BENUTZERNAME = "vladtest";
const PASSWORT = "Vlad123";

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
  // Cleanup
  delete persisted.ktaNumber;
}

function testEnterAnOffer() {
  var lePage,
    user,
    detailsImageAuction,
    elemDetailsImgAuction;

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
  controller.sleep(TIMEOUT);
}