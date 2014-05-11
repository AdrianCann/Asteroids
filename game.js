(function (root){
   var Asteroids = root.Asteroids = (root.Asteroids || {});


   //Should asteroid take pos, vel as parameters?
   var Game = Asteroids.Game = function (ctx){
     this.ctx = ctx;


     numAsteroids = 10; //Change later
     this.asteroids = this.addAsteroids(numAsteroids);

     this.ship = new Asteroids.Ship([Game.DIM_X / 2, Game.DIM_Y / 2], [0,0]);
     this.bullets = [];
   };

   Game.DIM_X = 800;//connect this later to canvas size
   Game.DIM_Y = 600;
   Game.FPS = 30;

   Game.prototype.addAsteroids = function(numAsteroids) {
     var asteroids = [];
     for(var i = 0; i < numAsteroids; i++){
      asteroids.push(Asteroids.Asteroid.randomAsteroid(Game.DIM_X, Game.DIM_Y));
     };
     return asteroids;
   };

   Game.prototype.draw = function(){
     var game = this;
     game.ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);

     game.asteroids.forEach(function (asteroid){
       asteroid.draw(game.ctx);
     });

     game.ship.draw(game.ctx);

     game.bullets.forEach(function (bullet){
       bullet.draw(game.ctx);
     });
   };

   Game.prototype.move = function(){
     this.asteroids.forEach(function (asteroid){
       asteroid.move();
     });

     this.ship.move();

     this.bullets.forEach(function (bullet){
       bullet.move();
     });
   };

   Game.prototype.step = function(){

     //this.ship.power([-0.25, 0.25]);

     this.move();
     this.draw();
     this.checkCollisions();
     this.removeBullets();
	 		this.checkWin();

   };

  Game.prototype.start = function(){
    //console.log("This Ctx");
    //console.log(this.ctx);
    var game = this;
    //game.draw();
    key('down', function(){  game.ship.power([0, 0.25]); });

    key('up', function(){ game.ship.power([0, -0.25]); });

    key('right', function(){  game.ship.power([0.25, 0]); });

    key('left', function(){ game.ship.power([-0.25, 0]); });
    //key('b', game.ship.power([0, 0.25]));
    key('space', function(){ game.fireBullet(); });

    nIntervId = window.setInterval(game.step.bind(game), Game.FPS);


  }
  
  Game.prototype.checkWin = function(){
	  var game = this;
	  if(game.asteroids.length === 0){
		  game.stop();
		  alert("You Win!")
	  };
  };

  Game.prototype.checkCollisions = function(){
    var game = this;
    game.asteroids.forEach(function (asteroid){
      if(asteroid.isCollidedWith(game.ship)){
        game.stop();
        alert("Ship hit! Sorry, you lost!");
      };
    });
  };

  Game.prototype.stop = function(){
    clearInterval(nIntervId);
  };

  Game.prototype.fireBullet = function(){
    var bullet = this.ship.fireBullet();
    if(bullet){
      this.bullets.push(bullet);
    };
  };

  Game.prototype.removeBullets = function(){
    var destAsts = [];
    var updatedBullets = [];
    for(var i = 0; i < this.bullets.length; i++){
      var survived = true;
      var bullet = this.bullets[i];
      if(bullet.pos[0] || bullet.pos[1]){
        for(var j = 0; j < this.asteroids.length; j++){
          var asteroid = this.asteroids[j];
          if(bullet.isCollidedWith(asteroid)){
            survived = false;
            destAsts.push(asteroid);
          };

        };
      }
      else {
        survived = false;
      };

      if(survived){
        updatedBullets.push(bullet);
      }

    };

    this.bullets = updatedBullets;
    this.removeAsteroids(destAsts);
  };

  Game.prototype.removeAsteroids = function(destAsts){
    updatedAsteroids = [];
    for(var j = 0; j < this.asteroids.length; j++){
      var asteroid = this.asteroids[j];
      var idx = destAsts.indexOf(asteroid);
      if(idx === -1){
         updatedAsteroids.push(asteroid);
      }
    }
    this.asteroids = updatedAsteroids;
  }

})(this);