var drops = [];
var numdrops = window.innerWidth*10;

//drop
var heightMin = 5;
var heightMax = 15;
var widthMin = 3;
var widthMax = 10;
var minSpeed = 8;
var maxSpeed = 12;

function setup() {
  createCanvas(window.innerWidth-20,window.innerHeight);
  for(var i = 0; i < numdrops; i++) {
    drops[i] = new Drop();
  }
  frameRate(50);
}

function draw() {
  background(0,0,0);
  for(var i = 0; i < numdrops; i++) {
    drops[i].show();
    drops[i].fall();
  }
}

function rand(x,y) {
  return floor(Math.random()*Math.abs(y-x+1)) + x;
}

function getColors(min, max) {
  colors = [];
  for(var i = 0; i < 4; i++) {
    colors[i] = rand(min,max);
  }
  return colors;
}

function getColorsSum(sum) {
  colors = getColors(0,255);
  i = 0;
  while(colors[0]+colors[1]+colors[2]+colors[3] < sum) {
    colors = getColors(i,255);
  }
  return colors;
}

function Drop() {
  this.x = rand(0,window.innerWidth);
  this.y = rand(-1000,-100);
  this.ySpeed = rand(minSpeed,maxSpeed);
  this.height = rand(heightMin,heightMax);
  this.width = rand(widthMin,widthMin);
  this.color = getColorsSum(60);

  this.show = function() {
    noStroke();
    fill(this.color[0],this.color[1],this.color[2],this.color[3]);
    rect(this.x,this.y,this.width,this.height);
  }
  this.fall = function() {
    this.y = this.y + this.ySpeed;
    if(this.y > 1000) {
      this.y = rand(-1000,-100);
    }
  }
}
