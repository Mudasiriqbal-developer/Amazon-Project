// DOM

let rock = document.querySelector('#rock');
let paper = document.querySelector('#paper');
let scissors = document.querySelector('#scissors');
let reset = document.querySelector('#reset');
let autoPlay = document.querySelector('#autoPlay');
let answer = document.querySelector('#answer');
let scor = document.querySelector('#scor');
let move = document.querySelector('#move');
let body = document.querySelector('body');


let score = JSON.parse(localStorage.getItem('score')) || {
    win: 0,
    losses: 0,
    ties:0,
  }

let result = '';
function selectRandom() {
  const randomNumber = Math.random();
  let computerMove = '';
  
  if (randomNumber < 1 / 3) {
    computerMove = 'rock';
  } else if (randomNumber < 2 / 3) {
    computerMove = 'paper';
  } else {
    computerMove = 'scissors';
  }
  return computerMove;
}


// Auto Play Setup.
let isAutoPlying = false;
let intervalId;
autoPlay.addEventListener('click', () => {
  AutoPlay();
function AutoPlay() {
  if(!isAutoPlying) {
    intervalId = setInterval(function() {
    const playerMove = selectRandom();
    playGame(playerMove);
    autoPlay.innerHTML = 'Stop';
    autoPlay.classList.add('is-stop');
  }, 1000);
  isAutoPlying = true;
  } else {
    clearInterval(intervalId);
    isAutoPlying = false;
  }
}
  autoPlay.innerHTML = 'Auto Play';
  autoPlay.classList.remove('is-stop');
});
  
function playGame(playerMove) {

  const computerMove = selectRandom();
  if(playerMove === 'scissors') {
    if (computerMove === 'rock') {
      result = 'You Lose';
    } else if (computerMove === 'paper') {
      result = 'You Win';
    } else if (computerMove === 'scissors') {
      result = 'Tie';
    } 
  } else if(playerMove === 'paper') {
      if (computerMove === 'rock') {
        result = 'You Win';
      } else if (computerMove === 'paper') {
        result = 'Tie';
      } else if (computerMove === 'scissors') {
        result = 'You Lose';
      } 
  } else if(playerMove === 'rock') {
      if (computerMove === 'rock') {
        result = 'Tie';
      } else if (computerMove === 'paper') {
        result = 'You Lose';
      } else if (computerMove === 'scissors') {
        result = 'You Win';
      } 
  }
  
  // Update Score
  if(result === 'You Win') {
    score.win += 1;
  } else if(result === 'You Lose') {
    score.losses += 1;
  } else if(result === 'Tie') {
    score.ties += 1;
  }

  // Show the Move Pic
  answer.innerHTML = `You 
    <img src="./PICs/${playerMove}-emoji.png" class="move-icone">
    <img src="./PICs/${computerMove}-emoji.png" class="move-icone">
    Computer`;
  scor.innerHTML = `Wins : ${score.win},  Losses : ${score.losses},  Ties : ${score.ties}`;
  move.innerHTML = `${result}`;
  
  reset.addEventListener('click', () => {
    score.win = 0;
    score.losses = 0;
    score.ties = 0;
    move.innerHTML = 'Click Any Button to show your Result here.'
    scor.innerHTML = `Wins : ${score.win}  Losses : ${score.losses}  Ties : ${score.ties}`;
    localStorage.removeItem('score');
  });

  localStorage.setItem('score', JSON.stringify(score));
}  

// Add EventListener on the Buttons.

rock.addEventListener('click', () => {
  playGame('rock');
});

paper.addEventListener('click', () => {
  playGame('paper');
});

scissors.addEventListener('click', () => {
  playGame('scissors');
});

body.addEventListener('keydown', (event) => {
  if(event.key === 'r') {
    playGame('rock');
  } else if(event.key === 'p') {
    playGame('paper');
  } else if(event.key === 's') {
    playGame('scissors');
  }
});