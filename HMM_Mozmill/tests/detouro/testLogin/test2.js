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
    ktas,
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

  // XXX: Bitte nicht XPATH verwenden, nur wenn gibt es nicht etwas anderes
  ktas = new elementslib.XPath(controller.tabs.activeTab, "/html/body/form[@id='aspnetForm']/" +
                                                          "div[3]/div[2]/div[2]/div/div/div/" +
															                            "div/span");
  
  controller.click(ktas);
  controller.waitForPageLoad();

  // Click on "Laufende"
  laufende = new elementslib.ID(controller.tabs.activeTab, 
  	                            "ctl00_MainContent_ASPxMenuDisplayAuctions_DXI2_T");

  controller.click(laufende);
  controller.waitForPageLoad();

  //XXX: sleep for testing purposes
  controller.sleep(2000);
}