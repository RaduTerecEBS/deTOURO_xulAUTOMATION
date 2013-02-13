// Welcome to the KT Demo test code
// This is using Mozmill XUL Runner automation tool
// Technologies: Javascript, Python

var tabs = require("../../../firefoxLib/tabs");
var domUtils = require("../../../firefoxLib/dom-utils");

const PAGE_SOURCE = "http://ebs.hmm.lan/";
const TYPE = "elke";

// This is the setup module
// This method's purpose is to establish test prerequisites
function setupModule() {
  controller = mozmill.getBrowserController();
  nodeCollector = new domUtils.nodeCollector(controller.window.document);
  
  tabs.closeAllTabs(controller);
}

// This is the teardown module method
// Its used to cleanup the test
function teardownModule() {
  //XXX: No test memory to cleanup right now
}

// Test method
// This is the actual test method
function testKT() {
  // open ebs.hmm.lan
  controller.open(PAGE_SOURCE);
  controller.waitForPageLoad();
  
  // get the list element to enter detouro app and check
  var kt =  new elementslib.XPath(controller.tabs.activeTab, "/html/body/div[@id='content-outer']/" +
                                                             "div[@id='content']/div/div[@id='banners']/" +
															 "table[2]/tbody/tr[1]/td[5]/a/b");
  controller.click(kt);
  controller.waitForPageLoad();
  
  // sleep is for demo purpuses, please do not use in production
  controller.sleep(5000);
  dump("\n\nI am in deTouro KT right now\n\n");
  
  // XXX: Bitte nicht XPATH verwenden, nur wenn gibt es nicht etwas anderes
  var ktas = new elementslib.XPath(controller.tabs.activeTab, "/html/body/form[@id='aspnetForm']/" +
                                                              "div[3]/div[2]/div[2]/div/div/div/" +
															  "div/span");
  
  controller.click(ktas);
  controller.waitForPageLoad();
  
  var versicherter = new elementslib.ID(controller.window.document,
                                        "ctl00_MainContent_ASPxGridViewDrives_DXFREditorcol7_I");
  controller.click(versicherter);
  controller.type(versicherter, TYPE);
  
  // check we have search results in the UI
  var tableElems = controller.window.document.getElementsByTagName("td");
  dump("\n\nType of tableElem variable = " + typeof tableElems + "\n\n");
  
  controller.assert(function () {
    return (typeof tableElems === "object");
  },"We have at least one search result");
  
  controller.sleep(3000);
 
  // click on the found entry "elke"
  var elke =   new elementslib.XPath(controller.tabs.activeTab, "/html/body/form[@id='aspnetForm']/div[3]/div[@id='main']/div[2]/table[@id='ctl00_MainContent_ASPxGridViewDrives']/tbody/tr[1]/td/table[@id='ctl00_MainContent_ASPxGridViewDrives_DXMainTable']/tbody/tr[@id='ctl00_MainContent_ASPxGridViewDrives_DXDataRow0']/td[@id='ctl00_MainContent_ASPxGridViewDrives_tccell0_7']/span");
  controller.click(elke);
  controller.waitForPageLoad();
  
  // sleep to see the page for the demo
  controller.sleep(3000);
}