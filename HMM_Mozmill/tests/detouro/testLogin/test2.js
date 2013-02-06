var tabs = require("../../../firefoxLib/tabs");
var domUtils = require("../../../firefoxLib/dom-utils");

const PAGE_SOURCE = "http://ebs.hmm.lan/";
// const TYPE = "elke";

function setupModule() {
  controller = mozmill.getBrowserController();
  nodeCollector = new domUtils.nodeCollector(controller.window.document);
  
  tabs.closeAllTabs(controller);
}

function teardownModule() {
  //XXX: No test memory to cleanup right now
}

// Verify login successful and user is seen in KT also
function testLoginKT() {
  var kt,
    laufende;

  // open ebs.hmm.lan
  controller.open(PAGE_SOURCE);
  controller.waitForPageLoad();

  // get the list element to enter detouro app and check
  kt =  new elementslib.XPath(controller.tabs.activeTab, "/html/body/div[@id='content-outer']/" +
                                                         "div[@id='content']/div/div[@id='banners']/" +
													     "table[2]/tbody/tr[1]/td[5]/a/b");
  controller.click(kt);
  controller.waitForPageLoad();

  //XXX: sleep for testing purposes
  controller.sleep(2000);

  // Click on "Laufende"
  laufende = new elementslib.ID(controller.window.document, 
  	                            "ctl00_MainContent_ASPxMenuDisplayAuctions_DXI2_T");

  controller.waitForPageLoad();

  //XXX: sleep for testing purposes
  controller.sleep(2000);

  
}