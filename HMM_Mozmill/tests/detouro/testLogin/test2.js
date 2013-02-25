var ktas = require("../../../deTouroLib/ktas");
var tabs = require("../../../firefoxLib/tabs");
var domUtils = require("../../../firefoxLib/dom-utils");

// const TYPE = "elke";

function setupModule() {
  controller = mozmill.getBrowserController();
  nodeCollector = new domUtils.nodeCollector(controller.window.document);
  kt = new ktas.Ktas(controller);
  
  tabs.closeAllTabs(controller);
}

function teardownModule() {
  //XXX: No test memory to cleanup right now
}

// Verify login successful and user is seen in KT also
function testLoginKT() {
  var enter,
    laufende;

  enter = kt.enter();
  controller.assert(function () {
    return enter;
  }, "Success in entering kt page");

  // Click on "Laufende"
  laufende = new elementslib.ID(controller.tabs.activeTab, 
  	                            "ctl00_MainContent_ASPxMenuDisplayAuctions_DXI2_T");

  controller.click(laufende);
  controller.waitForPageLoad();
}