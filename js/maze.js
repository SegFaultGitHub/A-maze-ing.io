function maze(width, height) {
	this.width = width;
	this.height = height;
	this.reset();

	this.reset = function() {
		this.cellArray = new Array(widht);
		for (var i = 0; i < this.width; i++) {
			this.cellArray = new Array(height);
			for (var j = 0; j < this.height; j++) {
				cellArray[i][j] = cell();
				console.log(cellArray[i][j]);
			}
		}
		this.path = [];
		path.push({
			x: random(this.width),
			y: random(this.height)
		});
	};

	this.continueGeneration = function() {

	};
}