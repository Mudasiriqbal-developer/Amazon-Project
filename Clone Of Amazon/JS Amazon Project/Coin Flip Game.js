let head = document.querySelector('#head');
let tail = document.querySelector('#tail');
let scor = document.querySelector('#score');
let answer = document.querySelector('#result');
let youSelect = document.querySelector('#youSelect');
let reset = document.querySelector('#reset');

// Load score from localStorage or set default
let score = JSON.parse(localStorage.getItem('score')) || {
  win: 0,
  lose: 0,
};

// Show initial score when page loads
scor.innerHTML = `You Win ${score.win}, Computer Win ${score.lose}`;

let result = '';

function randomSelect() {
  let random = Math.random();
  return random < 0.5 ? 'head' : 'tail';
}

function playGame(playerMove) {
  const computerMove = randomSelect();
  const coin = document.querySelector('#coin');

  // Reset animation
  coin.classList.remove('flip-head', 'flip-tail');
  void coin.offsetWidth; // restart animation

  // Animate coin based on computer result
  if (computerMove === 'head') {
    coin.classList.add('flip-head');
  } else {
    coin.classList.add('flip-tail');
  }

  // Show result after animation
  setTimeout(() => {
    if (playerMove === computerMove) {
      result = 'You Win.';
      score.win += 1;
    } else {
      result = 'You Lose.';
      score.lose += 1;
    }

    answer.innerHTML = `You Select ${playerMove}, Computer Select ${computerMove}, ${result}`;
    scor.innerHTML = `You Win ${score.win}, Computer Win ${score.lose}`;

    // Save updated score permanently
    localStorage.setItem('score', JSON.stringify(score));
  }, 1000);

  
}

// Reset button functionality
reset.addEventListener('click', () => {
  score.win = 0;
  score.lose = 0;

  // Update localStorage
  localStorage.setItem('score', JSON.stringify(score));

  // Update UI
  scor.innerHTML = `You Win ${score.win}, Computer Win ${score.lose}`;
  answer.innerHTML = `You Reset The Game`;
});

// Button clicks
head.addEventListener('click', () => {
  playGame('head');
  youSelect.innerHTML = `You Select: Head`;
});
tail.addEventListener('click', () => {
  playGame('tail');
  youSelect.innerHTML = `You Select: Tail`;
});
