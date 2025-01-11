let score = JSON.parse(localStorage.getItem('score')) || {wins: 0, losses: 0, ties: 0};

updateScoreElement();

const urlMoveIcon = {
  rock: 'https://i.ibb.co.com/xM18pDG/',
  paper: 'https://i.ibb.co.com/P1J5V33/',
  scissors: 'https://i.ibb.co.com/6XCTs2N/'
};

document.querySelector('.js-rock-button')
  .addEventListener('click', () => {
    playGame('rock');
});

document.querySelector('.js-paper-button')
  .addEventListener('click', () => {
    playGame('paper');
});

document.querySelector('.js-scissors-button')
  .addEventListener('click', () => {
    playGame('scissors');
});

document.querySelector('.js-autoplay-button')
  .addEventListener('click', () => {
    setAutoplay();
})

// solution for 12v
document.querySelector('.js-reset-button')
  .addEventListener('click', () => {
    resetScore();
})

// Keyboard shortcut to play game
document.body
  .addEventListener('keydown', (event) => {
    if (event.key === 'r' ) {
      playGame('rock');
    } else if ( event.key === 'p' ) {
      playGame('paper');
    } else if ( event.key === 's' ) {
      playGame('scissors');

      // solution for 12u
    } else if ( event.key === 'a' ) {
      setAutoplay();
      
      // solution for 12w
    } else if ( event.key === 'Backspace' ) {
      resetScore();
    }
});

function playGame(playerMove) {
  const computerMove = pickComputerMove();

  let result;
  
  if (playerMove === 'rock') {
    if (computerMove === 'rock') {
      result = 'Tie!';
    } else if (computerMove === 'paper') {
      result = 'You lose!'
    } else if (computerMove === 'scissors') {
      result = 'You win!'
    }

  } else if (playerMove === 'paper') {
    if (computerMove === 'rock') {
      result = 'You win!'
    } else if (computerMove === 'paper') {
      result = 'Tie!';
    } else if (computerMove === 'scissors') {
      result = 'You lose!'
    }

  } else if (playerMove === 'scissors') {
    if (computerMove === 'rock') {
      result = 'You lose!'
    } else if (computerMove === 'paper') {
      result = 'You win!'
    } else if (computerMove === 'scissors') {
      result = 'Tie!';
    }
  }

  if (result === 'You win!') {
    score.wins++;

  } else if (result === 'You lose!') {
    score.losses++;

  } else if (result === 'Tie!') {
    score.ties++;
  }

  localStorage.setItem('score', JSON.stringify(score));

  updateScoreElement();

  document.querySelector('.js-result').innerHTML = `${result}`;

  const moveElement = document.querySelector('.js-move')
    .innerHTML = `
    <p class="js-move text__move">
    You picked <img src="${urlMoveIcon[playerMove]}${playerMove}-emoji.png" class="icon__move"> - Computer picked <img src="${urlMoveIcon[computerMove]}${computerMove}-emoji.png" class="icon__move">
  </p>`;

  // console.log(urlMoveIcon.paper)
  
}

function updateScoreElement(message) {
  const scoreElement = document.querySelector('.js-score');
  
  if (message === 'reset') {
    scoreElement.innerHTML = 'Score has been reset!';

  } else {
    scoreElement.innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
  }
}

function pickComputerMove() {
  const randomNumber = Math.random();

  let computerMove;

  if (randomNumber > 0 && randomNumber < 1/3) {
    computerMove = 'rock';
  } else if (randomNumber >= 1/3 && randomNumber < 2/3) {
    computerMove = 'paper';
  } else {
    computerMove = 'scissors';
  }
  
  return computerMove;
}

let isAutoPlaying = false;
let intervalID; // setInterval() return number (ID)

function setAutoplay() {
  if (!isAutoPlaying) { // shorthand of autoPlaying === false
    intervalID = setInterval(function() {
      const playerMove = pickComputerMove();
      playGame(playerMove);
    }, 1000)

    document.querySelector('.js-autoplay-button')
      .innerHTML = 'Stop Playing';
      isAutoPlaying = true;
      
    } else {
      clearInterval(intervalID);
      document.querySelector('.js-autoplay-button')
        .innerHTML = 'Autoplay';
      isAutoPlaying = false;
    }
}

function resetScore() {
  score.wins = 0;
  score.losses = 0;
  score.ties = 0;
  localStorage.removeItem('score');
  updateScoreElement('reset');
}