// License

// Lib requirements

// Constants

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
  }
}
