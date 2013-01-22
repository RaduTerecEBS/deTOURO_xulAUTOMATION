/** 
 * deTouro endurance test automation demo file
 */
var endurance = require("../../lib/endurance");
var tabs = require("../../lib/tabs");
var domUtils = require("../../lib/dom-utils");

const PAGE_SOURCE = "http://ebs.hmm.lan:9002/Auctions/ShowAuctions.aspx";

function setupModule() {
  // needs to be global by framework design
  controller = mozmill.getBrowserController();
  enduranceManager = new endurance.EnduranceManager(controller);
  nodeCollector = new domUtils.nodeCollector(controller.window.document);
  tabBrowser = new tabs.tabBrowser(controller);
  
  tabs.closeAllTabs(controller);
}

function teardownModule() {
  //XXX: No test memory to cleanup right now
  // Close all tabs
  tabBrowser.closeAllTabs();
}

function testSearchVersicherter() {
  enduranceManager.run(function () {
    enduranceManager.loop(function () {
      // Load a web page
      enduranceManager.addCheckpoint("Loading a web page");
      controller.open(PAGE_SOURCE);
      controller.waitForPageLoad();
      enduranceManager.addCheckpoint("Web page has been loaded");

      // Open a new tab
      enduranceManager.addCheckpoint("Open a new tab");
      tabBrowser.openTab();
      enduranceManager.addCheckpoint("New tab has been opened");
    });
    // Close all tabs
    tabBrowser.closeAllTabs();
  });
}