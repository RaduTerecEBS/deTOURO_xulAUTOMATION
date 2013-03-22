var prefs = require("../../../firefoxLib/prefs");
var tabs = require("../../../firefoxLib/tabs");

const PAGE_SOURCE = "https://qa.de-touro.de/View/index.aspx";

const PREF_SSL_OVERRIDE = "browser.ssl_override_behavior";
const PREF_SSL_DISABLE = "security.enable_ssl3";
const PREF_SSL_WARN = "security.default_personal_cert";

function setupModule() {
  controller = mozmill.getBrowserController();

  prefs.preferences.setPref(PREF_SSL_OVERRIDE, 1);
  prefs.preferences.setPref(PREF_SSL_DISABLE, false);
  prefs.preferences.setPref(PREF_SSL_WARN, "Select Automatically");

  controller.window.maximize();
  tabs.closeAllTabs(controller);
}

function teardownModule() {
  // Cleanup prefs
  prefs.preferences.clearUserPref(PREF_SSL_OVERRIDE);
  prefs.preferences.clearUserPref(PREF_SSL_DISABLE);
  prefs.preferences.clearUserPref(PREF_SSL_WARN);
}

/**
 * Test elements of home page KT
 */
function testHomePage() {
  // Just enter LE Page
  var activeAuctionsList,
    activeAuction,
    loginDialog,
    dialogButtons,
    cancelLoginButton,
    regButton,
    regCloseButton;

  controller.open(PAGE_SOURCE);
  controller.waitForPageLoad();
  controller.sleep(15000);

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

  regCloseButton = new elementslib.Selector(controller.tabs.activeTab, ".x-tool-close");
  controller.click(regCloseButton);
}