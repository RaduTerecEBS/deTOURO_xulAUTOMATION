/**
 * Constructor
 */
function Les (aController) {
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
    var userField = new elementslib.ID(this.controller.window.document,
                                       "ctl00_ContentPlaceHolder1_UserName_I");
    this.controller.type(userField, user);
  
    dump("\n\n user value == " + userField.value);
  
    // test the username is correcty typed and keyboard event finished
    this.controller.waitFor(function () {
      return (userField.getNode().value === user);
    }, "The user name is typed correctly");
  
    var passwordField = new elementslib.ID(this.controller.window.document,
                                           "ctl00_ContentPlaceHolder1_Password_I");
    this.controller.type(passwordField, password);
  
    // wait for the pass to finish typing
    this.controller.waitFor(function () {
      return (passwordField.getNode().value === password);
    }, "The password is typed correctly");
  
    var loginButton = new elementslib.ID(this.controller.window.document,
                                         "ctl00_ContentPlaceHolder1_LoginButton_CD");
  
    this.controller.click(loginButton);
    this.controller.waitForPageLoad();
  
    // Escape the Firefox notification for password saving
    this.controller.keypress(null, 'VK_ESCAPE', {});
  }
}

// Export of classes
exports.Les = Les;