var readline = require('readline');
var READER = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


function addNumbers(sum, numsLeft, completionCallback){
  if (numsLeft > 0) {
    READER.question("Please enter a new number", function(answer){
      sum += parseInt(answer);
      console.log("Partial sum: " + sum);
      addNumbers(sum, numsLeft - 1, completionCallback);
    });
  }
  if (numsLeft === 0) {
    completionCallback(sum);
    return;
  }
}

addNumbers(0, 4, function(response){
  console.log("Total sum:" + response);
  READER.close();
});
