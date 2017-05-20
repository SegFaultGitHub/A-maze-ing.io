var maze;
var cellSize;
var player;
var touch = {
    start: undefined,
    end: undefined,
    send: undefined
};
var queryParams = {
    format: "square",
    width: 0,
    height: 0,
    cellSize: 0
};
var play;
var formats = ["square", "hexagonal"];

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
    var query = window.location.search.substring(1);
    queryParams.format = "square";
    queryParams.width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    queryParams.height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    queryParams.cellSize = 40;
    if (query) {
        query = query.split("&");
        query.forEach(function(item) {
            item = item.split("=");
            if (item.length != 2) return;
            switch (item[0]) {
                case "width": case "height": case "cellSize":
                    queryParams[item[0]] = Number(item[1]) || queryParams[item[0]];
                case "format":
                    queryParams.format = formats.indexOf(item[1]) === -1 ? "square" : item[1];
            }
        })
    }
    queryParams.width = Math.max(queryParams.width, queryParams.cellSize);
    queryParams.height = Math.max(queryParams.height, queryParams.cellSize);
    console.log(queryParams);
    play = queryParams.format === "square";
    var canva = createCanvas(queryParams.width, queryParams.height);
    canva.parent("canva");
    background(0);
}

function getMazeParams() {
    console.log(window.location.search);
    var dimensions, offset;
    switch (queryParams.format) {
        case "square":
            dimensions = {
                width: Math.min(60, floor(queryParams.width / queryParams.cellSize)),
                height: Math.min(60, floor(queryParams.height /  queryParams.cellSize)),
                cellSize: queryParams.cellSize,
                format: queryParams.format
            };
            offset = {
                x: (queryParams.width - dimensions.width * queryParams.cellSize) / 2,
                y: (queryParams.height - dimensions.height * queryParams.cellSize) / 2
            };
            break;
        case "hexagonal":
            dimensions = {
                width: Math.min(60, floor(queryParams.width / queryParams.cellSize) - 1),
                height: Math.min(60, floor(queryParams.height /  (0.75 * queryParams.cellSize))),
                cellSize: queryParams.cellSize,
                format: queryParams.format
            };
            offset = {
                x: (queryParams.width - dimensions.width * queryParams.cellSize - queryParams.cellSize / 2) / 2,
                y: (queryParams.height - dimensions.height * queryParams.cellSize * 0.7 - queryParams.cellSize * 0.3) / 2
            };
            break;
    }
    return {
        dimensions: dimensions,
        offset: offset
    };
}

function setup() {
    noStroke();
    setCanva();
    smooth(4);
    frameRate(60);
    var mazeParams = getMazeParams();
    console.log(mazeParams)
    maze = new Maze(mazeParams.dimensions, mazeParams.offset);
    // while (!maze.finished)
        // maze.continueGeneration();
    if (play)
        player = new Player();
}

var prevKeyIsPressed;

function update() {
    var mazeParams;
    if (!maze.finished) {
        maze.continueGeneration();
    } else if (!play) {
        setCanva();
        mazeParams = getMazeParams();
        maze.reset(mazeParams.dimensions, mazeParams.offset);
    } else if (play) {
        if (player.update(maze, touch)) {
            player.reset();
            setCanva();
            mazeParams = getMazeParams();
            maze.reset(mazeParams.dimensions, mazeParams.offset);
        }
    }
    touch.send = false;
    prevKeyIsPressed = keyIsPressed;
}

function draw() {
    update();
    maze.draw();
    if (maze.finished && play)
        player.draw(maze.dimensions.cellSize, maze.offset);
}
