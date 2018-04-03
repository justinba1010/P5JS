function Ship() {
  this.x = argWidth/2-25;
  this.y = argHeight-50;

  this.xVector = -2;
  this.yVector = -2;

  this.width = 50;
  this.height = 50;


  this.draw = function() {
    fill("#FFFFFF");
    rect(this.x,this.y,50,50);
  }

  this.update = function() {
    if(this.x >= width-this.width && this.xVector > 0) {
      this.xVector = 0;
    }
    if(this.x <= 0 && this.xVector < 0) {
      this.xVector = 0;
    }
    if(this.y >= height-this.height && this.yVector > 0) {
        this.yVector = 0;
      }
      if(this.y <= 0 && this.yVector < 0) {
        this.yVector = 0;
      }

    this.x += this.xVector;
    this.y += this.yVector;
  }
}
