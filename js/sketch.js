var maze;
var width, height;
var cellSize;
var play = false;
var player;
var touch = {
    start: undefined,
    end: undefined,
    send: undefined
};

function touchStarted() {
    touch.start = {
        x: mouseX,
        y: mouseY
    };
}

function touchEnded() {
    touch.end = {
        x: mouseX,
        y: mouseY
    };
    touch.send = true;
}

function setCanva() {
    width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    var canva = createCanvas(width, height);
    canva.parent("canva");
    background(0);
}

function getMazeParams() {
    cellSize = Number(window.location.search.substring(1)) || 75;
    var dimensions = {
        width: Math.min(10, floor(width / cellSize)),
        height: Math.min(10, floor(height / cellSize)),
        cellSize: cellSize,
        format: "hexagonal"
    };
    var offset = {
        x: (width - dimensions.width * cellSize) / 2,
        y: (height - dimensions.height * cellSize) / 2
    };
    return {
        dimensions: dimensions,
        offset: offset
    };
}

function setup() {
    noStroke();
    setCanva();
    frameRate(10);
    var params = getMazeParams();
    maze = new Maze(params.dimensions, params.offset);
    if (play)
        player = new Player();
}

function update() {
    if (!maze.finished) {
        maze.continueGeneration();
    } else if (play) {
        if (player.update(maze, touch)) {
            player.reset();
            setCanva();
            var params = getMazeParams();
            maze.reset(params.dimensions, params.offset);
        }
    }
    touch.send = false;
}

function draw() {
    update();
    maze.draw();
    if (maze.finished && play)
        player.draw(maze.dimensions.cellSize, maze.offset);
}