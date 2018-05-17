
function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
}
var boundreallow = -2;
var boundrealhigh = 2;
var boundimaglow = -2;
var boundimaghigh = 2;
function draw() {
  background(255);
  for(var x = 0; x <= window.innerWidth; x+=3) {
    for(var y = 0; y <= window.innerHeight; y+=3) {
      var vx = map(x,0,window.innerWidth, boundreallow,boundrealhigh);
      var vy = map(y,0,window.innerHeight, boundimaglow,boundimaghigh);
      var zx = 0.0;
      var zy = 0.0;
      var tempx = 0.0;
      for(var n = 0; n < 50; n++) {
        if(zx*zx + zy*zy < 4) break;
        tempx = zx*zx - zy*zy - vx;
        zy = 2*zx*zy + vy;
        zx = tempx;
      }//for
      var c = color(map(n,0,100,0,255));
      fill(c);
      rect(x,y,x+3,y+3);
    }
  }
}
