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
  
  Question.prototype.startQuiz = function() {
    this.show();
    return this.check();
  }
  
  var qtnPull = [
    new Question('What does the fox say?', ['oh man', 'af-af', 'meow'], 1),
    new Question('What does the cat say?', ['meow', 'af-af', 'oh man, give me the food'], 2),
    new Question('What does the fish say?', ['bip', 'bop', 'bip-bop'], 0),
  ];
  
  let quizRes;
  let score = 0;

  while (quizRes !== -1) {
    const qtnShow = Math.round(Math.random() * 2);
    quizRes = qtnPull[qtnShow].startQuiz();
    score += quizRes >= 0 ? quizRes : 0;
    console.log(`Your score is ${score}`);
  }

  console.log('game stopped');
}());


