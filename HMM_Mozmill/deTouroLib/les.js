const TIMEOUT_PAGE = 30000;

/**
 * Constructor
 */
function Les(aController) {
  this._controller = aController;
}

/**
 * Les class:
 *           For deTouro LE application
 *           Collection API of helper functions
 */
Les.prototype = {

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
   * Login to detouro LE
   *
   * @returns Boolean
   */
  loginHelper: function Les_loginHelper(user, password) {
    var loginButton,
      fields;

    loginButton = new elementslib.ID(this.controller.tabs.activeTab,
                                     "topbutton-1068-btnEl");
    this.controller.click(loginButton);

    // XXX: To be changed with waitFor
    this.controller.sleep(4000);

    fields = new elementslib.Selector(this.controller.tabs.activeTab,
                                      ".x-form-field.x-form-text.x-form-focus.x-field-form-focus.x-field-default-form-focus");

    this.controller.type(fields, user);
    this.controller.waitFor(function () {
      return fields.getNode().value === user;
    }, "Username typed correctly --> got --> " + fields.getNode().value);

    this.controller.keypress(null, 'VK_TAB', {});

    this.controller.type(fields, password);
    this.controller.waitFor(function () {
      return fields.getNode().value === password;
    }, "Password typed correctly --> got --> " + fields.getNode().value);

    this.controller.keypress(null, 'VK_RETURN', {});
    this.controller.waitForPageLoad(TIMEOUT_PAGE);
  }
}

// Export of classes
exports.Les = Les;