/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, currentPlayer, roundScore, gamePlaying, previousDice, sumToWin;

init();

document.querySelector('.btn-roll').addEventListener('click', function() {
  if (gamePlaying) {
    var dice = [0, 0];
    var diceDom = [];

    dice[0] = Math.floor(Math.random() * 6 + 1);
    diceDom[0] = document.querySelector('.dice-0');

    dice[1] = Math.floor(Math.random() * 6 + 1);
    diceDom[1] = document.querySelector('.dice-1');
  
    diceDom[0].src = 'img/dice-' + dice[0] + '.png';
    diceDom[0].classList.remove('hidden');

    diceDom[1].src = 'img/dice-' + dice[1] + '.png';
    diceDom[1].classList.remove('hidden');
  
    if (dice[0] !== 1 && dice[1] !== 1) {
      // change player if player rolls two 6 in a row
      previousDice = [dice[0], dice[1]];
      roundScore += dice[0] + dice[1];
      document.querySelector('#current-' + currentPlayer).textContent = roundScore;
    } else if (previousDice[0] !== 6 && previousDice[1] !== 6 && dice[0] !== 6 && dice[1] !== 6) {
      scores[currentPlayer] = 0;
      document.getElementById('score-' + currentPlayer).textContent = '0';
      changePlayer();
    } else {
      changePlayer();
    }
  }
});

function changePlayer() {
  currentPlayer === 0 ? currentPlayer = 1 : currentPlayer = 0;
  roundScore = 0;
  previousDice = [0, 0];

  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';

  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');

  document.querySelector('.dice-0').classList.add('hidden');
  document.querySelector('.dice-1').classList.add('hidden');
}

document.querySelector('.btn-hold').addEventListener('click', function() {
  if (gamePlaying) {
    scores[currentPlayer] += roundScore;
    document.getElementById('score-' + currentPlayer).textContent = scores[currentPlayer];
    
    if (scores[currentPlayer] >= Number(sumToWin)) {
      document.getElementById('name-' + currentPlayer).textContent = 'Winner';
      document.querySelector('.dice-0').classList.add('hidden');
      document.querySelector('.dice-1').classList.add('hidden');
      document.querySelector('.player-' + currentPlayer + '-panel').classList.add('winner');
      document.querySelector('.player-' + currentPlayer + '-panel').classList.remove('active');
  
      gamePlaying = false;
    } else {
      changePlayer();
    }
  }
});

document.querySelector('.btn-new').addEventListener('click', init);

function init() {
  currentPlayer = 0;
  roundScore = 0;
  scores = [0, 0];
  previousDice = [0, 0];
  gamePlaying = true;
  sumToWin = document.getElementById('sum-to-win').value;



  document.getElementById('name-0').textContent = 'Player 1';
  document.getElementById('name-1').textContent = 'Player 2';

  document.querySelector('.dice-0').classList.add('hidden');
  document.querySelector('.dice-1').classList.add('hidden');

  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';
  document.getElementById('score-0').textContent = '0';
  document.getElementById('score-1').textContent = '0';

  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');
  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('active');
  
  document.querySelector('.player-0-panel').classList.add('active');
}
