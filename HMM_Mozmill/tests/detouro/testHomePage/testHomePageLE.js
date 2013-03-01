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
    loginDialog;

  controller.open(PAGE_SOURCE);
  controller.waitForPageLoad();

  le = new elementslib.XPath(controller.tabs.activeTab,
  	                         ".//*[@id='banners']/table[2]/tbody/tr/td[2]/a/b");
  	                            
  controller.click(le);
  controller.waitForPageLoad();

  // Check active auctions panel on home page
  activeAuctionsList = controller.tabs.activeTab.querySelectorAll(".trip-item-wrapper");
  dump("\n activeAuctionsList = " + activeAuctionsList.length + "\n");
  // Transform a node into an element
  activeAuction = new elementslib.Elem(activeAuctionsList[0]);

  controller.click(activeAuction);
  
  loginDialog = new elementslib.Selector(controller.tabs.activeTab,
  	                                     "x-window x-message-box x-layer " +
  	                                     "x-window-default "+ 
  	                                     "x-closable x-window-closable " +
  	                                     "x-window-default-closable");
  dump("\n login dialog node : " + loginDialog.getNode() + "\n");
  controller.waitFor(function () {
  	return loginDialog.hidden === false;
  }, "login dialog just popped");
  dump("\n login dialog node after waiting: " + loginDialog.getNode() + "\n");
}