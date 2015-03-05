#Traffic Hell
Arcade game built for Udacity Front-End developer ND

###The Directory structure:
- css (directory to hold all stylesheets)
- fonts (directory to hold all font resources)
- images (directory to hold all image resources)
- js (directory to hold all scripts)
- index.html (main game file)
- readme.md (readme)

###How to start the game:
- Download and install the latest version of python (https://www.python.org/downloads/)
- Open cli and navigate to the game dir
- Run the command: "python -m SimpleHTTPServer 8000" if you have python 2.x installed
- Run the command: "python -m http.server 8000" if you have python 3.x installed
- Go to http://localhost:8000 in your browser to start the game
- Alternatively, the game can be started and played by simply opening 'index.html' in the main
  directory with a browser (eg. Google Chrome, Mozilla Firefox).

###How to play the game:
The main aim of the player is to survive in the traffic with highest possible
score. Hitting any of the natural traffic (bugs) or artificial traffic (cars)
resets the game. The player can gain score by collecting gems. Gems spawn
randomly all over the place and different colored gems have different value, so
it depends on the speed and luck of the player.

There is a safe zone on the bottom, where no traffic is present and no gems are
spawned. This is the best spot to land if you need to rest ;P

####Controls:
- UP arrow moves the player up
- LEFT arrow moves the player left
- RIGHT arrow moves the player right
- DOWN arrow moves the player down

The game is hosted at "http://devmaestro.github.io/games/survive/index.html"
for anyone to play.

###To be implemented soon:
- Leaderboard
- Improved graphics and visuals
- More bigger canvas
- Some modifications to game logic
