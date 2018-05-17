var offset = 0;
var decay = 1;
var vectors = [[1,1],[1,-1],[-1,1],[-1,-1],[1,0],[0,1],[-1,0],[0,-1]];

function Ball(x,y,xVector,yVector,radius,colors) {
  this.x = x;
  this.y = y;
  this.xVector = xVector;
  this.yVector = yVector;
  this.colors = colors;
  this.radius = radius;

  this.decay = function(decay) {
    this.xVector *= decay;
    this.yVector *= decay;
  }

  this.draw = function() {
    noStroke();
    fill(this.colors[0],this.colors[1],this.colors[2],this.colors[3]);
    ellipse(this.x,this.y,2*this.radius,2*this.radius)
  }
  this.update = function() {
    if(this.x <= (offset+this.radius) || this.x >= (-offset+width-this.radius)) {
      this.xVector *= -(decay);
    }
    if(this.y <= (offset+this.radius) || this.y >= (-offset+height-this.radius)) {
      this.yVector *= -(decay);
    }
    this.x += this.xVector;
    this.y += this.yVector;
  }

  this.hitDetect = function(ball2) {
    dist = Math.pow(this.x - ball2.x,2) + Math.pow(this.y - ball2.y,2);
    dist = Math.floor(Math.pow(dist,0.5));
    dist += this.radius/3;

    if(dist < this.radius + ball2.radius) {
      a = this.xVector;
      b = this.yVector;
      this.xVector = ball2.xVector;
      this.yVector = ball2.yVector;
      ball2.xVector = a;
      ball2.yVector = b;
      this.update();
    }
  }
}
