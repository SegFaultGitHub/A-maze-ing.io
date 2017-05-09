function Maze(dimensions, offset) {
    switch (dimensions.format) {
        case "square":
            this.pickcell = function(current) {
                toAdd = [{
                    x: current.x - 1,
                    y: current.y
                }, {
                    x: current.x + 1,
                    y: current.y
                }, {
                    x: current.x,
                    y: current.y - 1
                }, {
                    x: current.x,
                    y: current.y + 1
                }];
                choices = Array();
                for (var i = 0; i < toAdd.length; i++) {
                    var vector = toAdd[i];
                    if (vector.x >= 0 && vector.x < this.dimensions.width && vector.y >= 0 && vector.y < this.dimensions.height)
                        if (!this.cellArray[vector.x][vector.y].visited)
                            choices.push(vector);
                }
                if (choices.length === 0) return null;
                else return choices[floor(random(choices.length))];
            };

            this.continueGeneration = function() {
                if (this.path.length !== 0) {
                    var current = this.path[this.path.length - 1];
                    var next = this.pickcell(current);

                    var ratio = this.path.length / (this.dimensions.width * this.dimensions.height);
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
                        this.continueGeneration();
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
                } else {
                    this.finished = true;
                }
            };

            this.draw = function() {
                for (var i = 0; i < this.dimensions.width; i++) {
                    for (var j = 0; j < this.dimensions.height; j++) {
                        this.cellArray[i][j].draw(
                            i * this.dimensions.cellSize + this.offset.x,
                            j * this.dimensions.cellSize + this.offset.y,
                            this.dimensions.cellSize);
                    }
                }
            };

            this.reset = function(dimensions, offset) {
                this.finished = false;
                this.dimensions = dimensions;
                this.offset = offset;
                this.cellArray = new Array(width);
                for (var i = 0; i < this.dimensions.width; i++) {
                    this.cellArray[i] = new Array(height);
                    for (var j = 0; j < this.dimensions.height; j++) {
                        this.cellArray[i][j] = new Cell(this.dimensions.format);
                    }
                }
                this.path = [];
                var x = floor(random(this.dimensions.width));
                var y = floor(random(this.dimensions.height));
                this.path.push({
                    x: x,
                    y: y
                });
                this.cellArray[x][y].visited = true;
                this.cellArray[0][0].content = 0b1000;
                this.cellArray[dimensions.width - 1][dimensions.height - 1].content = 0b0100;

                var colorNumber = floor(random(3) + 2);
                this.colors = [];
                for (i = 0; i < colorNumber; i++) {
                    this.colors.push(color(floor(random(256)), floor(random(256)), floor(random(256))));
                }
            };

            this.reset(dimensions, offset);
            break;
    }
}