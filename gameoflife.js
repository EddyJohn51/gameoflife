//gameoflife.js

var canvas = document.getElementById('grid');
var context = canvas.getContext('2d');

const HEIGHT = canvas.getAttribute('height');
const WIDTH = canvas.getAttribute('width');
const TILESIZE = 50;

const ROWS = HEIGHT / TILESIZE;
const COLS = WIDTH / TILESIZE;

var grid = new Array;

function validatePos(x, y){
    return x >= 0 && x < COLS && y >= 0 && y < ROWS;
}

const neighborDiffs = [[-1, -1], [0, -1], [1, -1],
                       [-1,  0],          [1,  0],
                       [-1,  1], [0,  1], [1,  1]  ];

class Cell {
    constructor(x,y)
    {
        this.alive = Math.random() < 0.1;
        this.x = x;
        this.y = y;
        this.neighbors = new Array;
    }

}

function setup() {
    context.strokeStyle = 'grey';
    for(var y = 0; y < ROWS; ++y)
    {
        var row = new Array;
        for(var x = 0; x < COLS; ++x)
        {
            row.push(new Cell(x, y));
            
            context.moveTo(x * TILESIZE, 0);
            context.lineTo(x * TILESIZE, HEIGHT);

            context.stroke();
        }

        context.moveTo(0, y * TILESIZE);
        context.lineTo(WIDTH, y * TILESIZE);
        context.stroke();

        grid.push(row);
    }

    // find neighbors and add to each cell
    for(const r of grid)
    {
        for(const c of r)
        {
        var possibleNeighbors = new Array;
            for(var i = 0; i < neighborDiffs.length; ++i)
            {
                var possibleX = c.x + neighborDiffs[i][0];
                var possibleY = c.y + neighborDiffs[i][1];

                if(validatePos(possibleX, possibleY))
                {
                    c.neighbors.push(grid[possibleX][possibleY]);
                }
            }

        }
    }
}

function draw() {
    for(var r of grid)
    {
        for(var c of r)
        {
            if(c.alive){
                context.fillStyle = 'green';
                context.fillRect(c.x * TILESIZE, c.y * TILESIZE, TILESIZE, TILESIZE);
                context.stroke();
            }else
            {
                context.fillStyle = 'black';
                context.fillRect(c.x * TILESIZE, c.y * TILESIZE, TILESIZE, TILESIZE);
                context.stroke();
            }
        }
    }

    console.table(grid);
}

function checkAlive(cell)
{
    return cell.alive;
}

function update()
{
    for(var row of grid)
    {
        for(var cell of row)
        {
            var live_neighbors = cell.neighbors.filter(checkAlive);
            if(cell.alive)
            {
                if(live_neighbors.length < 2 || live_neighbors.length > 3)
                {
                    cell.alive = false;
                }else if(live_neighbors == 2 || live_neighbors == 3)
                {
                    cell.alive = true;
                }
            }else
            {
                if(live_neighbors.length == 3)
                {
                    cell.alive = true;
                }
            }
        }

        draw();
    }
}

setup();
draw();
setInterval(update, 1000);
