var maze;
var width, height;
var cellSize;
var player;

function setCanva() {
	width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
	height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
	var canva = createCanvas(width, height);
	canva.parent("canva");
	background(0);
}

function getMazeParams() {
	cellSize = Number(window.location.search.substring(1)) || 75;
	var dimensions = {
		width: Math.min(40, floor(width / cellSize)),
		height: Math.min(40, floor(height / cellSize)),
		cellSize: cellSize
	};
	var offset = {
		x: (width - dimensions.width * cellSize) / 2,
		y: (height - dimensions.height * cellSize) / 2
	};
	return {
		dimensions: dimensions,
		offset: offset
	}
}

function setup() {
	noStroke();
	setCanva();
	var params = getMazeParams();
	maze = new maze(params.dimensions, params.offset);
	player = new player();
}

function update() {
	player.update(maze);
	if (player.update(maze)) {
		player.reset();
		setCanva();
		var params = getMazeParams();
		maze.reset(params.dimensions, params.offset);
	}
}

function draw() {
	update();
	maze.draw();
	player.draw(maze.dimensions.cellSize, maze.offset);
}
