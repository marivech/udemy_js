// BUDGET CONTROLLER
var budgetController = (function() {
  var Expense = function(id, description, value) {
    this.id = id;
    this.value = value;
    this.description = description;
  };

  var Income = function(id, description, value) {
    this.id = id;
    this.value = value;
    this.description = description;
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
    inputBtn: '.add__btn',
    incomeList: '.income__list',
    expenseList: '.expenses__list',
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
      var html, newHtml, element;
      if (type === 'inc') {
        html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%desc%</div> \
                <div class="right clearfix"><div class="item__value">+ %val%</div><div class="item__delete"> \
                <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
        element = document.querySelector(DOMStrings.incomeList);
      } else if (type === 'exp') {
        html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%desc%</div> \
                <div class="right clearfix"><div class="item__value">- %val%</div><div class="item__percentage">21%</div><div class="item__delete"> \
                <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
        element = document.querySelector(DOMStrings.expenseList);
      }

      newHtml = html
        .replace('%id%', obj.id)
        .replace('%val%', obj.value)
        .replace('%desc%', obj.description);
      
      element.insertAdjacentHTML('beforeend', newHtml);
    },
    clearFields: function() {
      var fields = document.querySelectorAll(DOMStrings.inputDescription + ', ' + DOMStrings.inputValue);
      var fieldsArr = Array.prototype.slice.call(fields);
      
      fieldsArr.forEach(function(field) {
          field.value = "";
        });
      
      fieldsArr[0].focus();
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
    UICtrl.addListItem(newItem, input.type);
    UICtrl.clearFields();
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