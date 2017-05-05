function setup() {
	maze(10, 10);
	while (!maze.continueGeneration()) ;
	console.log(maze);
}

function draw() {
	
}