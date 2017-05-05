function maze(width, height) {
	this.width = width;
	this.height = height;
	this.cellArray = null;
	this.path = null;

	this.reset = function() {
		this.cellArray = new Array(width);
		for (var i = 0; i < this.width; i++) {
			this.cellArray[i] = new Array(height);
			for (var j = 0; j < this.height; j++) {
				this.cellArray[i][j] = new cell();
			}
		}
		this.path = [];
		this.path.push({
			x: floor(random(this.width)),
			y: floor(random(this.height))
		});
	};

	this.reset();

	this.pickcell = function(current) {
		toAdd = [
			{ x: current.x - 1, y: current.y },
			{ x: current.x + 1, y: current.y },
			{ x: current.x, y: current.y - 1 },
			{ x: current.x, y: current.y + 1 }
		];
		choices = Array();
		toAdd.forEach(function(vector) {
			if (vector.x >= 0 && vector.x < this.width && vector.y >= 0 && vector.y < this.height)
				if (!this.cellArray[vector.x][vector.y].visited) choices.push(vector);
		});
		if (choices.length === 0) return null;
		else return choices[floor(random(choices.length))];
	};

	this.continueGeneration = function() {
		if (this.path.length !== 0) {
			var current = this.path[this.path.length - 1];
			var next = this.pickcell(current);
			if (next === null) {
				this.path.pop();
				return this.continueGeneration();
			} else {
				this.cellArray[next.x][next.y].visited = true;
				this.path.push(next);
				if (next.x === current.x - 1) {
					this.cellArray[current.x][current.y].setLeft();
					this.cellArray[next.x][next.y].setRight();
				} else if (next.x === current.x + 1) {
					this.cellArray[current.x][current.y].setRight();
					this.cellArray[next.x][next.y].setLeft();
				} else if (next.y === current.y - 1) {
					this.cellArray[current.x][current.y].setUp();
					this.cellArray[next.x][next.y].setDown();
				} else if (next.y === current.y + 1) {
					this.cellArray[current.x][current.y].setDown();
					this.cellArray[next.x][next.y].setUp();
				}
				console.log("coucou");
			}
			return false;
		} else {
			return true;
		}
	};
}
