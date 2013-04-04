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
  controller.waitForPageLoad(VNR_TIMEOUT);

  // XXX: Need the sleep here until we find the proper value to listen for
  controller.sleep(2000);

  runningAuction = new elementslib.ID(controller.tabs.activeTab,
  	                                  "ctl00_ASPxMenu1_DXI2_T");

  controller.waitFor(function () {
    return runningAuction.getNode().hidden === false;
  }, "Gebotsverlauf button is loaded and can be accessed");

  controller.click(runningAuction);
  controller.waitForPageLoad(VNR_TIMEOUT);

  bidValueCheck = controller.tabs.activeTab.querySelectorAll(".noStyle");
  dump("\n bid value check number of elements = " + bidValueCheck.length + "\n");

  bidElement = new elementslib.Elem(bidValueCheck[0]);

  dump("\n typeof bid element = " + typeof bidElement + "\n");

  controller.waitFor(function () {
  	return bidElement.getNode().textContent.contains(persisted.amount);
  }, "Bid value is registered properly in KT");
}