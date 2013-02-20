// This is the LE Demo for deTouro
var tabs = require("../../../firefoxLib/tabs");
var domUtils = require("../../../firefoxLib/dom-utils");
var les = require("../../../deTouroLib/les");

const PAGE_SOURCE = "http://ebs.hmm.lan/";

const BENUTZERNAME = "Mihai";
const PASSWORT = "ch@ng3m42";

function setupModule() {
  controller = mozmill.getBrowserController();
  nodeCollector = new domUtils.nodeCollector(controller.window.document);
  les = new les.Les(controller);
  
  tabs.closeAllTabs(controller);
}

function teardownModule() {
  //XXX: No test memory to cleanup right now
}

// Test method
function testLE() {
  // open ebs.hmm.lan
  controller.open(PAGE_SOURCE);
  controller.waitForPageLoad();
  
  // open de touro LE
  var lePage =  new elementslib.XPath(controller.tabs.activeTab, "/html/body/div[@id='content-outer']/" +
                                                                 "div[@id='content']/div/div[@id='banners']/" +
																                                 "table[2]/tbody/tr[1]/td[2]/a/b");
  controller.click(lePage);
  controller.waitForPageLoad();
  
  // XXX: Demo purpose sleep
  controller.sleep(2000);
  
  les.loginHelper(BENUTZERNAME, PASSWORT);
  
  // XXX: Demo purpose sleep
  controller.sleep(2000);
  
  // Maximize Firefox Window now
  controller.window.STATE_MAXIMIZED = 1;
}
