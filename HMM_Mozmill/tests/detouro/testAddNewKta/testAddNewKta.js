var ktas = require("../../../deTouroLib/ktas");
var modalDialog = require("../../../firefoxLib/modal-dialog");
var tabs = require("../../../firefoxLib/tabs");
var valid = require("../../../deTouroLib/validations");

const TEST_VNR_DATA = "22875384000";
const TEST_KVNR_NUMBER = "T123456789";
const TEST_ANR_DATA = "999944401";
const TEST_HOSPITAL_DATA = "bertaklinik hannover";

const VNR_TIMEOUT = 30000;

function setupModule() {
  controller = mozmill.getBrowserController();
  validation = new valid.Validation(controller);
  kt = new ktas.Ktas(controller);

  tabs.closeAllTabs(controller);
}

function teardownModule() {
  //XXX: No test memory to cleanup right now
}

function testAddNewKta() {
  var newKtaButton,
    enter,
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
    getKTANumber,
    labelNumber;

  enter = kt.enter();
  controller.assert(function () {
    return enter;
  }, "Success in entering kt page");

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

  var kvnr = new elementslib.ID(controller.tabs.activeTab,
                                "ctl00_MainContent_formViewInsured_textBoxKVNR");

  // If KVNR Number is not retrieved from server, complete the field with a dummy one
  if (kvnr.getNode().value === "") {
    controller.type(kvnr, TEST_KVNR_NUMBER);
    controller.waitFor(function () {
      return kvnr.getNode().value === TEST_KVNR_NUMBER;
    }, "kvnr number typed successfully");
  }
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

  getKTANumber = parseInt(assignedKtaNumber.getNode().textContent.slice(9,12));

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
}
