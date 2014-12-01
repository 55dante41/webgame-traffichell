//Base Game Class for game characters (player, enemies, collectibles etc.)
var GameObject = function() {
  this.x = 0;
  this.y = 0;
  this.sprite = 'images/default.png';
}
GameObject.prototype = {
  render: function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
}

var Enemy = function(x, y, sprite) {
  GameObject.call(this);
  this.x = x;
  this.y = y;
  this.sprite = sprite;
}
Enemy.prototype = Object.create(GameObject.prototype);
Enemy.prototype.constructor = Enemy;
Enemy.prototype.update = function(dt) {
    this.x += 100*dt;
  };

var Player = function(x, y, sprite) {
    GameObject.call(this);
    this.x = x;
    this.y = y;
    this.sprite = sprite;
  };
Player.prototype = Object.create(GameObject.prototype);
Player.prototype.constructor = Player;
Player.prototype.update = function(dt) {
  //this.x += 5*dt;
};
Player.prototype.handleInput= function(direction) {
    switch(direction) {
      case 'left':
        if(this.x - 100 >= 0) {
        this.x -= 100;
      }
        break;
      case 'right':
        if(this.x + 100 <= 410) {
        this.x += 100;
      }
        break;
      case 'up':
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

// Enemies our player must avoid
//var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
//    this.sprite = 'images/enemy-bug.png';
//}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
//Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
//}

// Draw the enemy on the screen, required method for game
//Enemy.prototype.render = function() {
//    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
//}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [];
var enemyBugSprite = 'images/enemy-bug.png';
var playerSprite = 'images/char-boy.png';

var enemyBugPositionX =0;
var enemyBugPositionY = 300;
if(Math.random() > 0.5) {
  enemyBugPositionY = 385;
}
var enemy = new Enemy(enemyBugPositionX,enemyBugPositionY,enemyBugSprite);
allEnemies.push(enemy);

var player = new Player(0,430,playerSprite);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});
