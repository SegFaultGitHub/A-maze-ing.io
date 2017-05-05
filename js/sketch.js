var maze;
var width, height;
var cellSize;

function setup() {
	noStroke();
	width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
	height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
	var canva = createCanvas(width, height);
	canva.parent("canva");
	background(0);
	cellSize = 50;
	maze = new maze(floor(width / cellSize), floor(height / cellSize), cellSize);
}

function draw() {
	maze.draw();
	if (maze.continueGeneration()) {
		background(0);
		maze.reset(floor(width / cellSize), floor(height / cellSize), cellSize);
	}
}
