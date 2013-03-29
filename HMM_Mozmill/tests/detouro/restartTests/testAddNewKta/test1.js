var ktas = require("../../../../deTouroLib/ktas");
var modalDialog = require("../../../../firefoxLib/modal-dialog");
var tabs = require("../../../../firefoxLib/tabs");
var testData = require("../../../../deTouroLib/test-data");
var valid = require("../../../../deTouroLib/validations");

const VNR_TIMEOUT = 30000;

function setupModule() {
  controller = mozmill.getBrowserController();
  validation = new valid.Validation(controller);
  kt = new ktas.Ktas(controller);

  controller.window.maximize();

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
    driveKm,
    index,
    kvnr,
    randKvnr,
    indexAnr,
    indexHospital,
    loading,
    loadingStyle,
    vnrAutocompleteStyle;;

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
  index = parseInt(Math.random() * testData.testData.insuredNumber.length);

  controller.type(vnrField, testData.testData.insuredNumber[index]);
  controller.waitFor(function () {
    return vnrField.getNode().value === testData.testData.insuredNumber[index];
  }, "VNR Data correctly typed");

  controller.waitFor(function () {
    return new elementslib.ID(controller.tabs.activeTab, "loadingDiv") !== null;
  }, "Image loading is not null");

  loading = new elementslib.ID(controller.tabs.activeTab, "loadingDiv");
  loadingStyle = controller.window.getComputedStyle(loading.getNode(), "");

  controller.waitFor(function () {
    return loadingStyle.getPropertyValue("display") !== "none";
  }, "Loading image is displayed");

  vnrAutocomplete = new elementslib.ID(controller.tabs.activeTab,
                                       "ui-id-1");
  vnrAutocompleteStyle = controller.window.getComputedStyle(vnrAutocomplete.getNode(), "");

  controller.waitFor(function () {
    return vnrAutocompleteStyle.getPropertyValue("display") === "block";
  }, "Autocomplete visible");
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

  kvnr = new elementslib.ID(controller.tabs.activeTab,
                            "ctl00_MainContent_formViewInsured_textBoxKVNR");

  randKvnr = "T" + parseInt(Math.random() * (999999999 - 100000000) + 100000000);

  // If KVNR Number is not retrieved from server, complete the field with a dummy one
  if (kvnr.getNode().value === "") {
    controller.type(kvnr, randKvnr);
    controller.waitFor(function () {
      return kvnr.getNode().value === randKvnr;
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
  indexAnr = parseInt(Math.random() * testData.testData.doctor.length);

  controller.type(anrButton, testData.testData.doctor[indexAnr]);
  controller.waitFor(function () {
    return anrButton.getNode().value === testData.testData.doctor[indexAnr];
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
  indexHospital = parseInt(Math.random() * testData.testData.hospital.length);

  controller.type(hospitalField, testData.testData.hospital[indexHospital]);
  controller.waitFor(function () {
    return hospitalField.getNode().value === testData.testData.hospital[indexHospital];
  },"Hospital data typed correctly");

  controller.sleep(5000);
  controller.click(vnrAutocomplete);
  controller.waitForPageLoad();
  controller.sleep(5000);

  numberDrives = new elementslib.ID(controller.tabs.activeTab,
                                    "ctl00_MainContent_formViewDetails_textBoxNoDrives");
  numberDrives.getNode().value = "2";

  driveKm = new elementslib.ID(controller.tabs.activeTab,
                               "ctl00_MainContent_formViewDetails_textBoxDriveKm");
  if (driveKm.getNode().value === "0") {
    driveKm.getNode().value = "132";
  }

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

  getKTANumber = parseInt(assignedKtaNumber.getNode().textContent.slice(12,18));
  persisted.ktaNumber = getKTANumber;

  zoneContainer = new elementslib.ID(controller.tabs.activeTab,
                                     "zoneContainer");

  // A dock panel page should appear containing data
  controller.assert(function () {
    return zoneContainer.getNode() !== null;
  }, "Proper page loaded after saved new KTA");

  publishAuctionButton = new elementslib.ID(controller.tabs.activeTab,
                                            "ctl00_MainContent_footerFormView_ButtonAuctionPublish_B");
  
  controller.waitForElement(publishAuctionButton);
  controller.click(publishAuctionButton);
  controller.waitForPageLoad();
}