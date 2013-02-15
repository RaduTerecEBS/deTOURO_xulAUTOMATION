var tabs = require("../../../firefoxLib/tabs");
var valid = require("../../../deTouroLib/validations");

const PAGE_SOURCE = "http://ebs.hmm.lan/";
const TEST_VNR_DATA = "22875360200";
const TEST_ANR_DATA = "999919102";
const VNR_TIMEOUT = 30000;

function setupModule() {
  controller = mozmill.getBrowserController();
  validation = new valid.Validation(controller);

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
    nextButton,
    ktaFormElements,
    anrButton,
    nextButtonViewDoctor;

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

  controller.click(vnrAutocomplete);
  controller.waitForPageLoad();
  // XXX: Sleep for 3 seconds to wait for the form to complete additions
  //      This should be changed with an API method to wait for the proper events
  controller.sleep(10000);
  // Check that required info are retrieved in the form
  nextButton = new elementslib.ID(controller.tabs.activeTab,
                                  "ctl00_MainContent_formViewInsured_ASPxButtonNext_B");

  // XXX: debugging kta fields object in validations API
  dump("\n Debugging start ... \n\n");
  dump("\n valid length IDS: " + valid.IDS.length + "\n");
  dump("\n valid IDS: " + valid.IDS + "\n");
  dump("\n valid IDS[0]: " + valid.IDS[0] + "\n");
  dump("\n valid IDS[1].id: " + valid.IDS[1].id + "\n");
  dump("\n valid IDS[1].id: " + valid.IDS[3].type + "\n");
  dump("\n valid IDS[1].id: " + valid.IDS[4].name + "\n");
  dump("\n Debugging end ... \n\n");

  ktaFormElements = validation.getKtaFormElementList();

  //XXX: To be moved in API for deTouro KT later
  //     Achtung: in the near future milestone please
  validation.checkEmptyKTAFields();
  controller.sleep(2000);

  controller.click(nextButton);
  controller.waitForPageLoad();

  // XXX: Are datas of doctors completed entirely by the wbservice?
  anrButton = new elementslib.ID(controller.tabs.activeTab,
                                 "ctl00_MainContent_formViewDoctor_textBoxANR");
  controller.type(anrButton, TEST_ANR_DATA);
  controller.waitFor(function () {
    return anrButton.getNode().value === TEST_ANR_DATA;
  }, "Anr data successfully typed in the proper field");

  controller.click(vnrAutocomplete);
  controller.waitForPageLoad();

  controller.sleep(10000);

  nextButtonViewDoctor = new elementslib.ID(controller.tabs.activeTab,
                                            "ctl00_MainContent_formViewDoctor_ASPxButtonNext_B");
  controller.click(nextButtonViewDoctor);
  controller.waitForPageLoad();
}