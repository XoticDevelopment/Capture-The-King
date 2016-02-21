/*

Game By: Xotic
Twitter: https://twitter.com/XoticDevs
Github:https://github.com/XoticDevelopment / https://github.com/xot1c
Gitub Repo:https://github.com/XoticDevelopment/Capture-The-King
License: CC0 1.0 Universal
*/

// Canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 512;
canvas.height = 480;
document.body.appendChild(canvas);

// BGimg
var bgReady= false;
var bgImage = new Image();
bgImage.onload = function()
{
    bgReady = true;
};
bgImage.src = "img/bg.png";

// Heroimg
var heroReady = false;
var heroImage = new Image();
heroImage.onload = function()
{
   heroReady = true;
};
heroImage.src = "img/hero.png";

// Monsterimg
var monsterReady = false;
var monsterImage = new Image();
monsterImage.onload = function()
{
   monsterReady = true;
};
monsterImage.src = "img/monster.png";

// Objects
var hero =
{
speed: 200 // Moving through pixels ps (per second)
};
var monster = {};
var monstersCaught = 0;

// Keyboard
var keysDown = {};

addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
}, false);

// Cache Reset
var reset = function () {
	hero.x = canvas.width / 2;
	hero.y = canvas.height / 2;

	// Spawning
	monster.x = 32 + (Math.random() * (canvas.width - 64));
	monster.y = 32 + (Math.random() * (canvas.height - 64));
};

// Updates
var update = function (modifier) {
	if (38 in keysDown) { // Player holding up
		hero.y -= hero.speed * modifier;
	}
	if (40 in keysDown) { // Player holding down
		hero.y += hero.speed * modifier;
	}
	if (37 in keysDown) { // Player holding left
		hero.x -= hero.speed * modifier;
	}
	if (39 in keysDown) { // Player holding right
		hero.x += hero.speed * modifier;
	}

// Collision
  if (
  		hero.x <= (monster.x + 32)
  		&& monster.x <= (hero.x + 32)
  		&& hero.y <= (monster.y + 32)
  		&& monster.y <= (hero.y + 32)
  	) {
  		++monstersCaught;
  		reset();
  	}
  };

 // Render
var render = function () {
	if (bgReady) {
		ctx.drawImage(bgImage, 0, 0);
	}

	if (heroReady) {
		ctx.drawImage(heroImage, hero.x, hero.y);
	}

	if (monsterReady) {
		ctx.drawImage(monsterImage, monster.x, monster.y);
	}

 // Score
	ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.font = "24px Helvetica";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText("Kings Caught Trespassing | " + monstersCaught, 32, 32);
};

// Loops
var main = function () {
	var now = Date.now();
	var delta = now - then;

	update(delta / 1000);
	render();

	then = now;

	// Request repeat
	requestAnimationFrame(main);
};

// Browser Support for Rendering
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

// Game Launcher
var then = Date.now();
reset();
main();
