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
  
  Board.prototype.render = function() {
    this.matrix.forEach(function(row){
      console.log(row);
    });
  }
  
  Board.prototype.dup = function() {
    var board = this;
    var duped = new Board();
    duped.matrix = [];
    board.matrix.forEach(function(row){
      duped.matrix.push(row.slice(0));
    });
    return duped;
  }
  
  var Game = TicTacToe.Game = function(){
    this.board = new Board();
    this.player1 = new HumanPlayer("x", this);
    this.player2 = new ComputerPlayer("o", this);
  }
  
  Game.prototype.play = function() {
    this.player1.getMove();
  };
  
  Game.prototype.otherPlayer = function(currentPlayer){
    var game = this;
    if (currentPlayer === game.player1) {
      return game.player2;
    } else {
      return game.player1;
    }
  }
  
  var HumanPlayer = TicTacToe.HumanPlayer = function (mark, game) {
    this.mark = mark;
    this.game = game;
  };
  
  HumanPlayer.prototype.getMove = function(){
    var player = this;
    if (player.game.board.isWon()) {
      console.log(player.game.board.winner() + " won.");
      return;
    }
    var otherplayer = player.game.otherPlayer(player);
    player.game.board.render();
    READER.question("Enter x position of space:", function(xpos) {
      READER.question("Enter y position of space:", function(ypos){
        var xCoord = parseInt(xpos);
        var yCoord = parseInt(ypos);
        player.game.board.placeMark([xCoord, yCoord], player.mark);
        otherplayer.getMove();
      });
    });
  };
  
  var ComputerPlayer = TicTacToe.ComputerPlayer = function (mark, game) {
    this.mark = mark;
    this.game = game;
  };
  
  ComputerPlayer.prototype.getMove = function(){
    var player = this;
    if (player.game.board.isWon()) {
      console.log(player.game.board.winner() + " won.");
      return;
    }
    var possibleMoves = [];
    var winMove = null;
    for (var k = 0; k < player.game.board.matrix.length; k++) {
      for (var l = 0; l < player.game.board.matrix[0].length; l++) {
        if (player.game.board.matrix[k][l] === "_") {
          possibleMoves.push([l,k]);
        }
      }
    }
    for (var m = 0; m < possibleMoves.length; m++) {
      dupboard = player.game.board.dup();
      dupboard.placeMark(possibleMoves[m], player.mark);
      console.log(dupboard);
      if (dupboard.isWon()){
        winMove = possibleMoves[m];
      }
    }
    move = winMove || possibleMoves[0];
    
    var otherplayer = player.game.otherPlayer(player);
    console.log(possibleMoves);
    player.game.board.placeMark(move, player.mark);
    otherplayer.getMove();
  };
})(this);

var game = new this.TicTacToe.Game;
game.play();