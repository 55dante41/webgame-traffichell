//==============================================================================
// Base Class for game characters (player, enemies, collectibles etc.)
// Constructor
var GameObject = function() {
  this.x = 0;
  this.y = 0;
  this.sprite = 'images/default.png';
}

// Prototypal methods
GameObject.prototype.render = function() {
  // Renders the GameObject's sprite in the case
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}
GameObject.prototype.update = function() {
  // Default fallback method. Does nothing right now.
}
//==============================================================================
// Base Class for Game Controls (frame-reading, enemy-spawning, collectible-spawning etc.)
// Constructor
var ControlObject = function() {
  // Empty constructor
}

// Prototypal methods
ControlObject.prototype.update = function(dt) {
  // Default fallback method. Called every dt time interval tick.
  // Does nothing for now
}
//==============================================================================
// Enemy Class (is a subclass of GameObject)
// Constructor
var Enemy = function(x, y, speed, sprite, id) {
  //Call the superclass constructor
  GameObject.call(this);
  this.id = id;
  this.speed = speed;

  //Perform required/specific overrides
  this.x = x;
  this.y = y;
  this.sprite = sprite;
}

//Enemy extends/subclasses GameObject
Enemy.prototype = Object.create(GameObject.prototype);
Enemy.prototype.constructor = Enemy;

//Prototypal methods
Enemy.prototype.update = function(dt) {
  //Updates the enemy position with time. If the enemy goes off-screen
  //it gets auto-deleted
  //Params: dt = time difference between ticks
    this.x += 100*this.speed*dt;
    if(this.y == player.y && (player.x - this.x) < 60 && (player.x - this.x) > -60) {
      reset();
    }
    if(this.x > 600 || this.x < -200) {
      allEnemies.splice(allEnemies.indexOf(this), 1);      
    }
  };
//==============================================================================
//Player Class (is a subclass of GameObject)
//Constructor
var Player = function(x, y, sprite) {
  // Call superclass constructor
  GameObject.call(this);

  // Perform required/specific overrides
  this.x = x;
  this.y = y;
  this.sprite = sprite;
};

// Player extends/subclasses GameObject
Player.prototype = Object.create(GameObject.prototype);
Player.prototype.constructor = Player;

// Prototypal methods
Player.prototype.handleInput= function(direction) {
  // Handles the input action on the player object
  switch(direction) {
    case 'left':
      // move left
      if(this.x - 100 >= 0) {
        this.x -= 100;
      }
      break;
    case 'right':
      // move right
      if(this.x + 100 <= 410) {
        this.x += 100;
      }
      break;
    case 'up':
      // move up
      if(this.y==430) {
        if(this.y - 45 >= 0) {
          this.y -= 45;
        }
      } else {
        if(this.y - 85 >= 0) {
          this.y -= 85;
        }
      }
      break;
    case 'down':
      // move down
      if(this.y==385) {
        if(this.y + 45 <= 430) {
          this.y += 45;
        }
      } else {
        if(this.y + 85 <= 430) {
          this.y += 85;
        }
      }
      break;
    }
  }
//==============================================================================
// Game Control
var GameControl = function() {
  // Call superclass constructor
  ControlObject.call(this);

  this.currentFrame = 0;
  this.latestEnemyIndex = 0;
}

GameControl.prototype = Object.create(ControlObject.prototype);
GameControl.prototype.constructor = GameControl;

GameControl.prototype.spawnEnemies = function(enemyId) {
  var spawnDistribution = Math.random();
  if(enemyId == 0) {
    //Enemy is a bug. Bug occupies only grass tiles
    var enemyPositionX = -100;
    var enemyPositionY = 300;
    if(spawnDistribution > 0.5) {
      enemyPositionY = 385;
    }
    var enemy = new Enemy(enemyPositionX, enemyPositionY, 1, enemyBugSprite, this.latestEnemyIndex);
  } else if(enemyId == 1) {
    //Enemy is a blue car. Car occupies only stone tiles
    var enemyPositionX = -100;
    var enemyPositionY = 45;
    if(spawnDistribution < 0.33) {
      enemyPositionY = 215;
    } else if(spawnDistribution < 0.66) {
      enemyPositionY = 130;
    }
    var enemy = new Enemy(enemyPositionX, enemyPositionY, 2, enemyBlueCarSprite, this.latestEnemyIndex);
  }

  allEnemies.push(enemy);
  this.latestEnemyIndex++;
}
GameControl.prototype.update = function(dt) {
  this.currentFrame++;
  if(this.currentFrame % 60 == 0) {
    this.spawnEnemies(1);
  }
  if(this.currentFrame % 120 == 0) {
    this.spawnEnemies(0);
  }
}



//==============================================================================
// Game logic

var gameControl = new GameControl();

// allEnemies stores all visible Enemy objects. Enemies that go off the screen
// are removed from the array to save memory
var allEnemies = [];

// Sprites
var enemyBugSprite = 'images/enemy-bug.png';
var enemyBlueCarSprite = 'images/enemy-bluecar.svg';
var playerSprite = 'images/char-boy.png';

var player = new Player(400,430,playerSprite);

// Event listener which listens and filters the key presses
// and sends the keys to the Player object's handleInput() method.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});
