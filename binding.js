Function.prototype.myBind = function(obj){
  var cfun = this;
  var fun = function() {
    return cfun.apply(obj);
  }
  return fun;
}; 