/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, currentPlayer, roundScore, gamePlaying;

init();

document.querySelector('.btn-roll').addEventListener('click', function() {
  if (gamePlaying) {
    var dice = Math.floor(Math.random() * 6 + 1);
    var diceDom = document.querySelector('.dice');
  
    diceDom.src = 'img/dice-' + dice + '.png';
    diceDom.style.display = 'block';
  
    if (dice !== 1) {
      roundScore += dice;
      document.querySelector('#current-' + currentPlayer).textContent = roundScore;
    } else {
      changePlayer();
    }
  }
});

function changePlayer() {
  currentPlayer === 0 ? currentPlayer = 1 : currentPlayer = 0;
  roundScore = 0;

  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';

  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');

  document.querySelector('.dice').style.display = 'none';
}

document.querySelector('.btn-hold').addEventListener('click', function() {
  if (gamePlaying) {
    scores[currentPlayer] += roundScore;
    document.getElementById('score-' + currentPlayer).textContent = scores[currentPlayer];
  
    if (scores[currentPlayer] >= 100) {
      document.getElementById('name-' + currentPlayer).textContent = 'Winner';
      document.querySelector('.dice').style.display = 'none';
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


  document.getElementById('name-0').textContent = 'Player 1';
  document.getElementById('name-1').textContent = 'Player 2';

  document.querySelector('.dice').style.display = 'none';

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
