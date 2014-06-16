(function (root){
   var Asteroids = root.Asteroids = (root.Asteroids || {});

   //Should asteroid take pos, vel as parameters?
   var Ship = Asteroids.Ship = function (pos, vel){
    Asteroids.MovingObject.call(this, pos, vel, Ship.RADIUS, Ship.COLOR);
    // console.log("thiss pos:");
    // console.log(this.pos);
    // console.log("thiss :");
    // console.log(this);


    };

   Ship.RADIUS = 15;
   Ship.COLOR = "blue";

   Ship.inherits(Asteroids.MovingObject);

   Ship.prototype.power = function(impulse){
     this.vel[0] += impulse[0];
     this.vel[1] += impulse[1];
   };

   Ship.prototype.fireBullet = function(){

     if(this.vel[0] !== 0 || this.vel[1] !== 0){

        var bVel = this.vel.slice(0);
        var bPos = this.pos.slice(0);


        var bullet = new Asteroids.Bullet(bVel, bPos);
        return bullet;
     }
     else{
       return null;
     };

   };
	 
   Ship.prototype.draw = function(ctx){

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
		 
		 
     ctx.fillStyle = "blue";
		 
		 this.drawAim(ctx);
   };
	 
	 Ship.prototype.drawAim = function(ctx) {
     ctx.fillStyle = "red"
     ctx.beginPath();
		 
		 var angle = Math.atan(this.vel[1]/this.vel[0])
		 
		 if (this.vel[0] < 0) {
			 //when going left
		 	var x_pos = this.pos[0] - (this.rad * Math.cos(angle))
			var y_pos = this.pos[1] - (this.rad * Math.sin(angle))
		 } else {
		 	var x_pos = this.pos[0] + (this.rad * Math.cos(angle))
			var y_pos = this.pos[1] + (this.rad * Math.sin(angle))
		 };
		 
		 
		 
     ctx.arc(
       x_pos,
       y_pos,
       (this.rad * .2),
       0, 
       2 * Math.PI,
       false
     );
     ctx.fill();
		 
		 
     ctx.fillStyle = "red";
	 };
	 



})(this);