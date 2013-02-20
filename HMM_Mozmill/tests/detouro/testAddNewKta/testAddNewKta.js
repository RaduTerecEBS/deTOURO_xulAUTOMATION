var modalDialog = require("../../../firefoxLib/modal-dialog");
var tabs = require("../../../firefoxLib/tabs");
var valid = require("../../../deTouroLib/validations");

const PAGE_SOURCE = "http://ebs.hmm.lan/";
const TEST_VNR_DATA = "22875360200";
const TEST_ANR_DATA = "999919102";
const TEST_HOSPITAL_DATA = "International Neuroscience";

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
    nextButtonViewDoctor,
    hospitalField,
    nextButtonHospital,
    numberDrives,
    saveButton,
    assignedKtaNumber,
    zoneContainer,
    publishAuctionButton,
    cancelButton,
    cancelOKButton,
    backButton,
    canceledAuctionsButton;

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
  // XXX: Sleep for 10 seconds to wait for the form to complete additions
  //      This should be changed with an API method to wait for the proper events
  controller.sleep(10000);
  // Check that required info are retrieved in the form
  nextButton = new elementslib.ID(controller.tabs.activeTab,
                                  "ctl00_MainContent_formViewInsured_ASPxButtonNext_B");

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

  hospitalField = new elementslib.ID(controller.tabs.activeTab,
                                     "ctl00_MainContent_formViewDetails_textBoxInstitutionName");
  controller.type(hospitalField, TEST_HOSPITAL_DATA);
  controller.waitFor(function () {
    return hospitalField.getNode().value === TEST_HOSPITAL_DATA;
  },"Hospital data typed correctly");

  controller.sleep(5000);
  controller.click(vnrAutocomplete);
  controller.waitForPageLoad();
  controller.sleep(5000);

  numberDrives = new elementslib.ID(controller.tabs.activeTab,
                                    "ctl00_MainContent_formViewDetails_textBoxNoDrives");
  numberDrives.getNode().value = "2";
  
  controller.waitFor(function() {
    return numberDrives.getNode().value === "2";
  }, "Number of rides typed correctly");

  nextButtonHospital = new elementslib.ID(controller.tabs.activeTab,
                                          "ctl00_MainContent_formViewDetails_ASPxButtonNext_B");

  controller.click(nextButtonHospital);
  controller.waitForPageLoad();

  saveButton = new elementslib.ID(controller.tabs.activeTab,
                                  "ctl00_MainContent_formViewTransport_ASPxButtonNext_B");
  controller.click(saveButton);
  controller.waitForPageLoad();

  // Check we have a KTA number on the UI (page left side)
  assignedKtaNumber = new elementslib.ID(controller.tabs.activeTab, "ctl00_labelNumber");
  controller.assert(function () {
    return assignedKtaNumber.getNode().textContent !== undefined;
  },"We have a KTA number!");

  zoneContainer = new elementslib.ID(controller.tabs.activeTab,
                                     "zoneContainer");

  // A dock panel page should appear containing data
  controller.assert(function () {
    return zoneContainer.getNode() !== null;
  }, "Proper page loaded after saved new KTA");

  publishAuctionButton = new elementslib.ID(controller.tabs.activeTab,
                                            "ctl00_MainContent_footerFormView_ASPxButtonAuctionPublish_B");
  controller.click(publishAuctionButton);
  controller.waitForPageLoad();

  // Cancel auction
  cancelButton = new elementslib.ID(controller.tabs.activeTab,
                                    "ctl00_MainContent_footerFormView_ASPxButtonAuctionCancel_B");

  controller.click(cancelButton);

  cancelOKButton = new elementslib.ID(controller.window.document, "formViewCancel_ASPxButtonOk_B");
  controller.waitFor(function () {
    return cancelOKButton.getNode() !== null;
  }, "Waiting for the modal dialog");
  controller.click(cancelOKButton);

  // Verify output in UI of canceled auction
  // XXX: Currently this button is a blocker, pending for a fix from production team
  backButton = new elementslib.ID(controller.tabs.activeTab, "ctl00_ASPxMenu1_DXI0_T");

  controller.click(backButton);
  controller.waitForPageLoad();

  canceledAuctionsButton = new elementslib.ID(controller.tabs.activeTab,
                                              "ctl00_MainContent_ASPxMenuDisplayAuctions_DXI6_T");

  controller.click(canceledAuctionsButton);
  controller.waitForPageLoad();
}
