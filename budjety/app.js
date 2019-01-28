// BUDGET CONTROLLER
var budgetController = (function() {
  var Expense = function(id, description, value) {
    this.id = id;
    this.value = value;
    this.description;
  };

  var Income = function(id, description, value) {
    this.id = id;
    this.value = value;
    this.description;
  };

  var data = {
    allItems: {
      inc: [],
      exp: [],
    },
    total: {
      exp: 0,
      inc: 0,
    }
  };

  return {
    addItem: function(type, des, val) {
      var ID, newItem;

      // create new id based on last items
      if (data.allItems[type].length > 0) {
        ID = data.allItems[type][data.allItems[type].length - 1].id + 1; 
      } else {
        ID = 0;
      }
      
      // create obj depending on type
      if (type === 'exp') {
        newItem = new Expense(ID, des, val);
      } else if (type === 'inc') {
        newItem = new Income(ID, des, val);
      }

      // add new item to data structure
      data.allItems[type].push(newItem);

      return newItem;
    }
  };

})();

// UI CONTROLLER
var UIController = (function() {
  var DOMStrings = {
    inputType: '.add__type',
    inputDescription: '.add__description',
    inputValue: '.add__value',
    inputBtn: '.add__btn'
  };
  return {
    getInput: function() {
      return {
        type: document.querySelector(DOMStrings.inputType).value, //returns inc or exp
        description: document.querySelector(DOMStrings.inputDescription).value,
        value: document.querySelector(DOMStrings.inputValue).value,
      };
    },
    addListItem: function(obj, type) {

    },
    getDomStrings: function() {
      return DOMStrings;
    },
  };
})();

// GLOBAL APP CONTROLLER
var controller = (function(budgetCtrl, UICtrl) {
  var ctrlAddItem = function() {
    var input, newItem;
    input = UICtrl.getInput();
    newItem = budgetCtrl.addItem(input.type, input.description, input.value);
  };

  var setupEventListeners = function() {
    var DOM = UICtrl.getDomStrings();
    document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);
    document.addEventListener('keypress', function(event) {
      if (event.charCode === 13 || event.which === 13) {
        ctrlAddItem();
      };
    });  
  };

  return {
    init: function() {
      console.log('Application started');
      setupEventListeners();
    }
  }
})(budgetController, UIController);

controller.init();