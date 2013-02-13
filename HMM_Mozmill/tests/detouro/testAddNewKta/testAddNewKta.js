var tabs = require("../../../firefoxLib/tabs");

const PAGE_SOURCE = "http://ebs.hmm.lan/";
const TEST_VNR_DATA = "2287";
const VNR_TIMEOUT = 30000;

function setupModule() {
  controller = mozmill.getBrowserController();
  
  tabs.closeAllTabs(controller);
}

function teardownModule() {
  //XXX: No test memory to cleanup right now
}

function testAddNewKta() {
  var kt,
    ktas,
    newKtaButton,
    vnrField,
    vnrAutocomplete,
    vnrResult;

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

  // Click Neues KTA
  newKtaButton = new elementslib.ID(controller.tabs.activeTab,
                                    "ctl00_MainContent_ASPxButtonNew_B");
  controller.click(newKtaButton);
  controller.waitForPageLoad();

  vnrField = new elementslib.ID(controller.tabs.activeTab,
                                "ctl00_MainContent_formViewInsured_textBoxVNR");
  controller.type(vnrField, TEST_VNR_DATA);
  controller.waitFor(function () {
    return vnrField.getNode().value === TEST_VNR_DATA;
  }, "VNR Data correctly typed");

  vnrAutocomplete = new elementslib.ID(controller.tabs.activeTab,
                                       "ui-id-1");

  controller.waitFor(function () {
    return vnrAutocomplete.getNode() !== null;
  }, "Autocomplete loaded successfully", VNR_TIMEOUT);

  /*vnrResult = new elementslib.ID(controller.tabs.activeTab,
                                 "ui-id-96");*/
  vnrResult = new elementslib.Selector(controller.tabs.activeTab, ".ui-corner-all");
  dump("\n asda" + vnrResult.length + "\n");
  controller.click(vnrResult);
  controller.waitForPageLoad();


}