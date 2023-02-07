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

function updateCurrentPlayer() {
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function clearBoard() {
  return (boardState = ['', '', '', '', '', '', '', '', '']);
}

function checkForWinner() {
  return VICTORY_STATES.forEach((victoryState) => {
    const [position1, position2, position3] = victoryState;

    if (
      boardState[position1] !== '' &&
      boardState[position1] === boardState[position2] &&
      boardState[position2] === boardState[position3]
    ) {
      console.log(`VICTORY for ${currentPlayer}!`);
      newGame();
    }
  });
}

function newGame() {
  const input = prompt('Would you like play again?');

  if (input === 'y') {
    clearBoard();
    renderBoard();
    promptPlayer();
  }
}
('');
function updateBoardState(choice) {
  boardState[choice - 1] = currentPlayer;
  checkForWinner();
  updateCurrentPlayer();
  renderBoard(boardState);
  promptPlayer();
}

function renderBoard() {
  let [one, two, three, four, five, six, seven, eight, nine] = boardState;

  console.log(
    `
    ${chalk.magenta.underline.bold('THE BOARD')}
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

function promptPlayer() {
  const input = prompt(`${currentPlayer}, choose a square!  `);
  const choice = Number(input);

  if (typeof choice === 'number' && choice > 0 && choice < 10) {
    return updateBoardState(choice);
  } else {
    console.log('Invalid choice. Please choose a number between 1 and 9.');
    promptPlayer();
  }
}

renderBoard(boardState);
promptPlayer();

module.exports = {
  promptPlayer,
  renderBoard,
  updateBoardState,
  updateCurrentPlayer,
};
