(function (root){
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var MovingObject = Asteroids.MovingObject = function (pos, vel, rad, col){
    this.pos = pos;
    this.vel = vel;
    this.rad = rad;
    this.col = col;
  };

  MovingObject.prototype.move = function(){
    // pos += vel * dt
    this.pos[0] += this.vel[0];
    this.pos[1] += this.vel[1];
    this.wrapPosition();
  };

  MovingObject.prototype.draw = function(ctx){

    ctx.fillStyle = this.col;
    ctx.beginPath();


    ctx.arc(
      this.pos[0],
      this.pos[1],
      this.rad,
      0, 
      2 * Math.PI,
      false
    );
    ctx.fill();
  };


  MovingObject.prototype.isCollidedWith = function(otherObject){
    //compute distance between centers
    var dx = this.pos[0] - otherObject.pos[0];
    var dy = this.pos[1] - otherObject.pos[1];
    var dist = Math.sqrt((dx * dx) + (dy * dy));
    return (dist <= (this.rad + otherObject.rad));
  };

  MovingObject.prototype.wrapPosition = function(){
    dmX = Asteroids.Game.DIM_X;
    dmY = Asteroids.Game.DIM_Y;

    if(this.pos[0] < (0 - this.rad)){
      this.pos[0] = this.pos[0] + dmX + (2 * this.rad);
    }
    else if(this.pos[0] > (dmX + this.rad)){
      this.pos[0] = 0 - this.rad;
    };

    if(this.pos[1] < (0 - this.rad)){
      this.pos[1] = this.pos[1] + dmY + (2 * this.rad);
    }
    else if(this.pos[1] > (dmY + this.rad)){
      this.pos[1] = 0 - this.rad;
    };

  };


})(this);