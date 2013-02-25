var ktas = require("../../../deTouroLib/ktas");
var tabs = require("../../../firefoxLib/tabs");

const TEST_DATA = "22875360200";

function setupModule() {
  controller = mozmill.getBrowserController();
  kt = new ktas.Ktas(controller);
  
  tabs.closeAllTabs(controller);
}

function teardownModule() {
  //XXX: No test memory to cleanup right now
}

function testSearchByInsNumber() {
  var enter,
    insField,
    insResultField;

  enter = kt.enter();
  controller.assert(function () {
    return enter;
  }, "Success in entering kt page");

  // Insurance Number field
  insField = new elementslib.ID(controller.window.document,
  	                            "ctl00_MainContent_ASPxGridViewDrives_DXFREditorcol4_I");

  controller.type(insField, TEST_DATA);
  controller.waitForPageLoad();

  // Test we have proper search results
  insResultField = new elementslib.ID(controller.tabs.activeTab,
  	                                  "ctl00_MainContent_ASPxGridViewDrives_tccell0_4");

  controller.waitFor(function () {
  	return parseInt(insResultField.getNode().textContent) === parseInt(TEST_DATA);
  }, "Search term has appropriate results --> " + "got: " +
     insResultField.getNode().textContent);
}