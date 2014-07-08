var readline = require('readline');
var READER = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function askLessThan(el1, el2, callback) {
  READER.question(el1 + " < " + el2 + " ?", function(answer) {
    if (answer === 'yes') {
      callback(true);
    }
    else {
      callback(false);
    }
  });
}

function performSortPass(arr, i, madeAnySwaps, callback) {
  if (i < arr.length-1) {
    askLessThan(arr[i], arr[i + 1], function(lessThan){
      if (!lessThan){
        var temp = arr[i];
        arr[i] = arr[i + 1];
        arr[i + 1] = temp;
        madeAnySwaps = true;
      }
      performSortPass(arr, i + 1, madeAnySwaps, callback);
    });
  }
  else if (i === (arr.length - 1)) {
    callback(madeAnySwaps);
  }
}

var crazyBubbleSort = function(arr, sortCompletionCallback) {
  function sortPassCallback(madeAnySwaps){
    if (madeAnySwaps === true){
      performSortPass(arr, 0, false, sortPassCallback);
    } else {
      sortCompletionCallback(arr);
    }
  }
  sortPassCallback(true);
};

crazyBubbleSort([5,2,1,4,9], function(result){
  console.log(result);
});
