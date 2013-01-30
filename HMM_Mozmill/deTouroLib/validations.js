/**
 * Constructor
 */
function Validation (aController) {
  this.controller = aController;
}

/**
 * Validation class
 */
Validation.prototype = {

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
   * Data validation of form fields, input fields, text fields
   *
   * @returns Boolean
   */
  checkForm: function Validation_checkForm(aFormId, aContent) {
    var formElement = new elementslib.ID(this.controller.window.document, aFormId);

    this.controller.assert(function () {
      return formElement.getNode().value === aContent;
    }, "Form content matches expectation: " + aContent);
  }
}
