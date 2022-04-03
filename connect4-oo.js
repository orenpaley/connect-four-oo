

class Game {
  constructor(WIDTH, HEIGHT, board = [], currPlayer = 1) {
    this.HEIGHT = HEIGHT;
    this.WIDTH = WIDTH
    this.board = board;
    this.currPlayer = currPlayer
  //   let currPlayer = 1; // active player: 1 or 2
  //   let board = []; // array of rows, each row is array of cells  (board[y][x])
  }
  startGame() {
 console.log('start-t',this)
    this.makeBoard();
    this.makeHtmlBoard()
 
  }
  makeBoard() {
    console.log('makeB-t',this)
    board = []
    for (let y = 0; y < this.HEIGHT; y++) {
      board.push(Array.from({ length: this.WIDTH }));
    }
  }
  makeHtmlBoard() {
    console.log('makeHTML-t',this)
    const board = document.getElementById('board');
  
    // make column tops (clickable area for adding a piece to that column)
    const top = document.createElement('tr');
    top.setAttribute('id', 'column-top');
    top.addEventListener('click', this.handleClick);
  
    for (let x = 0; x < this.WIDTH; x++) {
      const headCell = document.createElement('td');
      headCell.setAttribute('id', x);
      top.append(headCell);
    }
  
    board.append(top);
  
    // make main part of board
    for (let y = 0; y < this.HEIGHT; y++) {
      const row = document.createElement('tr');
  
      for (let x = 0; x < this.WIDTH; x++) {
        const cell = document.createElement('td');
        cell.setAttribute('id', `${y}-${x}`);
        row.append(cell);
      }
  
      board.append(row);
    }
  }
 
  
  findSpotForCol(x) {
    console.log('find-spot:', this)
    for (let y = HEIGHT - 1; y >= 0; y--) {
      console.log('find-spot-y', i)
      if (!board[y][x]) {
        return y;
      }
    }
    return null;
  }

  placeInTable(y, x) {
    console.log('placeInTable-t', this)
    const piece = document.createElement('div');
    piece.classList.add('piece');
    piece.classList.add(`p${currPlayer}`);
    piece.style.top = -50 * (y + 2);
  
    const spot = document.getElementById(`${y}-${x}`);
    spot.append(piece);
  }

  endGame(msg) {
    console.log('end-game-t:', this)
    alert(msg);
  }

  handleClick(evt) {
    // get x from ID of clicked cell
    const x = +evt.target.id;
    console.log('handleClick:', this)
  
    // get next spot in column (if none, ignore click)
    const y = () => findSpotForCol(x);
    y();
    console.log('yes????:', y)
    if (y === null) {
      return y;
    }
   console.log('where am i:',this)
   console.log('y', y)
    // place piece in board and add to HTML table
    // board[y][x] = this.currPlayer;
    const place = () => this.placeInTable(y, x);
   
    
    // check for win
    const winCheck = () => {
      if (checkForWin()) {
      return endGame(`Player ${currPlayer} won!`);
    }
  }
    
    // check for tie
    if (board.every(row => row.every(cell => cell))) {
      return endGame('Tie!');
    }
      
    // switch players
    this.currPlayer = this.currPlayer === 1 ? 2 : 1;
  }
  checkForWin() {
    function _win(cells) {
      // Check four cells to see if they're all color of current player
      //  - cells: list of four (y, x) cells
      //  - returns true if all are legal coordinates & all match currPlayer
  
      return cells.every(
        ([y, x]) =>
          y >= 0 &&
          y < this.HEIGHT &&
          x >= 0 &&
          x < this.WIDTH &&
          board[y][x] === currPlayer
      );
    }
  
    for (let y = 0; y < this.HEIGHT; y++) {
      for (let x = 0; x < this.WIDTH; x++) {
        // get "check list" of 4 cells (starting here) for each of the different
        // ways to win
        const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
        const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
        const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
        const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];
  
        // find winner (only checking each win-possibility as needed)
        if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
          return true;
        }
      }
    }
  }
}

const game = new Game(7,6);
game.startGame()