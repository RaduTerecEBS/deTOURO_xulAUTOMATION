var tabs = require("../../../firefoxLib/tabs");
var ktas = require("../../../deTouroLib/ktas");

const PAGE_SOURCE = "http://ebs.hmm.lan/";
const TEST_DATA = "oldenburg";

function setupModule() {
  controller = mozmill.getBrowserController();
  ktas = new ktas.Ktas(controller);
  
  tabs.closeAllTabs(controller);
}

function teardownModule() {
  //XXX: No test memory to cleanup right now
}

function testSearchByStartPlace() {
  var enter,
    startPlaceField,
    testResultAtLeastOne;

  enter = ktas.enter();
  controller.assert(function () {
    return enter;
  }, "Success in entering kt page");

  ktas.search("ctl00_MainContent_ASPxGridViewDrives_DXFREditorcol6_I", TEST_DATA);

  //XXX: if first row cell is present then we have at least one result for the given test data
  testResultAtLeastOne = new elementslib.ID(controller.window.document,
                                            "ctl00_MainContent_ASPxGridViewDrives_tccell0_6");
  // XXX: used containes until the spaces bug are eliminated
  controller.waitFor(function() {
    return testResultAtLeastOne.getNode().textContent.toLowerCase().contains(TEST_DATA);
  }, "At least one result is present");
}