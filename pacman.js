// Setup initial game stats
var score = 0;
var lives = 2;
var powerPellets = 4;

// Define your ghosts here
var inky = {
  menu_option: '1',
  name: 'Inky',
  colour: 'Red',
  character: 'Shadow',
  edible: false
};

var blinky = {
  menu_option: '2',
  name: 'Blinky',
  colour: 'Cyan',
  character: 'Speedy',
  edible: false
};

var pinky = {
  menu_option: '3',
  name: 'Pinky',
  colour: 'Pink',
  character: 'Bashful',
  edible: false
};

var clyde = {
  menu_option: '4',
  name: 'Clyde',
  colour: 'Orange',
  character: 'Pokey',
  edible: false
};

// replace this comment with your four ghosts setup as objects
var ghosts = [];
ghosts.push(inky, blinky, pinky, clyde);

// Draw the screen functionality
function drawScreen() {
  clearScreen();
  setTimeout(function() {
    displayStats();
    displayMenu();
    displayPrompt();
  }, 10);
}

function clearScreen() {
  console.log('\x1Bc');
}

function displayStats() {
  console.log('Score: ' + score + '     Lives: ' + lives + '     Power-Pellets: ' + powerPellets);
}

function displayMenu() {
  console.log('\n\nSelect Option:\n');  // each \n creates a new line
  console.log('(d) Eat Dot');
  if (powerPellets >= 1) {
    console.log('(p) Eat Power-Pellet');
  }
  console.log('(1) Eat ' + ghosts[0].name + ' ' + displayEdible(ghosts[0]));
  console.log('(2) Eat ' + ghosts[1].name + ' ' + displayEdible(ghosts[1]));
  console.log('(3) Eat ' + ghosts[2].name + ' ' + displayEdible(ghosts[2]));
  console.log('(4) Eat ' + ghosts[3].name + ' ' + displayEdible(ghosts[3]));
  console.log('(q) Quit');
}

function displayPrompt() {
  if (lives <= 0) {
    console.log('\nYou ran out of lives!');
    process.exit();
  }
  // process.stdout.write is similar to console.log except it doesn't add a new line after the text
  process.stdout.write('\nWaka Waka :v '); // :v is the Pac-Man emoji.
}

// Menu Options
function eatDot() {
  console.log('\nChomp!');
  score += 10;
}

function eatGhost(ghost) {
  if (ghost.edible === false) {
    console.log('\nChomp! You ate the ' + ghost.colour + ' ghost '+ ghost.name + '! You lose a life!');
    lives -= 1;
  } else {
    console.log('\nChomp! You ate the ' + ghost.character + ' ghost '+ ghost.name + '!');
    score += 200;
    ghost.edible = false;
  }
}

function eatPowerPellet() {
  if (powerPellets <= 0) {
    console.log('\nNo Power-Pellets left!'); }
  else {
    score += 50;
    ghostsEdible();
    powerPellets -= 1;
  }
}

function ghostsEdible() {
  for (var i = 0; i < 4; i ++) {
  ghosts[i].edible = true; }
}

function displayEdible(ghost) {
  if (ghost.edible === false) {
    return '(inedible)';
  } else {
    return '(edible)';
  }
}

// Process Player's Input
function processInput(key) {
  switch(key) {
    case '\u0003': // This makes it so CTRL-C will quit the program
    case 'q':
      process.exit();
      break;
    case 'd':
      eatDot();
      break;
    case 'p':
      eatPowerPellet();
      break;
    case '1':
      eatGhost(ghosts[0]);
      break;
    case '2':
      eatGhost(ghosts[1]);
      break;
    case '3':
      eatGhost(ghosts[2]);
      break;
    case '4':
      eatGhost(ghosts[3]);
      break;
    default:
      console.log('\nInvalid Command!');
  }
}

//
// YOU PROBABLY DON'T WANT TO CHANGE CODE BELOW THIS LINE
//

// Setup Input and Output to work nicely in our Terminal
var stdin = process.stdin;
stdin.setRawMode(true);
stdin.resume();
stdin.setEncoding('utf8');

// Draw screen when game first starts
drawScreen();

// Process input and draw screen each time player enters a key
stdin.on('data', function(key) {
  process.stdout.write(key);
  processInput(key);
  setTimeout(drawScreen, 300); // The command prompt will flash a message for 300 milliseoncds before it re-draws the screen. You can adjust the 300 number to increase this.
});

// Player Quits
process.on('exit', function() {
  console.log('\n\nGame Over!\n');
});
