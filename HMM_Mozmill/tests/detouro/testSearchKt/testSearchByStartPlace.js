var tabs = require("../../../firefoxLib/tabs");

const PAGE_SOURCE = "http://ebs.hmm.lan/";
const TEST_DATA = "oldenburg";

function setupModule() {
  controller = mozmill.getBrowserController();
  
  tabs.closeAllTabs(controller);
}

function teardownModule() {
  //XXX: No test memory to cleanup right now
}

function testSearchByStartPlace() {
  var kt,
    ktas,
    startPlaceField,
    testResultAtLeastOne;

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

  startPlaceField = new elementslib.ID(controller.window.document,
                                       "ctl00_MainContent_ASPxGridViewDrives_DXFREditorcol25_I");
  controller.type(startPlaceField, TEST_DATA);

  controller.waitFor(function () {
    return startPlaceField.getNode().value === TEST_DATA;
  }, "Start place typed correctly");

  //XXX: if first row cell is present then we have at least one result for the given test data
  testResultAtLeastOne = new elementslib.ID(controller.window.document,
                                            "ctl00_MainContent_ASPxGridViewDrives_tccell0_25");
  // XXX: used containes until the spaces bug are eliminated
  controller.waitFor(function() {
    return testResultAtLeastOne.getNode().textContent.toLowerCase().contains(TEST_DATA);
  }, "At least one result is present");
}