var tabs = require("../../../firefoxLib/tabs");

const PAGE_SOURCE = "http://ebs.hmm.lan/";

function setupModule() {
  controller = mozmill.getBrowserController();
  
  controller.window.maximize();
  tabs.closeAllTabs(controller);
}

function teardownModule() {
  //XXX: No test memory to cleanup right now
}

/**
 * Test elements of home page KT
 */
function testHomePage() {
  // Just enter LE Page
  var le,
    activeAuctionsList,
    activeAuction,
    loginDialog,
    dialogButtons,
    cancelLoginButton,
    regButton,
    regCloseButton;

  controller.open(PAGE_SOURCE);
  controller.waitForPageLoad();

  le = new elementslib.XPath(controller.tabs.activeTab,
  	                         ".//*[@id='banners']/table[2]/tbody/tr/td[2]/a/b");
  	                            
  controller.click(le);
  controller.waitForPageLoad();

  // Check active auctions panel on home page
  activeAuctionsList = controller.tabs.activeTab.querySelectorAll(".trip-item-wrapper");

  // Transform a node into an element
  activeAuction = new elementslib.Elem(activeAuctionsList[0]);

  controller.click(activeAuction);

  dialogButtons = controller.tabs.activeTab.querySelectorAll(".x-btn-center");
  cancelLoginButton = new elementslib.Elem(dialogButtons[14]);

  controller.waitForElement(cancelLoginButton, 5000);
  controller.click(cancelLoginButton);

  regButton = new elementslib.Selector(controller.tabs.activeTab,
  	                                   ".registration-button-center");
  controller.click(regButton);
  controller.waitForPageLoad();

  regCloseButton = new elementslib.Selector(controller.window.document, ".x-tool-close");
  controller.waitForElement(regCloseButton);
  controller.click(regCloseButton);
}

// XXX: Skip this test
setupModule.__force_skip__ = "Issue 19 - Skip test due to app change";
teardownModule.__force_skip__ = "Issue 19 - Skip test due to app change";