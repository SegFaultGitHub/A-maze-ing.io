function Cell() {
	this.content = 0b0000;
	this.visited = false;
	this.color = color(0, 0, 0);

	this.setUp = function() {
		this.content |= 0b1000;
	};
	this.setDown = function() {
		this.content |= 0b0100;
	};
	this.setLeft = function() {
		this.content |= 0b0010;
	};
	this.setRight = function() {
		this.content |= 0b0001;
	};
	this.setVisited = function() {
		this.visited = true;
	};
}