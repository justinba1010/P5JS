function Bullet(x,y,ySpeed,xSpeed) {
  this.x = x;
  this.y = y;
  this.ySpeed = ySpeed;
  this.xSpeed = xSpeed;

  this.alive = function() {
    return (x >= 0 && x < argWidth && y >= 0 && y < argHeight)
  }
}
