//Zombies Game
//`~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`

//Pieces to the Game 

//Top-down shooter

//Zombies
    //soldier   
    //type:hp,damage output
//Entry points for zombies
//Currency == Points
//Weapons
    //Randomized weapon crate
    //Set damage output
    //Upgradeable
        //Upgrae Machine
//Background images for map layout
//Keys to the sections of the map
//Objects for inventory    
    //Perks
        //Double Points
        //Ammo refill

//`~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`

/*Gameplay

10 waves of zombies including the Boss 
Round 1 
    Start with a basic weapon
        Damage output is set t   o 
    Hero's health is fixed at 100
        Health is regenable over a fixed period of time
            Begin regen at 3 seconds
            Refill takes 3 seconds
    Zombies health is 50
    
First wave zombies begin to come 
    Start with 10
    Each kill is 100 points 
    Every 500 points gained within 5 seconds drops a perk
    Only the first map (of 5) is available 
    At end of round a key to the next map will appear

    Round 2 
Begin in the newly discovered map to the north of the main map
Begin the round with 15 zombies
    Zombie health is set to 75
    Zombie begin to move faster
New map now has the randomized weapon crate
    Player has 5 weapon rolls per 2 minutes
The first perk is found on this map  

Round 3 
Zombie count goes to 25
    Zombie health is set to 85 
Map to the east of the main map becomes available
The second perk is now available 
At the end of the round the key to the map in the bottom of the main map

Round 4
The south map becomes available
Zombie count goes to 35
    Zombie health is now fixed to 90 
        Zombies move faster
The upgrade machine is discovered but is locked until round 5 is complete
At the end of the round the final map key is rewarded

Round 5
The west map is open
The last perk is now avialable
Zombie count is now 45
    The first two Champions appear
        Champion health is fixed to 200
            One champion spawns durning the round
            The speed of the champion fluxuate 
            Damage output is doubled from the soldier damage 

At the end of the round the upgrade machine becomes ready to use 

Round 6
*/
var c = null;
var gameMap = [
	0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 2, 4, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 2, 5, 0,
	0, 2, 3, 4, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 2, 2, 0,
	0, 2, 3, 1, 4, 4, 1, 1, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 0,
	0, 2, 3, 1, 1, 4, 4, 1, 2, 3, 3, 2, 1, 1, 2, 1, 0, 0, 0, 0,
	0, 2, 2, 2, 2, 2, 2, 2, 6, 3, 3, 6, 2, 2, 2, 1, 1, 1, 1, 0,
	0, 1, 1, 1, 1, 2, 4, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 0,
	0, 1, 1, 1, 1, 2, 4, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 0,
	0, 1, 1, 1, 1, 2, 4, 4, 4, 4, 4, 1, 1, 1, 2, 2, 2, 2, 1, 0,
	0, 1, 1, 1, 1, 2, 3, 2, 1, 1, 4, 1, 1, 1, 1, 3, 3, 2, 1, 0,
	0, 1, 2, 2, 2, 2, 1, 2, 1, 1, 4, 1, 1, 1, 1, 1, 3, 2, 1, 0,
	0, 1, 2, 3, 3, 2, 1, 2, 1, 1, 4, 4, 4, 4, 4, 4, 4, 2, 4, 4,
	0, 1, 2, 3, 3, 2, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 0,
	0, 1, 2, 3, 4, 2, 6, 2, 1, 1, 1, 1, 1, 1, 1, 0, 1, 2, 1, 0,
	0, 3, 2, 3, 4, 4, 1, 2, 2, 2, 2, 2, 2, 2, 1, 0, 1, 2, 1, 0,
	0, 3, 2, 3, 4, 4, 3, 2, 1, 1, 1, 1, 1, 2, 1, 1, 1, 2, 3, 0,
	0, 3, 2, 3, 4, 1, 3, 2, 1, 3, 1, 1, 1, 2, 1, 1, 1, 2, 3, 0,
	0, 1, 2, 2, 2, 2, 2, 2, 3, 3, 3, 1, 1, 2, 2, 2, 2, 2, 3, 0,
	0, 1, 1, 1, 1, 1, 1, 3, 3, 3, 3, 3, 1, 1, 1, 1, 1, 1, 4, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
];

