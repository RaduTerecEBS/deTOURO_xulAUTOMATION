/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

// Include required modules
var prefs = require("../../lib/prefs");

const TIMEOUT = 5000;

var setupModule = function() {
  controller = mozmill.getBrowserController();
}

var testSampleTestcase = function() {
  prefs.openPreferencesDialog(controller, callbackHandler);
}

var callbackHandler = function(controller) {
  var prefDialog = new PrefsAPI.preferencesDialog(controller);
  prefDialog.paneId = 'paneMain';

  // Code to be executed in the preferences dialog

  prefDialog.close(true);
}
