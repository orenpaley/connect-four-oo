

class Game {
  constructor(WIDTH, HEIGHT, board = [], currPlayer = 1, theme = []) {
    this.HEIGHT = HEIGHT;
    this.WIDTH = WIDTH
    this.board = board;
    this.currPlayer = currPlayer;
    this.theme = theme;
    this.handleClick = this.handleClick.bind(this);  
    this.startGame = this.startGame.bind(this);

  //   let currPlayer = 1; // active player: 1 or 2
  //   let board = []; // array of rows, each row is array of cells  (board[y][x])
  }

  startGame() {
    const button = document.querySelector('#start')

    button.addEventListener('click', (event) => {
    const p1Color = document.querySelector('#colorOne')
    const p2Color = document.querySelector('#colorTwo')
    let p1Selected = p1Color.options[p1Color.selectedIndex].value
    let p2Selected = p2Color.options[p2Color.selectedIndex].value
    this.theme = [p1Selected,p2Selected]
    this.deleteHTMLBoard()
    this.board = [];
    this.currPlayer = 1;
    this.makeBoard();
    this.makeHtmlBoard();
     })    
    }

  makeBoard() {
    board = []
    for (let y = 0; y < this.HEIGHT; y++) {
      board.push(Array.from({ length: this.WIDTH }));
    }

  }

  makeHtmlBoard() {
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
 
  placeInTable(y, x) {
    const piece = document.createElement('div');
    piece.classList.add('piece');
    piece.classList.add(`p${this.currPlayer}`);
    piece.style.backgroundColor = this.theme[`${this.currPlayer - 1}`]
    piece.style.top = -50 * (y + 2);
  
    const spot = document.getElementById(`${y}-${x}`);
    spot.append(piece);
  }

  deleteHTMLBoard() {
    let board = document.querySelector('#board');
      for (let y = this.WIDTH - 1; y>=0; y--) {
        try { board.children[y].remove()}
        finally {
          continue;
        }
      
       }
    }
  
  endGame(msg) {
    alert(msg);
    board = [];
  }

  handleClick(evt) {
    // get x from ID of clicked cell
    const x = +evt.target.id;

    // get next spot in column (if none, ignore click)
    const y = this.findSpotForCol(x);
    if (y === null) {
      return y;
    }
    // place piece in board and add to HTML table
    board[y][x] = this.currPlayer;
    this.placeInTable(y, x);
    // check for win
    const checkWin = this.checkForWin();
    if (checkWin) {
      return this.endGame(`Player ${this.currPlayer} won!`)
    }
    // check for tie
    if (board.every(row => row.every(cell => cell))) {
      return endGame('Tie!');
    }
    // switch players
    this.currPlayer = this.currPlayer === 1 ? 2 : 1;
  }

  findSpotForCol(x) {
    for (let y = this.HEIGHT - 1; y >= 0; y--) {
      try {
        // this is a strange behavior to me but it works, falsy values??
        if (!board[y][x]) {
          return y;
        }}
      catch {throw new Error('you need to start a new game!') }
      } 
    return null;
}
  checkForWin() {
    for (let y = 0; y < this.HEIGHT; y++) {
      for (let x = 0; x < this.WIDTH; x++) {
        // get "check list" of 4 cells (starting here) for each of the different
        // ways to win
        const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
        const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
        const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
        const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];
  
        // find winner (only checking each win-possibility as needed)
        if (this._win(horiz) || this._win(vert) || this._win(diagDR) || this._win(diagDL)) {
          return true;
        }
      }
    }
  }

  _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer
    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < this.HEIGHT &&
        x >= 0 &&
        x < this.WIDTH &&
        board[y][x] === this.currPlayer
    );
  }
}

const game = new Game(7,6);
game.startGame();
