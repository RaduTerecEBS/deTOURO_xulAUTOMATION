const PAGE_SOURCE = "http://ebs.hmm.lan/";

/**
 * Constructor
 */
function Ktas(aController) {
  this._controller = aController;
}

/**
 * Ktas class:
 *           For deTouro KT application
 *           Collection API of helper functions
 */
Ktas.prototype = {

  ///////////////////////////////
  // Global section
  ///////////////////////////////

  /**
   * Get the controller of the window
   *
   * @returns {MozMillController} Mozmill Controller
   */
  get controller() {
    return this._controller;
  },

  /**
   * Performs a search in a given field in the grid view
   * 
   * @params: aField {String} Selector of field to search in
   *          aTerm {String} The search term
   */
  search: function Ktas_search(aField, aTerm) {
    var searchField = new elementslib.ID(this.controller.tabs.activeTab, aField);

    this.controller.type(searchField, aTerm);
    this.controller.waitFor(function () {
      return (searchField.getNode().value === aTerm || searchField.getNode().textContent === aTerm);
    }, "Search term was typed correctly");
  },

  /**
   * Enters the KT page
   *
   * @returns {true} if successful
   *          {error} if something went wrong 
   */
   enter: function Ktas_enter() {
     var kt,
       ktas;

     // open ebs.hmm.lan
    this.controller.open(PAGE_SOURCE);
    this.controller.waitForPageLoad();

    // get the list element to enter detouro app and check
    kt =  new elementslib.XPath(this.controller.tabs.activeTab, "/html/body/div[@id='content-outer']/" +
                                                                "div[@id='content']/div/div[@id='banners']/" +
                                                                "table[2]/tbody/tr[1]/td[5]/a/b");
    this.controller.click(kt);
    this.controller.waitForPageLoad();

    // XXX: Bitte nicht XPATH verwenden, nur wenn gibt es nicht etwas anderes
    ktas = new elementslib.XPath(this.controller.tabs.activeTab, "/html/body/form[@id='aspnetForm']/" +
                                                                 "div[3]/div[2]/div[2]/div/div/div/" +
                                                                 "div/span");
  
    this.controller.click(ktas);
    this.controller.waitForPageLoad();

    return true;
   }
}

// Exports of classes
exports.Ktas = Ktas;