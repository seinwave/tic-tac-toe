import prompCreator from 'prompt-sync';
import chalk from 'chalk';

const prompt = prompCreator({ sigint: true });
const INITIAL_BOARD_STATE = ['', '', '', '', '', '', '', '', ''];

let boardState = INITIAL_BOARD_STATE;
let currentPlayer = 'X';

function updateCurrentPlayer() {
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function updateBoardState(choice) {
  boardState[choice - 1] = currentPlayer;
  updateCurrentPlayer();
  renderBoard(boardState);
  promptPlayer();
}

function renderBoard(boardState) {
  const [one, two, three, four, five, six, seven, eight, nine] = boardState;
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
