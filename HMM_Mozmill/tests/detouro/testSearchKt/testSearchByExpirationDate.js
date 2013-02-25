var ktas = require("../../../deTouroLib/ktas");
var tabs = require("../../../firefoxLib/tabs");

function setupModule() {
  controller = mozmill.getBrowserController();
  kt = new ktas.Ktas(controller);
  
  tabs.closeAllTabs(controller);
}

function teardownModule() {
  //XXX: No test memory to cleanup right now
}

function testSearchByExpirationDate() {
  var enter,
    dateInput,
    dateForm,
    selectedDay,
    noData;

  enter = kt.enter();
  controller.assert(function () {
    return enter;
  }, "Success in entering kt page");

  // Select a date via the date selection dropdown
  dateInput = new elementslib.ID(controller.tabs.activeTab,
                                 "ctl00_MainContent_ASPxGridViewDrives_DXFREditorcol21_B-1Img");
  dateForm = new elementslib.ID(controller.tabs.activeTab,
                                "ctl00_MainContent_ASPxGridViewDrives_DXFREditorcol21_DDD_C");

  controller.click(dateInput);
  controller.waitFor(function() {
    return dateForm.getNode() !== null;
  }, "Date input form loaded successfully");

  selectedDay = new elementslib.XPath(controller.tabs.activeTab,
                                      ".//*[@id='ctl00_MainContent_ASPxGridViewDrives_DXFREditorcol21_DDD_C_mt']" +
                                      "/tbody/tr[5]/td[5]");
  controller.click(selectedDay);

  noData = new elementslib.Selector(controller.tabs.activeTab, ".dxgv>div");

  // XXX: No data to display on this test, this is the purpose of it
  controller.waitFor(function () {
    return noData.getNode() !== null;
  }, "We have no data to display");
}