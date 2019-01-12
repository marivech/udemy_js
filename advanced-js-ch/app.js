// const Question = {
//   text: '',
//   options: [],
//   answer: 0,
//   constructor: (text, options, answer) => {
//     this.text = text;
//     this.options = options;
//     this.answer = parseInt(answer, 10);
//   },
//   show: function() {
//     console.log(this.text);
//     this.options.forEach((elm, i) => {
//       console.log(`${i} - ${elm}`);
//     });
//   }
// }

(function() {
  const Question = function(text, options, answer) {
    this.text = text;
    this.options = options;
    this.answer = parseInt(answer, 10);
  };
  
  Question.prototype.show = function() {
    console.log(this.text);
    this.options.forEach((elm, i) => {
      console.log(`${i} - ${elm}`);
    });
  };
  
  Question.prototype.getUserAnswer = function() {
    return parseInt(prompt(this.text));
  };
  
  Question.prototype.check = function() {
    if (this.getUserAnswer() === this.answer) {
      console.log('Yep!');
      return;
    }
    console.log('Noooooo!');
    return;
  };
  
  Question.prototype.startQuiz = function() {
    this.show();
    this.check();
  }
  
  var qtnPull = [
    new Question('What does the fox say?', ['oh man', 'af-af', 'meow'], 1),
    new Question('What does the cat say?', ['meow', 'af-af', 'oh man, give me the food'], 2),
    new Question('What does the fish say?', ['bip', 'bop', 'bip-bop'], 0),
  ];
  
  var qtnShow = Math.round(Math.random() * 2);
  qtnPull[qtnShow].startQuiz();
}());


