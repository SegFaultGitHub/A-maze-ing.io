function maze(width, height, cellSize) {
	this.width = width;
	this.height = height;
	this.cellSize = cellSize;
	this.colors = [];

	this.reset = function(width, height, cellSize) {
		this.width = width;
		this.height = height;
		this.cellSize = cellSize;
		this.cellArray = new Array(width);
		for (var i = 0; i < this.width; i++) {
			this.cellArray[i] = new Array(height);
			for (var j = 0; j < this.height; j++) {
				this.cellArray[i][j] = new cell();
			}
		}
		this.path = [];
		var x = floor(random(this.width));
		var y = floor(random(this.height));
		this.path.push({
			x: x,
			y: y
		});
		this.cellArray[x][y].visited = true;

        var colorNumber = floor(random(3) + 2);
        this.colors = [];
        for (var i = 0; i < colorNumber; i++) {
            this.colors.push(color(floor(random(256)), floor(random(256)), floor(random(256))));
        }
	};

	this.reset(width, height, cellSize);

	this.pickcell = function(current) {
		toAdd = [
			{ x: current.x - 1, y: current.y },
			{ x: current.x + 1, y: current.y },
			{ x: current.x, y: current.y - 1 },
			{ x: current.x, y: current.y + 1 }
		];
		choices = Array();
		for (var i = 0; i < toAdd.length; i++) {
			var vector = toAdd[i];
			if (vector.x >= 0 && vector.x < this.width && vector.y >= 0 && vector.y < this.height)
				if (!this.cellArray[vector.x][vector.y].visited) choices.push(vector);
		}
		if (choices.length === 0) return null;
		else return choices[floor(random(choices.length))];
	};

	this.continueGeneration = function() {
		if (this.path.length !== 0) {
			var current = this.path[this.path.length - 1];
			var next = this.pickcell(current);

			var ratio = this.path.length / (this.width * this.height) * 10;
			ratio *= this.colors.length - 1;
			var end = this.colors[floor(ratio + 1) % this.colors.length];
			var start = this.colors[floor(ratio) % this.colors.length];
			ratio = ratio - floor(ratio);
			var r = floor((end._getRed() - start._getRed()) * ratio) + start._getRed();
			var g = floor((end._getGreen() - start._getGreen()) * ratio) + start._getGreen();
			var b = floor((end._getBlue() - start._getBlue()) * ratio) + start._getBlue();
			this.cellArray[current.x][current.y].setColor(r, g, b);

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
			}
			return false;
		} else {
			return true;
		}
	};

	this.draw = function() {
		for (var i = 0; i < this.width; i++) {
			for (var j = 0; j < this.height; j++) {
				this.cellArray[i][j].draw(i * cellSize, j * cellSize, cellSize / 100, cellSize);
			}
		}
	}
}
