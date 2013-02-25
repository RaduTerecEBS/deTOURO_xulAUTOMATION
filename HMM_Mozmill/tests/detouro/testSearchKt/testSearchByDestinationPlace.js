var ktas = require("../../../deTouroLib/ktas");
var tabs = require("../../../firefoxLib/tabs");

const TEST_DATA = "bremen";

function setupModule() {
  controller = mozmill.getBrowserController();
  kt = new ktas.Ktas(controller);

  tabs.closeAllTabs(controller);
}

function teardownModule() {
  //XXX: No test memory to cleanup right now
}

function testSearchByDestinationPlace() {
  var enter,
    destinationPlaceField,
    testResultAtLeastOne;

  enter = kt.enter();
  controller.assert(function () {
    return enter;
  }, "Success in entering deTouro KT");

  kt.search("ctl00_MainContent_ASPxGridViewDrives_DXFREditorcol28_I", TEST_DATA);

  //XXX: if first row cell is present then we have at least one result for the given test data
  testResultAtLeastOne = new elementslib.ID(controller.window.document,
                                            "ctl00_MainContent_ASPxGridViewDrives_tccell0_28");
  // XXX: used containes until the spaces bug are eliminated
  controller.waitFor(function() {
    return testResultAtLeastOne.getNode().textContent.toLowerCase().contains(TEST_DATA);
  }, "At least one result is present");
}