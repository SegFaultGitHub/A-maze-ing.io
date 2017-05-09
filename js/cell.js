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
    }
}