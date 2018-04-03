var w = window.innerWidth;
var h = window.innerHeight;
var balls;
var offset = 25;
var vectin = 30;
var coef = .05;
var sizeMin = 3;
var sizeMax = 5;
//var numballs = Math.floor((window.innerWidth*window.innerHeight)/2/Math.pow((sizeMin+sizeMax)/2,Math.pow(sizeMine,1.5)));
var numballs = Math.floor(window.innerWidth*window.innerHeight/100/(sizeMin+sizeMax))

function setup() {
  createCanvas(w,h);
  balls = [];
  for(var i = 0; i < numballs; i++) {
    balls.push(new Ball(rand(offset,w-offset), rand(offset,h-offset), randVector(-vectin,vectin)*coef, randVector(-vectin,vectin)*coef, rand(sizeMin,sizeMax),[rand(30,255),rand(30,255),rand(30,255),rand(100,200)]));
  }
  frameRate(50);
}




function draw() {
  background(0);
  for(var i = 0; i < balls.length; i++) {
    balls[i].draw();
    balls[i].update();

    //Hit Detect
    for(var x = i; x < balls.length; x++) {
      balls[i].hitDetect(balls[x]);
    }
  }
}


function randVector(x,y) {
  z = rand(x,y);
  while(z == 0) {
    z = rand(x,y);
  }
  return z;
}
function rand(x,y) {
  return floor(Math.random()*Math.abs(y-x+1)) + x;
}
