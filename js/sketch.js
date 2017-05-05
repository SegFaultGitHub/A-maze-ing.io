function setup() {
	maze(10, 10);
	while (!maze.continuegeneration()) ;
	console.log(maze);
}

function draw() {
	
}