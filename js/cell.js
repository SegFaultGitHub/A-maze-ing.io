function Cell(format) {
    this.format = format;
    this.visited = false;
    this.r = 0;
    this.g = 0;
    this.b = 0;

    this.setColor = function(r, g, b) {
        this.r = r;
        this.g = g;
        this.b = b;
    };
    this.setVisited = function() {
        this.visited = true;
    };

    switch (format) {
        case "square":
            this.content = 0b0000;

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

            this.draw = function(x, y, cellSize) {
                push();
                fill(color(this.r, this.g, this.b));
                var s = cellSize / 100;
                translate(x, y);
                scale(s);
                rect(10, 10, 80, 80);
                if (this.isUp()) {
                    rect(10, 0, 80, 10);
                }
                if (this.isDown()) {
                    rect(10, 90, 80, 10);
                }
                if (this.isLeft()) {
                    rect(0, 10, 10, 80);
                }
                if (this.isRight()) {
                    rect(90, 10, 10, 80);
                }
                pop();
            };
            break;
        case "hexagonal":
            this.content = 0b000000;

            this.setUpLeft = function() {
                this.content |= 0b100000;
            };
            this.setUpRight = function() {
                this.content |= 0b010000;
            };
            this.setRight = function() {
                this.content |= 0b001000;
            };
            this.setDownRight = function() {
                this.content |= 0b000100;
            };
            this.setDownLeft = function() {
                this.content |= 0b000010;
            };
            this.setLeft = function() {
                this.content |= 0b000001;
            };

            this.isUpLeft = function() {
                return (this.content & 0b100000) !== 0;
            };
            this.isUpRight = function() {
                return (this.content & 0b010000) !== 0;
            };
            this.isRight = function() {
                return (this.content & 0b001000) !== 0;
            };
            this.isDownRight = function() {
                return (this.content & 0b000100) !== 0;
            };
            this.isDownLeft = function() {
                return (this.content & 0b000010) !== 0;
            };
            this.isLeft = function() {
                return (this.content & 0b000001) !== 0;
            };

            function hexagon(x, y) {
                beginShape();
                vertex(50, 5);
                vertex(95, 32);
                vertex(95, 68);
                vertex(50, 95);
                vertex(5, 68);
                vertex(5, 32);
                endShape(CLOSE);
            }

            this.draw = function(i, j, cellSize, offset) {
                push();
                var s = cellSize / 100;
                var x = i * cellSize + offset.x;
                var y = j * (0.7 * cellSize) + offset.y;
                if (j % 2 === 0) {
                    x += cellSize / 2;
                }
                translate(x, y);
                scale(s);
                if (!this.visited) {
                    fill(color(16));
                    hexagon(0, 0, 50, 6);
                } else {
                    fill(color(this.r, this.g, this.b));
                    hexagon(0, 0, 50, 6);
                    if (this.isUpLeft()) {
                        beginShape();
                        vertex(5, 32);
                        vertex(0, 30);
                        vertex(50, 0);
                        vertex(50, 5);
                        endShape(CLOSE);
                    }
                    if (this.isUpRight()) {
                        beginShape();
                        vertex(50, 5);
                        vertex(50, 0);
                        vertex(100, 30);
                        vertex(95, 32);
                        endShape(CLOSE);
                    }
                    if (this.isRight()) {
                        beginShape();
                        vertex(95, 32);
                        vertex(100, 30);
                        vertex(100, 70);
                        vertex(95, 68);
                        endShape(CLOSE);
                    }
                    if (this.isDownRight()) {
                        beginShape();
                        vertex(100, 70);
                        vertex(95, 68);
                        vertex(50, 95);
                        vertex(50, 100);
                        endShape(CLOSE);
                    }
                    if (this.isDownLeft()) {
                        beginShape();
                        vertex(0, 70);
                        vertex(50, 100);
                        vertex(50, 95);
                        vertex(5, 68);
                        endShape(CLOSE);
                    }
                    if (this.isLeft()) {
                        beginShape();
                        vertex(0, 30);
                        vertex(0, 70);
                        vertex(5, 68);
                        vertex(5, 32);
                        endShape(CLOSE);
                    }
                }
                // textSize(30);
                // fill(0);
                // text(i + "," + j, -30, 10);
                pop();
            };
            break;
    }
}
