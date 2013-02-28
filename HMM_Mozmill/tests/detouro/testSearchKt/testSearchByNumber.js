var ktas = require("../../../deTouroLib/ktas");
var tabs = require("../../../firefoxLib/tabs");

const TEST_DATA = "75";

function setupModule() {
  controller = mozmill.getBrowserController();
  kt = new ktas.Ktas(controller);

  tabs.closeAllTabs(controller);
}

function teardownModule() {
  //XXX: No test memory to cleanup right now
}

function testSearchByNumber() {
  var enter,
    noField,
    noResultField;

  enter = kt.enter();
  controller.assert(function () {
    return enter;
  }, "Success in entering kt page");

  // Number field
  noField = new elementslib.ID(controller.window.document,
  	                           "ctl00_MainContent_ASPxGridViewDrives_DXFREditorcol1_I");

  controller.type(noField, TEST_DATA);
  controller.waitFor(function () {
    return noField.getNode().value === TEST_DATA;
  }, "Test data typed correctly");

  controller.waitForPageLoad();
  controller.sleep(7000);
  
  var table = controller.tabs.activeTab.querySelectorAll(".dxgvDataRow_deTouroKT");

  for (var i = 0, l = table.length; i < l - 20; i++) {
    controller.assert(function () {
      return table[i].textContent.contains(TEST_DATA);
    },"Suggestion contains the search term");
  }
}

