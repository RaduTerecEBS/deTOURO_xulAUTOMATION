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
                                 "ctl00_MainContent_ASPxGridViewDrives_DXFREditorcol5_B-1Img");
  dateForm = new elementslib.ID(controller.tabs.activeTab,
                                "ctl00_MainContent_ASPxGridViewDrives_DXFREditorcol5_DDD_C");

  controller.click(dateInput);
  controller.waitFor(function() {
    return dateForm.getNode() !== null;
  }, "Date input form loaded successfully");

  selectedDay = new elementslib.XPath(controller.tabs.activeTab,
                                      ".//*[@id='ctl00_MainContent_ASPxGridViewDrives_DXFREditorcol5_DDD_C_mt']" +
                                      "/tbody/tr[4]/td[4]");
  controller.click(selectedDay);

  noData = new elementslib.Selector(controller.tabs.activeTab,
                                    "#ctl00_MainContent_ASPxGridViewDrives_tccell0_5");

  // XXX: No data to display on this test, this is the purpose of it
  controller.waitFor(function () {
    return noData.getNode().textContent.contains(".");
  }, "We have data to display");
}