(function (root) {
  
  var readline = require('readline');
  var READER = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
  var TicTacToe = root.TicTacToe = (root.TicTacToe || {});
  
  var Board = TicTacToe.Board = function(){
    this.matrix = [["_", "_", "_"],["_", "_", "_"],["_", "_", "_"]];
  };
  Board.prototype.isWon = function() {
    console.log("winner returns: " + this.winner());
    if (this.winner()) {
      return true;
    }
    else {
      return false;
    }
  };
  
  Board.prototype.winner = function() {
    for (var i = 0; i < this.matrix.length; i++) {
      if (this.matrix[i][0] !== "_" && this.matrix[i][0] === this.matrix[i][1] 
          && this.matrix[i][0] === this.matrix[i][2]) {
            return this.matrix[i][0];
      } else if (this.matrix[0][i] !== "_" && this.matrix[0][i] === this.matrix[1][i] 
          && this.matrix[0][i] === this.matrix[2][i]) {
            return this.matrix[0][i];
      } 
    }
    if (this.matrix[0][0] !== "_" && this.matrix[0][0] === this.matrix[1][1] 
      && this.matrix[0][0] === this.matrix[2][2]){
        return this.matrix[0][0];
    }
    else if (this.matrix[0][2] !== "_" && this.matrix[0][2] === this.matrix[1][1]
      && this.matrix[0][2] === this.matrix[2][0]){
        return this.matrix[0][2];
    }
    return false;
  };
  
  Board.prototype.isEmpty = function(pos){
    var x = pos[0];
    var y = pos[1];
    if (this.matrix[y][x] === "_"){
      return true;
    } else {
      return false;
    }
  };
  
  Board.prototype.placeMark = function(pos, mark){
    var x = pos[0];
    var y = pos[1];
    this.matrix[y][x] = mark;
  }
  
  var Game = TicTacToe.Game = function(){
    this.board = new Board();
    this.mark = "x"
  }
  
  Game.prototype.play = function() {
    var game = this;
    if (game.board.isWon()) {
      console.log(game.board.winner() + " won.");
      return;
    }
    console.log(game.board);
    READER.question("Enter x position of space:", function(xpos) {
      READER.question("Enter y position of space:", function(ypos){
        var xCoord = parseInt(xpos);
        var yCoord = parseInt(ypos);
        game.board.placeMark([xCoord, yCoord], game.mark);
        (game.mark === "x") ? game.mark = "o" : game.mark = "x";
        game.play();
      });
    });
  };
  
  var HumanPlayer = TicTacToe.HumanPlayer = function (mark, board) {
    this.mark = mark;
    this.board = board
  }

})(this);

var game = new this.TicTacToe.Game;
game.play();