(function (root){
   var Asteroids = root.Asteroids = (root.Asteroids || {});
   var Asteroid = Asteroids.Asteroid = function (pos, vel){
    Asteroids.MovingObject.call(this, pos, vel, Asteroid.RADIUS, Asteroid.COLOR);
   };

    Asteroid.inherits(Asteroids.MovingObject); 
    Asteroid.RADIUS = 20;
    Asteroid.COLOR = "gray";

    Asteroid.randomAsteroid = function(dimX, dimY){
      var y = Math.random() * dimY;
      var x = Math.random() * dimX;
     // var y = 250;
    //  var x = 250;
      var v = _randomVec();
      return new Asteroid([x, y], v);
    };

    function _randomVec(){
      var scale1 = 2;
      var scale2 = 2;
      return [Math.random() * scale1, Math.random() * scale2];
    }; // => [5, 7]


})(this);