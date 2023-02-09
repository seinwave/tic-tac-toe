import prompCreator from 'prompt-sync';
import chalk from 'chalk';

const prompt = prompCreator({ sigint: true });

const VICTORY_STATES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let boardState = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let turnCount = 1;

function updateCurrentPlayer() {
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function updateBoardState(choice) {
  turnCount++;
  boardState[choice - 1] = currentPlayer;
  checkBoard();
  updateCurrentPlayer();
  renderBoard();
  promptPlayer();
}

function clearBoard() {
  turnCount = 0;
  return (boardState = ['', '', '', '', '', '', '', '', '']);
}

function checkBoard() {
  VICTORY_STATES.forEach((victoryState) => {
    const [position1, position2, position3] = victoryState;

    if (
      boardState[position1] !== '' &&
      boardState[position1] === boardState[position2] &&
      boardState[position2] === boardState[position3]
    ) {
      renderBoard();
      console.log(`VICTORY for ${currentPlayer}!`);
      nextGame();
    }
  });
  if (turnCount > 9) {
    renderBoard();
    console.log("Cat's game! Nobody wins!");
    nextGame();
  }
}

function nextGame() {
  const input = prompt(`Would you like play again? (y/n)     `);

  if (input === 'y') {
    clearBoard();
    renderBoard();
    promptPlayer();
  } else if (input === 'n') {
    console.log('Thanks! Goobdye!');
    process.exit();
  } else console.log('Invalid choice. Please choose y or n.');
}

function renderBoard() {
  const [one, two, three, four, five, six, seven, eight, nine] = boardState;

  console.log(
    `
  ${chalk.magenta.underline.bold('*****TIC TAC TOE*****')}
        ${chalk.yellow('=========')}
        ${one === '' ? 1 : chalk.blue(one)} | ${
      two === '' ? 2 : chalk.blue(two)
    } | ${three === '' ? 3 : chalk.blue(three)}
        ---------
        ${four === '' ? 4 : chalk.blue(four)} | ${
      five === '' ? 5 : chalk.blue(five)
    } | ${six === '' ? 6 : chalk.blue(six)}
        ---------
        ${seven === '' ? 7 : chalk.blue(seven)} | ${
      eight === '' ? 8 : chalk.blue(eight)
    } | ${nine === '' ? 9 : chalk.blue(nine)}
        ${chalk.yellow('=========')}
        `
  );
}

function confirmQuit() {
  const input = prompt('Are you sure you want to quit? (y/n)     ');
  if (input === 'y') {
    console.log('Very well. Goodbye!');
    process.exit();
  } else if (input === 'n') {
    promptPlayer();
  } else console.log('Invalid choice. Please choose y or n.');
}

function isValidInput(choice) {
  if (
    typeof choice === 'number' &&
    choice > 0 &&
    choice < 10 &&
    boardState[choice - 1] === ''
  ) {
    return true;
  } else return false;
}

function promptPlayer() {
  const input = prompt(`${currentPlayer}, choose a square!     `);

  if (input === 'q') {
    return confirmQuit();
  } else {
    const choice = Number(input);
    if (isValidInput(choice)) {
      return updateBoardState(choice);
    } else {
      console.log(
        'Invalid choice. Please choose a number between 1 and 9, that has not already been selected.'
      );
      promptPlayer();
    }
  }
}

renderBoard();
promptPlayer();

module.exports = {
  promptPlayer,
  renderBoard,
  updateBoardState,
  updateCurrentPlayer,
};