var tileW = 40;
var tileH = 40;
var mapW = 20;
var mapH = 20;
var currentSecond = 0;
var frameCount = 0;
var framesLastSecond = 0;
var lastFrameTime = 0;

var floorTypes = {
	solid: 0,
	path: 1,  
	water: 2,
	win: 3,
	lose:6
};

var tileTypes = {
	0:{color:"#685b48", floor:floorTypes.solid},
	1:{color:"#5aa457", floor:floorTypes.path},
	2:{color:"#e8bd7a", floor:floorTypes.path},
	3:{color:"#286625", floor:floorTypes.solid},
	4:{color:"#678fd9", floor:floorTypes.water},
	5:{color:"#f6cb07", floor:floorTypes.win},
	6:{color:"#e8bd7a", floor:floorTypes.lose}
};

var viewport = {
	screen: [0,0],
	startTile: [0,0],
	endTile: [0,0],
    offset: [0,0],
    update: function (px, py) {
		this.offset[0] = Math.floor((this.screen[0] / 2) - px);
		this.offset[1] = Math.floor((this.screen[1] / 2) - py);

		var tile = [
			Math.floor(px / tileW),
			Math.floor(py / tileH)
		];

		this.startTile[0] = tile[0] - 1 - Math.ceil((this.screen[0] / 2) / tileW);
		this.startTile[1] = tile[1] - 1 - Math.ceil((this.screen[1] / 2) / tileH);

		if (this.startTile[0] < 0) {
			this.startTile[0] = 0;
		};
		if (this.startTile[1] < 0) {
			this.startTile[1] = 0;
		};

		this.endTile[0] = tile[0] + 1 + Math.ceil((this.screen[0] / 2) / tileW);
		this.endTile[1] = tile[1] + 1 + Math.ceil((this.screen[1] / 2) / tileH);

		if (this.endTile[0] >= mapW) {
			this.endTile[0] = mapW - 1;
		};
		if (this.endTile[1] >= mapH) {
			this.endTile[1] = mapH - 1;
		};
	}
};

var keysDown = {
	37 : false,
	38 : false,
	39 : false,
	40 : false
};

var player = new Character();

function Character() {
	this.tileFrom = [1,1];
	this.tileTo	= [1,1];
	this.timeMoved = 0;
	this.dimensions	= [30,30];
	this.position = [45,45];
	this.delayMove = 200;
}

Character.prototype.placeAt = function(x, y) {
	this.tileFrom = [x,y];
	this.tileTo	= [x,y];
	this.position = [((tileW * x) + ((tileW - this.dimensions[0]) / 2)),
		((tileH * y) + ((tileH - this.dimensions[1]) / 2))];
};

Character.prototype.processMovement = function(t) {
	if(this.tileFrom[0] == this.tileTo[0] && this.tileFrom[1] == this.tileTo[1]) { 
		return false; 
	}

	if((t-this.timeMoved) >= this.delayMove)
	{
		this.placeAt(this.tileTo[0], this.tileTo[1]);
	}
	else
	{
		this.position[0] = (this.tileFrom[0] * tileW) + ((tileW-this.dimensions[0])/2);
		this.position[1] = (this.tileFrom[1] * tileH) + ((tileH-this.dimensions[1])/2);

		if(this.tileTo[0] != this.tileFrom[0])
		{
			var diff = (tileW / this.delayMove) * (t-this.timeMoved);
			this.position[0]+= (this.tileTo[0]<this.tileFrom[0] ? 0 - diff : diff);
		}
		if(this.tileTo[1] != this.tileFrom[1])
		{
			var diff = (tileH / this.delayMove) * (t-this.timeMoved);
			this.position[1]+= (this.tileTo[1]<this.tileFrom[1] ? 0 - diff : diff);
		}

		this.position[0] = Math.round(this.position[0]);
		this.position[1] = Math.round(this.position[1]);
	}

	return true;
};

var newgame = document.getElementById("ng").style.display = "none";
// newgame.addEventListener('click', newGame);
// function newGame() {
// 	if (newgame) {
// 		drawGame();
// 	}
// };

