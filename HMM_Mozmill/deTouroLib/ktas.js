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
  }
}

// Exports of classes
exports.Ktas = Ktas;