function Cell() {
    this.content = 0b0000;
    this.visited = false;
	this.r = 0;
	this.g = 0;
	this.b = 0;

    this.setColor = function(r, g, b) {
        this.r = r;
		this.g = g;
		this.b = b;
    }

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

    this.isUp = function() {
        return (this.content & 0b1000) !== 0;
    };
    this.isDown = function() {
        return (this.content & 0b0100) !== 0;
    };
    this.isLeft = function() {
        return (this.content & 0b0010) !== 0;
    };
    this.isRight = function() {
        return (this.content & 0b0001) !== 0;
    };

    function drawShape(shape) {
        switch (shape) {
            case "t":
                rect(0, 10, 100, 80);
                rect(10, 10, 80, 90);
                break;
            case "cross":
                rect(10, 0, 80, 100);
                rect(0, 10, 100, 80);
                break;
            case "impasse":
                rect(10, 10, 80, 90);
                break;
            case "straight":
                rect(10, 0, 80, 100);
                break;
            case "corner":
                rect(10, 10, 80, 100);
                rect(10, 10, 100, 80);
                break;

        }
    }

    function place(angle, x, y, cellSize) {
        var s = cellSize / 100;
        switch (angle) {
            case 90:
                translate(x + cellSize, y);
                scale(s);
                rotate(PI / 2);
                break;
            case -90:
                translate(x, y + cellSize);
                scale(s);
                rotate(-PI / 2);
                break;
            case 180:
                translate(x + cellSize, y + cellSize);
                scale(s);
                rotate(PI);
                break;
            case 0:
                translate(x, y);
                scale(s)
                break;
        }
    }

    this.draw = function(x, y, cellSize) {
        push();
        fill(color(this.r, this.g, this.b));
        var scale = cellSize / 100;
        switch (this.content) {
            case 0b0000:
                break;
            case 0b1100:
                place(0, x, y, cellSize);
                drawShape("straight");
                break;
            case 0b0011:
                place(90, x, y, cellSize);
                drawShape("straight");
                break;
            case 0b1010:
                place(180, x, y, cellSize);
                drawShape("corner");
                break;
            case 0b0110:
                place(90, x, y, cellSize);
                drawShape("corner");
                break;
            case 0b1001:
                place(-90, x, y, cellSize);
                drawShape("corner");
                break;
            case 0b0101:
                place(0, x, y, cellSize);
                drawShape("corner");
                break;
            case 0b1000:
                place(180, x, y, cellSize);
                drawShape("impasse");
                break;
            case 0b0100:
                place(0, x, y, cellSize);
                drawShape("impasse");
                break;
            case 0b0010:
                place(90, x, y, cellSize);
                drawShape("impasse");
                break;
            case 0b0001:
                place(-90, x, y, cellSize);
                drawShape("impasse");
                break;
            case 0b1111:
                place(0, x, y, cellSize);
                drawShape("cross");
                break;
            case 0b1110:
                place(90, x, y, cellSize);
                drawShape("t");
                break;
            case 0b1101:
                place(-90, x, y, cellSize);
                drawShape("t");
                break;
            case 0b1011:
                place(180, x, y, cellSize);
                drawShape("t");
                break;
            case 0b0111:
                place(0, x, y, cellSize);
                drawShape("t");
                break;
            default:
                return;
        }
        pop();
    }
}
