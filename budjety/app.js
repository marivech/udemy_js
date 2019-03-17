// BUDGET CONTROLLER
var budgetController = (function() {
  var Expense = function(id, description, value) {
    this.id = id;
    this.value = value;
    this.description = description;
    this.percentage = -1;
  };

  Expense.prototype.calcPercentage = function(totalIncome) {
    this.percentage = totalIncome > 0 ? Math.round(this.value / totalIncome * 100) : -1;
  };

  Expense.prototype.getPercentage = function() {
    return this.percentage;
  }

  var Income = function(id, description, value) {
    this.id = id;
    this.value = value;
    this.description = description;
  };

  var calculateTotal = function(type) {
    var sum = 0;
    data.allItems[type].forEach(function(elm) {
      sum += elm.value;
    });
    data.total[type] = sum;
  };

  var data = {
    allItems: {
      inc: [],
      exp: [],
    },
    total: {
      exp: 0,
      inc: 0,
    },
    budget: 0,
    percentage: -1,
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
    },
    deleteItem: function(type, ID) {
      var ids = data.allItems[type].map(function(elm) {
        return elm.id;
      });
      var targetID = ids.indexOf(ID);
      if (targetID !== -1) {
        data.allItems[type].splice(targetID, 1);
      }
    },
    calculateBudget: function() {
      calculateTotal('exp');
      calculateTotal('inc');

      data.budget = data.total.inc - data.total.exp;

      if (data.total.inc > 0) {
        data.percentage = Math.round((data.total.exp / data.total.inc) * 100); 
      } else {
        data.percentage = -1; 
      }
      
    },
    calculatePercentages: function() {
      data.allItems.exp.forEach(function(cur) {
        cur.calcPercentage(data.total.inc);
      });
    },
    getPercentages: function() {
      return data.allItems.exp.map(function(cur) {
        return cur.getPercentage();
      })
    },
    getBudget: function() {
      return {
        budget: data.budget,
        totalInc: data.total.inc,
        totalExp: data.total.exp,
        percentage: data.percentage,
      }
    },
    publicTest: function() {
      console.log(data)
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
    percentageLabel: '.budget__expenses--percentage',
    budgetLabel: '.budget__value',
    incomeLabel: '.budget__income--value',
    expensesLabel: '.budget__expenses--value',
    listContainer: '.container',
    expensesPercentage: '.item__percentage',
    dateLabel: '.budget__title--month',
  };

  var formatNumber = function(num) {
    num = Math.abs(num).toFixed(2);

    var int = num.split('.')[0];
    var dec = num.split('.')[1];

    if (int.length > 3) {
      int = int.substr(0, int.length - 3) + ',' + int.substr(int.length - 3, 3);
    }

    return int + '.' + dec;
  };
  return {
    getInput: function() {
      return {
        type: document.querySelector(DOMStrings.inputType).value, //returns inc or exp
        description: document.querySelector(DOMStrings.inputDescription).value,
        value: parseFloat(document.querySelector(DOMStrings.inputValue).value),
      };
    },
    addListItem: function(obj, type) {
      var html, newHtml, element;
      if (type === 'inc') {
        html = '<div class="item clearfix" id="inc-%id%"><div class="item__description">%desc%</div> \
                <div class="right clearfix"><div class="item__value">+ %val%</div><div class="item__delete"> \
                <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
        element = document.querySelector(DOMStrings.incomeList);
      } else if (type === 'exp') {
        html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%desc%</div> \
                <div class="right clearfix"><div class="item__value">- %val%</div><div class="item__percentage">21%</div><div class="item__delete"> \
                <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
        element = document.querySelector(DOMStrings.expenseList);
      }

      newHtml = html
        .replace('%id%', obj.id)
        .replace('%val%', formatNumber(obj.value, type))
        .replace('%desc%', obj.description);
      
      element.insertAdjacentHTML('beforeend', newHtml);
    },
    deleteListItem: function(selectorId) {
      var elm = document.getElementById(selectorId);
      elm.parentNode.removeChild(elm); 
    },
    displayPercentages: function(percentages) {
      var fields = document.querySelectorAll(DOMStrings.expensesPercentage);

      var nodeListForeach  = function(list, callback) {
        for (let index = 0; index < list.length; index++) {
          callback(list[index], index);
        }
      };

      nodeListForeach(fields, function(current, i) {
        if (percentages[i] > 0) {
          current.textContent = percentages[i] + '%';
        }
        else {
          current.textContent = '---';
        }
      });
    },
    clearFields: function() {
      var fields = document.querySelectorAll(DOMStrings.inputDescription + ', ' + DOMStrings.inputValue);
      var fieldsArr = Array.prototype.slice.call(fields);
      
      fieldsArr.forEach(function(field) {
          field.value = "";
        });
      
      fieldsArr[0].focus();
    },
    displayMonth: function() {
      var now = new Date();
      var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August',
    'September', 'October', 'November', 'December'];
      var month = months[now.getMonth()];
      var year = now.getFullYear();

      document.querySelector(DOMStrings.dateLabel).textContent = month + ' ' + year;
    },
    displayBudget: function (obj) {
      document.querySelector(DOMStrings.budgetLabel).textContent = obj.budget;
      document.querySelector(DOMStrings.percentageLabel).textContent = obj.percentage;
      document.querySelector(DOMStrings.expensesLabel).textContent = formatNumber(obj.totalExp);
      document.querySelector(DOMStrings.incomeLabel).textContent = formatNumber(obj.totalInc);

      if (obj.percentage > 0) {
        document.querySelector(DOMStrings.percentageLabel).textContent = obj.percentage + '%';  
      } else {
        document.querySelector(DOMStrings.percentageLabel).textContent = '---';
      }
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

    if (input.value > 0 && !isNaN(input.value) && input.description !== '') {
      newItem = budgetCtrl.addItem(input.type, input.description, input.value);
      UICtrl.addListItem(newItem, input.type);
      UICtrl.clearFields();
      updateBudget();
      updatePercentages();
    }
  };

  var ctrlDeleteItem = function(event) {
    var idString = event.target.parentNode.parentNode.parentNode.parentNode.id;
    if (idString) {
      splitID = idString.split('-');

      var type = splitID[0];
      var ID = parseInt(splitID[1]);
  
      budgetCtrl.deleteItem(type, ID);
      UICtrl.deleteListItem(idString);
      updateBudget();
      updatePercentages();
    }
  };

  var updatePercentages = function () {
    budgetCtrl.calculatePercentages();
    var percentages = budgetCtrl.getPercentages();
    UICtrl.displayPercentages(percentages);
  };
  var updateBudget = function() {
     budgetCtrl.calculateBudget();
     var budget = budgetCtrl.getBudget();
     UICtrl.displayBudget(budget);
  };

  var setupEventListeners = function() {
    var DOM = UICtrl.getDomStrings();
    document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);
    document.addEventListener('keypress', function(event) {
      if (event.charCode === 13 || event.which === 13) {
        ctrlAddItem();
      };
    });

    document.querySelector(DOM.listContainer).addEventListener('click', ctrlDeleteItem);
  };

  return {
    init: function() {
      console.log('Application started');
      UICtrl.displayMonth();
      UICtrl.displayBudget({
        budget: 0,
        totalInc: 0,
        totalExp: 0,
        percentage: 0,
      })
      setupEventListeners();
    }
  }
})(budgetController, UIController);

controller.init();