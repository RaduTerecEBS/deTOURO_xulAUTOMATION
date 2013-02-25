var ktas = require("../../../deTouroLib/ktas");
var tabs = require("../../../firefoxLib/tabs");

const TEST_DATA_NAME = "Daag";
const TEST_DATA_FIRSTNAME = "Elke";

function setupModule() {
  controller = mozmill.getBrowserController();
  kt = new ktas.Ktas(controller);

  tabs.closeAllTabs(controller);
}

function teardownModule() {
  //XXX: No test memory to cleanup right now
}

function testSearchByName() {
  var enter,
    name,
    firstname,
    grid;

  enter = kt.enter();
  controller.assert(function () {
    return enter;
  }, "Success in entering kt page");

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