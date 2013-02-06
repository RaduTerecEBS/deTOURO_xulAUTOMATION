var tabs = require("../../../firefoxLib/tabs");
var domUtils = require("../../../firefoxLib/dom-utils");

const PAGE_SOURCE = "http://ebs.hmm.lan/";
// const TYPE = "elke";

function setupModule() {
  controller = mozmill.getBrowserController();
  nodeCollector = new domUtils.nodeCollector(controller.window.document);
  
  tabs.closeAllTabs(controller);
}

function teardownModule() {
  //XXX: No test memory to cleanup right now
}

// Verify login successful and user is seen in KT also
function testLoginKT() {

}