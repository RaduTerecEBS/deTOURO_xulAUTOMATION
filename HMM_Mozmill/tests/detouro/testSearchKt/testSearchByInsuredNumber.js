var tabs = require("../../../firefoxLib/tabs");
var domUtils = require("../../../firefoxLib/dom-utils");

const PAGE_SOURCE = "http://ebs.hmm.lan/";
const TEST_DATA = "22875360200";

function setupModule() {
  controller = mozmill.getBrowserController();
  
  tabs.closeAllTabs(controller);
}

function teardownModule() {
  //XXX: No test memory to cleanup right now
}

function testSearchByNumber () {
  var kt,
    ktas,
    insField,
    insResultField;

  // open ebs.hmm.lan
  controller.open(PAGE_SOURCE);
  controller.waitForPageLoad();

  // get the list element to enter detouro app and check
  kt =  new elementslib.XPath(controller.tabs.activeTab, "/html/body/div[@id='content-outer']/" +
                                                         "div[@id='content']/div/div[@id='banners']/" +
													                               "table[2]/tbody/tr[1]/td[5]/a/b");
  controller.click(kt);
  controller.waitForPageLoad();

  // XXX: Bitte nicht XPATH verwenden, nur wenn gibt es nicht etwas anderes
  ktas = new elementslib.XPath(controller.tabs.activeTab, "/html/body/form[@id='aspnetForm']/" +
                                                          "div[3]/div[2]/div[2]/div/div/div/" +
													                                "div/span");
  
  controller.click(ktas);
  controller.waitForPageLoad();

  // Number field
  insField = new elementslib.ID(controller.window.document,
  	                            "ctl00_MainContent_ASPxGridViewDrives_DXFREditorcol4_I");

  controller.type(insField, TEST_DATA);
  controller.waitForPageLoad();

  // Test we have proper search results
  insResultField = new elementslib.ID(controller.window.document,
  	                                  "#ctl00_MainContent_ASPxGridViewDrives_tccell0_4");

  controller.waitFor(function () {
  	return parseInt(insResultField.getNode().textContent) === parseInt(TEST_DATA);
  }, "Search term has appropriate results --> " + "got: " +
     insResultField.getNode().textContent);
}