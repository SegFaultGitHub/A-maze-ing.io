function Player() {
    this.reset = function() {
        this.path = [{
            x: 0,
            y: -1
        }, {
            x: 0,
            y: 0
        }];
        this.position = {
            x: 0,
            y: 0
        };
        this.canMove = false;
    };

    this.reset();

    this.update = function(maze, touch) {
        if (!this.canMove) {
            if (!isKeyPressed) this.canMove = true;
        } else {
            var up, down, left, right;
            if (touch.send) {
                var diff = {
                    x: touch.end.x - touch.start.x,
                    y: touch.end.y - touch.start.y
                };
                if (Math.abs(diff.x) > Math.abs(diff.y)) {
                    if (diff.x > 0) {
                        right = true;
                    } else {
                        left = true;
                    }
                } else {
                    if (diff.y > 0) {
                        down = true;
                    } else {
                        up = true;
                    }
                }
                console.log(diff);
            }
            var cell = maze.cellArray[this.position.x][this.position.y];
            if ((up || keyIsDown(UP_ARROW)) && cell.isUp() && (this.position.x !== 0 || this.position.y !== 0)) {
                this.position.y--;
                this.canMove = false;
            } else if ((down || keyIsDown(DOWN_ARROW)) && cell.isDown()) {
                if (this.position.x === maze.dimensions.width - 1 && this.position.y === maze.dimensions.height - 1) {
                    return true;
                }
                this.position.y++;
                this.canMove = false;
            } else if ((left || keyIsDown(LEFT_ARROW)) && cell.isLeft()) {
                this.position.x--;
                this.canMove = false;
            } else if ((right || keyIsDown(RIGHT_ARROW)) && cell.isRight()) {
                this.position.x++;
                this.canMove = false;
            }

            if (!this.canMove) {
                if (this.path[this.path.length - 2].x === this.position.x &&
                    this.path[this.path.length - 2].y === this.position.y) {
                    this.path.pop();
                } else {
                    this.path.push({
                        x: this.position.x,
                        y: this.position.y
                    });
                }
            }
        }
        return false;
    };

    this.drawPath = function(cellSize, offset) {
        var s = cellSize / 100;
        this.path.forEach(function(elt, index, array) {
            push();
            translate(
                elt.x * cellSize + offset.x,
                elt.y * cellSize + offset.y
            );
            scale(s);
            fill(color(0, 0, 0, 192));
            if (index !== 0) {
                var prev = array[index - 1];
                if (prev.x === elt.x - 1) {
                    rect(0, 30, 70, 40);
                } else if (prev.x === elt.x + 1) {
                    rect(30, 30, 70, 40);
                } else if (prev.y === elt.y - 1) {
                    rect(30, 0, 40, 70);
                } else if (prev.y === elt.y + 1) {
                    rect(30, 30, 40, 70);
                }
            } else {
                rect(30, 30, 40, 40);
            }
            if (index !== array.length - 1) {
                var next = array[index + 1];
                if (next.x === elt.x - 1) {
                    rect(0, 30, 30, 40);
                } else if (next.x === elt.x + 1) {
                    rect(70, 30, 30, 40);
                } else if (next.y === elt.y - 1) {
                    rect(30, 0, 40, 30);
                } else if (next.y === elt.y + 1) {
                    rect(30, 70, 40, 30);
                }
            } else {
                // rect(30, 30, 40, 40);
            }
            pop();
        });
    };

    this.draw = function(cellSize, offset) {
        var s = cellSize / 100;
        this.drawPath(cellSize, offset);
        push();
        translate(
            this.position.x * cellSize + offset.x,
            this.position.y * cellSize + offset.y
        );
        scale(s);
        fill(color(0, 0, 0));
        rect(15, 15, 70, 70);
        pop();
    };
}