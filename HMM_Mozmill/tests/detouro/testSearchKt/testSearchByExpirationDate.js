var tabs = require("../../../firefoxLib/tabs");

const PAGE_SOURCE = "http://ebs.hmm.lan/";

function setupModule() {
  controller = mozmill.getBrowserController();
  
  tabs.closeAllTabs(controller);
}

function teardownModule() {
  //XXX: No test memory to cleanup right now
}

function testSearchByExpirationDate() {
  var kt,
    ktas,
    dateInput,
    dateForm,
    selectedDay,
    noData;

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