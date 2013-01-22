var tabs = require("../../lib/tabs");
var domUtils = require("../../lib/dom-utils");

const PAGE_SOURCE = "http://ebs.hmm.lan/";

const BENUTZERNAME = "Mihai";
const PASSWORT = "ch@ng3m42";

function setupModule() {
  controller = mozmill.getBrowserController();
  nodeCollector = new domUtils.nodeCollector(controller.window.document);
  
  tabs.closeAllTabs(controller);
}

function teardownModule() {
  //XXX: No test memory to cleanup right now
}

// Test method
function testLE() {
  // open ebs.hmm.lan
  controller.open(PAGE_SOURCE);
  controller.waitForPageLoad();
  
  // open de touro LE
  var lePage =  new elementslib.XPath(controller.tabs.activeTab, "/html/body/div[@id='content-outer']/" +
                                                                 "div[@id='content']/div/div[@id='banners']/" +
																 "table[2]/tbody/tr[1]/td[2]/a/b");
  controller.click(lePage);
  controller.waitForPageLoad();
  
  // XXX: Demo purpose sleep
  controller.sleep(2000);
  
  loginHelper(BENUTZERNAME, PASSWORT);
  
  // XXX: Demo purpose sleep
  controller.sleep(2000);
  
  // Maximize Firefox Window now
  controller.window.STATE_MAXIMIZED = 1;
}

// Wird in der API sein spater, kann nicht mehr in test file bleiben
function loginHelper(user, password) {
  var userField = new elementslib.ID(controller.window.document,
                                     "ctl00_ContentPlaceHolder1_UserName_I");
  controller.type(userField, user);
  
  dump("\n\n user value == " + userField.value);
  
  // test the username is correcty typed and keyboard event finished
  controller.waitFor(function () {
    return (userField.getNode().value === user);
  }, "The user name is typed correctly");
  
  var passwordField = new elementslib.ID(controller.window.document,
                                         "ctl00_ContentPlaceHolder1_Password_I");
  controller.type(passwordField, password);
  
  // wait for the pass to finish typing
  controller.waitFor(function () {
    return (passwordField.getNode().value === password);
  }, "The password is typed correctly");
  
  var loginButton = new elementslib.ID(controller.window.document,
                                       "ctl00_ContentPlaceHolder1_LoginButton_CD");
  
  controller.click(loginButton);
  controller.waitForPageLoad();
  
  // Escape the Firefox notification for password saving
  controller.keypress(null, 'VK_ESCAPE', {});
}