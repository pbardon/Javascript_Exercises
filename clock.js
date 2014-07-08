var Clock = function(shr, smin, ssec){
  this.hr = shr;
  this.min = smin;
  this.sec = ssec;
  
  this.tick = function (){
    var clock = this;
    setInterval(function(){ 
      clock.sec += 5;
      if (clock.sec > 60){
        clock.min += 1;
        clock.sec -= 60;
      }
      if (clock.min > 60){
        clock.hr += 1;
        clock.min -= 60;
      }
      if (clock.hr > 24){
        clock.hr -= 24;
      }
      console.log(clock.hr + ":" + clock.min + ":" + clock.sec); 
    }, 5000);
  };
};

var date = new Date();
var clock = new Clock(date.getHours(), date.getMinutes(), date.getSeconds());
clock.tick();
