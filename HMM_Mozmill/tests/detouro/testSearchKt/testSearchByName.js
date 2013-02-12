var tabs = require("../../../firefoxLib/tabs");

const PAGE_SOURCE = "http://ebs.hmm.lan/";
const TEST_DATA_NAME = "Daag";
const TEST_DATA_FIRSTNAME = "Elke";

function setupModule() {
  controller = mozmill.getBrowserController();
  
  tabs.closeAllTabs(controller);
}

function teardownModule() {
  //XXX: No test memory to cleanup right now
}

function testSearchByName() {
  var kt,
    ktas,
    name,
    firstname,
    grid;

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

  name = new elementslib.ID(controller.tabs.activeTab,
                            "ctl00_MainContent_ASPxGridViewDrives_DXFREditorcol6_I");

  
  controller.type(name, TEST_DATA_NAME);

  controller.waitFor(function () {
    return name.getNode().value === TEST_DATA_NAME;
  }, "Name is correctly written");

  grid = new elementslib.Selector(controller.tabs.activeTab, ".main");

  // Set the firstname
  firstname = new elementslib.ID(controller.tabs.activeTab,
                                 "ctl00_MainContent_ASPxGridViewDrives_DXFREditorcol7_I");

  //XXX: Find the proper event to listen for
  //     Workaround: input event on the other text field
  firstname.getNode().addEventListener("input", function () {
    // Reset the value from the name field
    name.getNode().value = "";
    dump("\n-- INPUT EVENT FIRED --\n");
  }, false);

  controller.type(firstname, TEST_DATA_FIRSTNAME);

  controller.waitFor(function () {
    return name.getNode().value === "";
  }, "Name is correctly erased");

  controller.waitFor(function () {
    return firstname.getNode().value === TEST_DATA_FIRSTNAME;
  }, "First Name is correctly written");
}