Character.prototype.canMoveTo = function(x, y) {
	//checks for win box collision
	console.log(tileTypes[gameMap[toIndex(x , y)]].floor);

	var win = document.getElementById('wol');
	if(tileTypes[gameMap[toIndex(x , y)]].floor == floorTypes.win) {
		win.innerText = "You Win"
		this.canMoveTo = false;
		newgame.style.display = "visable";
	}

	var lose = document.getElementById('wol');
	if(tileTypes[gameMap[toIndex(x , y)]].floor == floorTypes.lose) {
		lose.innerText = "You Lose";		
		this.canMoveTo = false; 
		newgame.style.display = "visable";
	}

	if(x < 0 || x >= mapW || y < 0 || y >= mapH) {
		return false; 
	}
	if(tileTypes[gameMap[toIndex(x , y)]].floor != floorTypes.path) {
		return false; 
	}
	
	return true;
};
  
Character.prototype.canMoveUp = function() {
	 return this.canMoveTo(this.tileFrom[0], this.tileFrom[1] - 1); 
};
Character.prototype.canMoveDown = function() { 
	return this.canMoveTo(this.tileFrom[0], this.tileFrom[1] + 1); 
};
Character.prototype.canMoveLeft = function() { 
	return this.canMoveTo(this.tileFrom[0] - 1, this.tileFrom[1]); 
};
Character.prototype.canMoveRight = function() { 
	return this.canMoveTo(this.tileFrom[0] + 1, this.tileFrom[1]); 
};
Character.prototype.moveLeft = function(t) { 
	this.tileTo[0] -= 1; this.timeMoved = t; 
};
Character.prototype.moveRight = function(t) { 
	this.tileTo[0] += 1; this.timeMoved = t; 
};
Character.prototype.moveUp	= function(t) { 
	this.tileTo[1] -= 1; this.timeMoved = t; 
};
Character.prototype.moveDown = function(t) { 
	this.tileTo[1] += 1; this.timeMoved = t; 
};

function toIndex(x, y)
{
	return((y * mapW) + x);
}

window.onload = function() {
	c = document.getElementById('canvas').getContext("2d");
	requestAnimationFrame(drawGame);

	window.addEventListener("keydown", function(e) {
		if (e.keyCode>=37 && e.keyCode <= 40) { 
			keysDown[e.keyCode] = true; 
		}
	});

	window.addEventListener("keyup", function(e) {
		if (e.keyCode>=37 && e.keyCode <= 40) { 
			keysDown[e.keyCode] = false; 
		}
	});

	viewport.screen = [
		document.getElementById('canvas').width,
		document.getElementById('canvas').height
	];    
};

function drawGame()
{
	if (c == null) { 
		return; 
	}

	var currentFrameTime = Date.now();
	var timeElapsed = currentFrameTime - lastFrameTime;

	var sec = Math.floor(Date.now() / 1000);
	if(sec != currentSecond)
	{
		currentSecond = sec;
		framesLastSecond = frameCount;
		frameCount = 1;
	}
	else { 
		frameCount++; 
	}

	if (!player.processMovement(currentFrameTime))
	{
		if(keysDown[38] && player.canMoveUp()) { 
			player.moveUp(currentFrameTime); 
		}
		else if(keysDown[40] && player.canMoveDown()) { 
			player.moveDown(currentFrameTime); 
		}
		else if(keysDown[37] && player.canMoveLeft()) { 
			player.moveLeft(currentFrameTime); 
		}
		else if(keysDown[39] && player.canMoveRight()) { 
			player.moveRight(currentFrameTime); 
		}
	}

	viewport.update(
		player.position[0] + (player.dimensions[0] / 2),
		player.position[1] + (player.dimensions[1] / 2)
	);

	c.fillStyle = '#00b9b0';
	c.fillRect(0, 0, viewport.screen[0], viewport.screen[1]);

	for(var y = viewport.startTile[1]; y <= viewport.endTile[1]; ++y)
	{
		for(var x = viewport.startTile[0]; x <= viewport.endTile[0]; ++x)
		{
			c.fillStyle = tileTypes[gameMap[toIndex(x,y)]].color;

			c.fillRect(viewport.offset[0] + x * tileW, viewport.offset[1] + y * tileH, tileW, tileH);
		}
	}

	c.fillStyle = "#0000cc";
	c.fillRect(viewport.offset[0] + player.position[0], viewport.offset[1] + player.position[1],player.dimensions[0], player.dimensions[1]);	

	lastFrameTime = currentFrameTime;
	
	requestAnimationFrame(drawGame);
}