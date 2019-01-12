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
    return prompt(this.text);
  };
  
  Question.prototype.check = function() {
    const userAnswer = this.getUserAnswer()
    if (parseInt(userAnswer) === this.answer) {
      console.log('Yep!');
      return 1;
    }

    if (userAnswer === 'exit') {
      return -1;
    }

    console.log('Noooooo!');
    return 0;
  };

  Question.prototype.displayScore = function(check, callback) {
    const res = check >= 0 ? callback(!!check) : callback(false);
    console.log(`Your current score is ${res}`);
  };

  Question.prototype.quiz = function(callback) {
    this.show();
    const checkRes = this.check();
    this.displayScore(checkRes, callback);
    return checkRes;
  };
  
  var qtnPull = [
    new Question('What does the fox say?', ['oh man', 'af-af', 'meow'], 1),
    new Question('What does the cat say?', ['meow', 'af-af', 'oh man, give me the food'], 2),
    new Question('What does the fish say?', ['bip', 'bop', 'bip-bop'], 0),
  ];
  
  let quizRes;

  function score() {
    let sc = 0;
    return function(correct) {
      if (correct) {
        sc++;
      }
      return sc;
    }
  }

  var keepScore = score();

  while (quizRes !== -1) {
    const qtnShow = Math.round(Math.random() * 2);
    quizRes = qtnPull[qtnShow].quiz(keepScore);
  }

  console.log('game stopped');
}());


