var tabs = require("../../../firefoxLib/tabs");

const PAGE_SOURCE = "http://ebs.hmm.lan/";
const EXPLANATION = "Explanation";

const AUCTION_IMG_SRC = "http://ebs.hmm.lan:9002/Resources/Images/AVAs.png";
const FDL_IMG_SRC = "http://ebs.hmm.lan:9002/Resources/Images/FDLs.png";
const EVAL_IMG_SRC = "http://ebs.hmm.lan:9002/Resources/Images/Eval.png";

function setupModule() {
  controller = mozmill.getBrowserController();
  
  tabs.closeAllTabs(controller);
}

function teardownModule() {
  //XXX: No test memory to cleanup right now
}

/**
 * Test elements of home page
 */
function testHomePage() {
  var kt,
    explanation,
    meaningMenuItem,
    workflowMenuItem,
    meaningDetailsDropDown,
    style,
    auctionImg,
    fdlImg,
    evalImg;

  // open ebs.hmm.lan
  controller.open(PAGE_SOURCE);
  controller.waitForPageLoad();

  // get the list element to enter detouro app and check
  kt =  new elementslib.XPath(controller.tabs.activeTab, "/html/body/div[@id='content-outer']/" +
                                                         "div[@id='content']/div/div[@id='banners']/" +
													                               "table[2]/tbody/tr[1]/td[5]/a/b");
  controller.click(kt);
  controller.waitForPageLoad();

  // Check existance of explanation title
  explanation = new elementslib.Selector(controller.tabs.activeTab,
                                         ".teaser>h1>span");

  controller.assert(function () {
    return explanation.getNode() !== null;
  }, "Explanation title is exitent on the page");

  controller.assert(function () {
    return explanation.getNode().textContent === EXPLANATION;
  }, "Explanation has the appropriate text attached");

  // Check explanation menu entries and animations taking place properly
  meaningMenuItem = new elementslib.ID(controller.tabs.activeTab,
                                       "ctl00_MainContent_navBarSections_GHC0");
  workflowMenuItem = new elementslib.ID(controller.tabs.activeTab,
                                        "ctl00_MainContent_navBarSections_GHC1");
  meaningDetailsDropDown = new elementslib.ID(controller.tabs.activeTab,
                                              "ctl00_MainContent_navBarSections_GCA0");

  // XXX: Due to the content string bug, we can only use contains for testing, known issue
  controller.assert(function () {
    return meaningMenuItem.getNode().textContent.contains("Was bedeutet DeTouro ?") === true;
  }, "Meaning menu item contains the proper text message");

  controller.assert(function () {
    return workflowMenuItem.getNode().textContent.contains("Wie funktioniert DeTouro ?") === true;
  }, "Workflow menu item contains the proper text message");

  // Click the menu entries and check for animation
  controller.click(meaningMenuItem);
  controller.waitFor(function () {
    return meaningDetailsDropDown.getNode() !== null;
  }, "Information is present for Meaning Menu Item");
  
  controller.click(workflowMenuItem);
  controller.waitFor(function () {
    return workflowMenuItem.getNode() !== null;
  }, "Information is present for Workflow Menu Item");

  // XXX: We are commenting style checks for now

  /*var meaningContentDropDown = new elementslib.ID(controller.tabs.activeTab,
                                                  "ctl00_MainContent_navBarSections_GCTC0_Panel1");
  style = controller.window.getComputedStyle(meaningContentDropDown.getNode(), '');
  dump ("\n\n style = " + style + "\n");
  var state = style.getPropertyValue('visibility');
  var hidden = style.getPropertyValue('display');

  dump ("\n\n visibility = " + state + "\n");
  dump("\n\n display = " + hidden + "\n");

  controller.assert(function () {
    return meaningDetailsDropDown.getNode().style === "display: none";
  }, "On workflow menu item, the meaning menu dropdown is not visible");*/

  // Check images and srcs
  // XXX: Should be in API if used often
  auctionImg = new elementslib.ID(controller.tabs.activeTab, "ctl00_MainContent_Image1");
  fdlImg = new elementslib.ID(controller.tabs.activeTab, "ctl00_MainContent_Image2");
  evalImg = new elementslib.ID(controller.tabs.activeTab, "ctl00_MainContent_Image3");

  controller.assert(function () {
    return auctionImg.getNode().src === AUCTION_IMG_SRC;
  }, "Image source for auction image correct");
  controller.assert(function () {
    return fdlImg.getNode().src === FDL_IMG_SRC;
  }, "Image source for FDL image correct");
  controller.assert(function () {
    return evalImg.getNode().src === EVAL_IMG_SRC;
  }, "Image source for Eval FDL-Navi image correct");
}