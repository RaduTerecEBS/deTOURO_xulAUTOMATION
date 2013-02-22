var tabs = require("../../../firefoxLib/tabs");

const PAGE_SOURCE = "http://ebs.hmm.lan/";
const TEST_DATA = "75";

function setupModule() {
  controller = mozmill.getBrowserController();
  
  tabs.closeAllTabs(controller);
}

function teardownModule() {
  //XXX: No test memory to cleanup right now
}

function testSearchByNumber() {
  var kt,
    ktas,
    noField,
    noResultField;

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

  // Number field
  noField = new elementslib.ID(controller.window.document,
  	                           "ctl00_MainContent_ASPxGridViewDrives_DXFREditorcol1_I");

  controller.type(noField, TEST_DATA);
  controller.waitForPageLoad();
  controller.sleep(7000);
  
  var table = controller.tabs.activeTab.querySelectorAll(".dxgvDataRow_deTouroKT");
  dump("\n length of table == " + table.length + "\n\n");

  for (var i = 0, l = table.length; i < l - 2; i++) {
    controller.assert(function () {
      return table[i].textContent.contains(TEST_DATA);
    },"Suggestion contains the search term");
  }
}

