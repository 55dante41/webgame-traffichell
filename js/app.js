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
var GameControl = function() {
  this.currentFrame = 0;
  this.latestEnemyIndex = 0;
}

GameControl.prototype.spawnEnemies = function(enemyId) {
  var spawnDistribution = Math.random();
  if(enemyId == 0) {
    //Enemy is a bug. Bug occupies only grass tiles
    var enemyPositionX = -100;
    var enemyPositionY = 300;
    var enemySpeed = 3;
    var enemySprite = 'images/enemy-bug.png';
    if(spawnDistribution > 0.5) {
      enemyPositionY = 385;
    }
    var enemy = new Enemy(enemyPositionX, enemyPositionY, enemySpeed, enemySprite, this.latestEnemyIndex);
  } else if(enemyId == 1) {
    //Enemy is a blue car. Car occupies only stone tiles
    var enemyPositionX = -100;
    var enemyPositionY = 45;
    var enemySpeed = 4;
    var enemySprite = 'images/enemy-bluecar.svg';
    if(spawnDistribution < 0.33) {
      enemyPositionY = 215;
    } else if(spawnDistribution < 0.66) {
      enemyPositionX = 500;
      enemyPositionY = 130;
      enemySpeed = -4;
      enemySprite = 'images/enemy-bluecar-left.svg';
    }
    var enemy = new Enemy(enemyPositionX, enemyPositionY, enemySpeed, enemySprite, this.latestEnemyIndex);
  }

  allEnemies.push(enemy);
  this.latestEnemyIndex++;
}
GameControl.prototype.spawnCollectibles = function(collectibleId) {
  var spawnDistribution = Math.random();
  if(collectibleId == 0) {
    //
  } else if(collectibleId == 1) {

  } else if(collectibleId == 2) {

  }
}
GameControl.prototype.update = function(dt) {
  this.currentFrame++;
  if(this.currentFrame % 30 == 0) {
    this.spawnEnemies(1);
  }
  if(this.currentFrame % 40 == 0) {
    this.spawnEnemies(0);
  }
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
// Game logic
var gameControl = new GameControl();

// allEnemies stores all visible Enemy objects. Enemies that go off the screen
// are removed from the array to save memory
var allEnemies = [];

// Sprites
var enemyBugSprite = 'images/enemy-bug.png';
var enemyBlueCarRightSprite = 'images/enemy-bluecar.svg';
var enemyBlueCarLeftSprite = 'images/enemy-bluecar-left.svg';
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
