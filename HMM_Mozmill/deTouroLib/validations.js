const IDS = [{
    name: "vnr",
    id: "ctl00_MainContent_formViewInsured_textBoxVNR",
    type: "textBox"
  },
  {
    name: "name",
    id: "ctl00_MainContent_formViewInsured_textBoxName",
    type: "textBox"
  },
  {
    name: "firstname",
    id: "ctl00_MainContent_formViewInsured_textBoxFirstName",
    type: "textBox"
  },
  {
    name: "gender",
    id: "ctl00_MainContent_formViewInsured_DropDownListPatientGender",
    type: "dropDown"
  },
  {
    name: "street",
    id: "ctl00_MainContent_formViewInsured_textBoxStreet",
    type: "textBox"
  },
  {
    name: "postalCode",
    id: "ctl00_MainContent_formViewInsured_textBoxPostalCode",
    type: "textBox"
  },
  {
    name: "postalCode",
    id: "ctl00_MainContent_formViewInsured_textBoxPostalCode",
    type: "textBox"
  },
  {
    name: "region",
    id: "ctl00_MainContent_formViewInsured_textBoxPlace",
    type: "textBox"
  },
  {
    name: "country",
    id: "ctl00_MainContent_formViewInsured_DropDownListCountry",
    type: "dropDown"
  },
  {
    name: "birthday",
    id: "ctl00_MainContent_formViewInsured_textBoxBirthday",
    type: "textBox"
  },
  {
    name: "phone",
    id: "ctl00_MainContent_formViewInsured_textBoxPhone",
    type: "textBox"
  }];

/**
 * Constructor
 */
function Validation (aController) {
  this._controller = aController;
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
    var formElement = new elementslib.ID(this.controller.window.document,
                                         aFormId);

    this.controller.assert(function () {
      return formElement.getNode().value === aContent;
    }, "Form content matches expectation: " + aContent);
  },

  /**
   * Get the list of all KTA form mandatory fields
   *
   * @returns Object List
   */
   getKtaFormElementList: function Validation_getKtaFormElementList() {
     var elements = [];

     for (var i = 0, l = IDS.length; i < l; i++) {
       elements.push(new elementslib.ID(this.controller.tabs.activeTab, IDS[i].id));
       // XXX: debugging purposes
       /*dump("\n elements = " +
            (elements[i].getNode().value || elements[i].getNode().textContent)
            + "\n");*/
     }
     return elements;
   },

   /**
    * Check for empty required fields for KTAs and insert dummy information
    *
    * @returns
    */
    checkEmptyKTAFields: function Validation_checkEmptyKTAFields() {
      var elements = this.getKtaFormElementList();

      for (var i = 0, l = elements.length; i < l; i++) {
        if (elements[i].getNode().value === "") {
          if (IDS[i].type === "textBox") {
            this.controller.type(elements[i], "02644233348");
            this.controller.waitFor(function() {
              return elements[i].getNode().value === "02644233348";
            }, "Typed correctly the dummy addition to the " + IDS[i].name +
               "field");
          }
          if (IDS[i].type === "dropDown") {
            dump ("\n\n EXCEPTION: Sorry dropdown case not supported yet \n\n");
          }
        }
      }
    }
}

// Export of variables
exports.IDS = IDS;

// Export of classes
exports.Validation = Validation;
