var tabs = require("../../../../firefoxLib/tabs");
var domUtils = require("../../../../firefoxLib/dom-utils");
var les = require("../../../../deTouroLib/les");

const PAGE_SOURCE = "http://ebs.hmm.lan/";

const BENUTZERNAME = "vladebs";
const PASSWORT = "ungam+20";

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

function testVerifyAuction() {
  var lePage,
    user,
    ktaNumbers,
    number;

  // open ebs.hmm.lan
  controller.open(PAGE_SOURCE);
  controller.waitForPageLoad();
  
  // open de touro LE
  lePage =  new elementslib.XPath(controller.tabs.activeTab, "/html/body/div[@id='content-outer']/" +
                                                             "div[@id='content']/div/div[@id='banners']/" +
																                             "table[2]/tbody/tr[1]/td[2]/a/b");
  controller.click(lePage);
  controller.waitForPageLoad();

  les.loginHelper(BENUTZERNAME, PASSWORT);
  controller.waitForPageLoad();

  // Check we receive the correct login state of UI
  user = new elementslib.ID(controller.tabs.activeTab, "label-1323");

  controller.waitThenClick(user);
  
  controller.waitFor(function () {
    return (user.getNode().textContent.contains(BENUTZERNAME) === true);
  }, "Login was correct");

  ktaNumbers = controller.tabs.activeTab.querySelectorAll(".x-grid-cell-inner");
  number = new elementslib.Elem(ktaNumbers[1]);

  controller.waitFor(function () {
    return parseInt(number.getNode().textContent) === persisted.ktaNumber;
  }, "The newly added auction is present in LE");
}