var readline = require('readline');
var READER = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

(function (root) {
  var Hanoi = root.Hanoi = (root.Hanoi || {});
  
  var Game = Hanoi.Game = function() {
    this.stacks = [[3,2,1],[],[]];
  };
  
  Game.prototype.makeMove = function(from, to) {
    var froms = this.stacks[from - 1];
    var tos = this.stacks[to - 1];
    var disc = froms.pop();
    console.log("From:" + froms);
    console.log("To:" + tos);
    if (tos[0] === undefined || disc < tos[tos.length - 1]) {
      tos.push(disc);
    }
    else {
      console.log("Invalid move.");
      froms.push(disc);
    }
  };
  
  Game.prototype.getMove = function() {
    console.log("This is in GetMove stack 2:" + this.stacks[1]);
    console.log("This is in GetMove stack 3:" + this.stacks[2]);
    if (this.stacks[0].length === 0 && (this.stacks[1].length === 0 ||                                                  this.stacks[2].length === 0)){
      console.log("You won!");
      return;
    }
    var game = this;
    console.log(game);
    READER.question("Enter stack to move from :", function(from) {
      READER.question("Enter stack to move to :", function(to) {
        var f = parseInt(from);
        var t = parseInt(to);
        game.makeMove(f,t);
        game.getMove();
      });
    });
  };
  
  var playGame = Hanoi.playGame = function() {
    var game = new Game();
    game.getMove();
  };
  


})(this);

this.Hanoi.playGame();