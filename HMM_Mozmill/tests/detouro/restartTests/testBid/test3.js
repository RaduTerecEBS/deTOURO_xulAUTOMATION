var ktas = require("../../../../deTouroLib/ktas");
var tabs = require("../../../../firefoxLib/tabs");
var testData = require("../../../../deTouroLib/test-data");
var valid = require("../../../../deTouroLib/validations");

const VNR_TIMEOUT = 30000;

function setupModule() {
  controller = mozmill.getBrowserController();
  validation = new valid.Validation(controller);
  kt = new ktas.Ktas(controller);

  controller.window.maximize();

  tabs.closeAllTabs(controller);
}

function teardownModule() {
  // Cleanup memory for saved KTA number in the persisted object
  delete persisted.ktaNumber;
  delete persisted.amount;
}

function testBidInKT() {
	var enter,
	  laufende,
	  kta,
	  runningAuction,
	  bidValueCheck,
	  bidElement;

  enter = kt.enter();
  controller.assert(function () {
    return enter;
  }, "Success in entering kt page");

  laufende = new elementslib.ID(controller.tabs.activeTab,
  	                            "ctl00_MainContent_ASPxMenuDisplayAuctions_DXI2_T");

  controller.click(laufende);
  controller.waitForPageLoad();

  kta = new elementslib.ID(controller.tabs.activeTab,
  	                       "ctl00_MainContent_ASPxGridViewDrives_cell0_1_labelNumber");
  
  // XXX: No need for type check here
  controller.waitFor(function () {
    return kta.getNode().textContent == persisted.ktaNumber;
  }, "Kta number matches from LE data");

  controller.click(kta);
  controller.waitForPageLoad();

  runningAuction = new elementslib.ID(controller.window.document,
  	                                  "ctl00_ASPxMenu1_DXI2_T");

  controller.click(runningAuction);
  controller.waitForPageLoad();

  bidValueCheck = controller.tabs.activeTab.querySelectorAll(".noStyle");
  bidElement = new elementslib.Elem(bidValueCheck[0]);

  controller.waitFor(function () {
  	return bidElement.getNode().textContent.contains(persisted.amount);
  }, "Bid value is registered properly in KT");
}