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

            function polygon(x, y, radius, npoints) {
                var angle = TWO_PI / npoints;
                beginShape();
                for (var a = PI / 2, n = 0; n < npoints; n++, a += angle) {
                    var sx = x + cos(a) * radius;
                    var sy = y + sin(a) * radius;
                    vertex(sx, sy);
                }
                endShape(CLOSE);
            }

            this.draw = function(i, j, cellSize, offset) {
                push();
                fill(color(this.r, this.g, this.b));
                var s = cellSize / 100;
                var x = i * (cellSize) + offset.x;
                var y = j * (cellSize) + offset.y;
                if (j % 2 === 0) {
                    x += cellSize / 2;
                }
                translate(x, y);
                scale(s);
                // fill(255);
                // rect(20, 20, 10, 10);
                // if (this.isUpLeft()) {
                //     fill(color(this.r, this.g, this.b));
                //     rect(20, 20, 10, 10);
                // }
                // fill(255);
                // rect(70, 20, 10, 10);
                // if (this.isUpRight()) {
                //     fill(color(this.r, this.g, this.b));
                //     rect(70, 20, 10, 10);
                // }
                // fill(255);
                // rect(85, 45, 10, 10);
                // if (this.isRight()) {
                //     fill(color(this.r, this.g, this.b));
                //     rect(85, 45, 10, 10);
                // }
                // fill(255);
                // rect(70, 70, 10, 10);
                // if (this.isDownRight()) {
                //     fill(color(this.r, this.g, this.b));
                //     rect(70, 70, 10, 10);
                // }
                // fill(255);
                // rect(20, 70, 10, 10);
                // if (this.isDownLeft()) {
                //     fill(color(this.r, this.g, this.b));
                //     rect(20, 70, 10, 10);
                // }
                // fill(255);
                // rect(5, 45, 10, 10);
                // if (this.isLeft()) {
                //     fill(color(this.r, this.g, this.b));
                //     rect(5, 45, 10, 10);
                // }
                rect(0, 0, 95, 95);
                pop();
            };
            break;
    }
}