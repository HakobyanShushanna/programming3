let matrix = []
 function matrixGen(matY, matX, grass, grassEat, gazan, human, death) {
    for (let i = 0; i < matY; i++) {
        matrix[i] = [];
        for (let j = 0; j < matX; j++) {
            matrix[i][j] = 0; 
        }
    }

    for (let i = 0; i < grass; i++) { 

        var y = Math.floor(Math.random() * matY) 
        var x = Math.floor(Math.random() * matX) 
        if (matrix[y][x] == 0) { 
            matrix[y][x] = 1
        } 
    }
    for (let i = 0; i < grassEat; i++) { 
        var y = Math.floor(Math.random() * matY)
        var x = Math.floor(Math.random() * matX)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 2;
        }
    }
    for (let i = 0; i < gazan; i++) {
        var y = Math.floor(Math.random() * matY)
        var x = Math.floor(Math.random() * matX)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 3;
        }
    }
    for (let i = 0; i < human; i++) {
        var y = Math.floor(Math.random() * matY)
        var x = Math.floor(Math.random() * matX)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 4;
        }
    }
}
matrixGen(40, 40, 1000, 500, 50, 25, 1); 

var grassArr = []; 
var grassEaterArr = [];
var gazanikArr = [];
var humanArr = [];
var homeArr = [];
var regulator = new Regulator()
var side = 10;


function setup() {
    createCanvas((matrix[0].length * side) + 1, (matrix.length * side) + 1); 
    background('pink'); 
    frameRate(10) 
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                var gr = new Grass(x, y);
                grassArr.push(gr);
            } else if (matrix[y][x] == 2) {
                var grEater = new GrassEater(x, y);
                grassEaterArr.push(grEater);
            } else if(matrix[y][x] == 3){
                var gazan = new Predator(x,y);
                gazanikArr.push(gazan);
            } else if(matrix[y][x] == 4){
                var human = new Human(x,y);
                humanArr.push(human);
            }
        }
    }
}


function draw() 
{
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix.length; x++) {
            if (matrix[y][x] == 0) {
                fill("#acacac");
            }
            else if (matrix[y][x] == 1) {
                fill("green");
            }
            else if (matrix[y][x] == 2) {
                fill("Yellow");
            }
            else if (matrix[y][x] == 3) {
                fill("Red");
            }
            else if (matrix[y][x] == 4) {
                fill("Blue");
            }
            else if (matrix[y][x] == 5) {
                fill("White");
            }
            rect(x * side, y * side, side, side);
        }
    }

    for (let i = 0; i < grassArr.length; i++) {
        grassArr[i].mul();
    }
    for (let i = 0; i < gazanikArr.length; i++) {
        gazanikArr[i].mul();
        gazanikArr[i].eat();
        
    }
    for (let i = 0; i < grassEaterArr.length; i++) {
        grassEaterArr[i].mul();
        grassEaterArr[i].eat();
    }
    for (let i = 0; i < humanArr.length; i++) {
        humanArr[i].mul();
        humanArr[i].eat();
    }

    regulator.check()

    console.log("grassArr.length = " + grassArr.length);
    console.log("grassEaterArr.length = " + grassEaterArr.length);
    console.log("gazanikArr.length = " + gazanikArr.length);
    console.log("humanArr.length = " + humanArr.length);
    console.log("homeArr.length = " + homeArr.length);
} 