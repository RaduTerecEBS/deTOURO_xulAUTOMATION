var ktas = require("../../../deTouroLib/ktas");
var tabs = require("../../../firefoxLib/tabs");
var valid = require("../../../deTouroLib/validations");

function setupModule() {
  controller = mozmill.getBrowserController();
  validation = new valid.Validation(controller);
  kt = new ktas.Ktas(controller);

  tabs.closeAllTabs(controller);
}

function teardownModule() {
  //XXX: No test memory to cleanup right now
}

function testCancelAuction() {
  var enter,
    auction,
    auctionNumber,
    cancelAuctionButton,
    labelNumber,
    cancelOKButton,
    canceledAuctionsButton,
    backButton;

  enter = kt.enter();
  controller.assert(function () {
    return enter;
  }, "Success in entering kt page");

  auctionNumber = new elementslib.ID(controller.tabs.activeTab,
                                     "ctl00_MainContent_ASPxGridViewDrives_cell0_1_labelNumber");

  auction = new elementslib.ID(controller.tabs.activeTab,
                               "ctl00_MainContent_ASPxGridViewDrives_tccell0_1");
  controller.click(auction);
  controller.waitForPageLoad();
  controller.sleep(3000);

  cancelAuctionButton = new elementslib.ID(controller.tabs.activeTab,
                                           "ctl00_MainContent_footerFormView_ASPxButtonAuctionCancel_B");
  controller.click(cancelAuctionButton);
  controller.waitForPageLoad();

  var dialog = new elementslib.ID(controller.window.document, "ctl00_MainContent_popUpCancel_PW-1");
  var style = controller.window.getComputedStyle(dialog.getNode(), '');

  controller.waitFor(function () {
    return style.getPropertyValue('visibility') === 'visible';
  }, "Pop up cancel auction visible");

  cancelOKButton = new elementslib.ID(controller.window.document, "formViewCancel_ASPxButtonOk_B");
  controller.waitFor(function () {
    return cancelOKButton.getNode() !== null;
  }, "Waiting for the modal dialog");
  controller.sleep(1000);
  
  controller.click(cancelOKButton);

  controller.waitForPageLoad();
  controller.sleep(2000);

  // Verify output in UI of canceled auction
  // XXX: Currently this button is a blocker, pending for a fix from production team
  backButton = new elementslib.ID(controller.tabs.activeTab, "ctl00_ASPxMenu1_DXI0_I");

  controller.click(backButton);
  controller.waitForPageLoad();

  canceledAuctionsButton = new elementslib.ID(controller.window.document,
                                              "ctl00_MainContent_ASPxMenuDisplayAuctions_DXI6_T");

  controller.click(canceledAuctionsButton);
  controller.waitForPageLoad();

  labelNumber = new elementslib.ID(controller.tabs.activeTab,
                                   "ctl00_MainContent_ASPxGridViewDrives_cell0_1_labelNumber");
  controller.assert(function () {
    return parseInt(labelNumber.getNode().textContent) === parseInt(auctionNumber.getNode().textContent);
  }, "Canceled auction is under canceled auctions category, where it should be");
}