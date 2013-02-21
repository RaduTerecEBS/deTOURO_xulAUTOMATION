var tabs = require("../../../firefoxLib/tabs");
var valid = require("../../../deTouroLib/validations");

const PAGE_SOURCE = "http://ebs.hmm.lan/";

function setupModule() {
  controller = mozmill.getBrowserController();
  validation = new valid.Validation(controller);

  tabs.closeAllTabs(controller);
}

function teardownModule() {
  //XXX: No test memory to cleanup right now
}

function testCancelAuction() {
  var kt,
    ktas,
    auction,
    auctionNumber,
    cancelAuctionButton,
    labelNumber,
    cancelOKButton,
    canceledAuctionsButton,
    backButton;

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

  auctionNumber = new elementslib.ID(controller.tabs.activeTab, "ctl00_MainContent_ASPxGridViewDrives_cell0_1_labelNumber");

  auction = new elementslib.ID(controller.tabs.activeTab, "ctl00_MainContent_ASPxGridViewDrives_tccell0_1");
  controller.click(auction);
  controller.waitForPageLoad();
  controller.sleep(3000);

  cancelAuctionButton = new elementslib.ID(controller.tabs.activeTab, "ctl00_MainContent_footerFormView_ASPxButtonAuctionCancel_B");
  controller.click(cancelAuctionButton);
  controller.waitForPageLoad();

  cancelOKButton = new elementslib.ID(controller.window.document, "formViewCancel_ASPxButtonOk_B");
  controller.waitFor(function () {
    return cancelOKButton.getNode() !== null;
  }, "Waiting for the modal dialog");
  controller.click(cancelOKButton);

  controller.waitForPageLoad();
  controller.sleep(2000);

  // Verify output in UI of canceled auction
  // XXX: Currently this button is a blocker, pending for a fix from production team
  backButton = new elementslib.ID(controller.tabs.activeTab, "ctl00_ASPxMenu1_DXI0_I");

  controller.click(backButton);
  controller.waitForPageLoad();

  canceledAuctionsButton = new elementslib.ID(controller.tabs.activeTab,
                                              "ctl00_MainContent_ASPxMenuDisplayAuctions_DXI6_T");

  controller.click(canceledAuctionsButton);
  controller.waitForPageLoad();

  labelNumber = new elementslib.ID(controller.tabs.activeTab,
                                   "ctl00_MainContent_ASPxGridViewDrives_cell0_1_labelNumber");
  controller.assert(function () {
    return parseInt(labelNumber.getNode().textContent) === parseInt(auctionNumber.getNode().textContent);
  }, "Canceled auction is under canceled auctions category, where it should be");
}