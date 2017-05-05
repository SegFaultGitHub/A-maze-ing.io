function setup() {
	var m = new maze(10, 10);
	while (!m.continueGeneration()) ;
	console.log(m);
}

function draw() {
	
}