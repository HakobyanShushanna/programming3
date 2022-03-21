class LivingCreature {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.multiply = 0;
        this.index = index;
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1],
        ]
    }

    chooseCell(ch) {
        var found = [];
        for (let i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];

            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[x][y] == ch) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }
}

class Grass extends LivingCreature {
    mul() {
        this.multiply++;
        var newCell = random(this.chooseCell(0));
        if (this.multiply >= 8 && newCell) {
            var newGrass = new Grass(newCell[0], newCell[1], this.index);
            grassArr.push(newGrass);
            matrix[newCell[1]][newCell[0]] = this.index;
            this.multiply = 0;

        }
    }
}

class GrassEater extends LivingCreature {
    constructor(x, y, index) {
        super(x, y, index);
        this.energy = 8;
    }

    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    chooseCell(character) {
        this.getNewCoordinates()
        return super.chooseCell(character);
    }

    move() {
        this.energy--;
        let emptyCell = this.chooseCell(0)
        let newCell = emptyCell[Math.floor(Math.random() * emptyCell.length)];
        if (newCell && this.energy >= 0) {
            let newX = newCell[0];
            let newY = newCell[1];
            matrix[newY][newX] = 2;
            this.x = newX
            this.y = newY
            matrix[this.y][this.x] = 0;
        }
        else if (this.energy < 0) {
            this.die();
        }
    }
    mul() {
        let emptyCell = this.chooseCell(0)
        let newCell = emptyCell[Math.floor(Math.random() * emptyCell.length)];
        if (newCell && this.energy >= 12) {
            let newX = newCell[0];
            let newY = newCell[1];
            matrix[newY][newX] = 2;
            let newGrassEater = new GrassEater(newX, newY)
            grassEaterArr.push(newGrassEater);
            this.energy -= 4;
        }
    }
    eat() {
        let emptyCell = this.chooseCell(1)
        let newCell = emptyCell[Math.floor(Math.random() * emptyCell.length)];
        if (newCell) {
            this.energy++
            let newX = newCell[0];
            let newY = newCell[1];
            matrix[newY][newX] = 2
            matrix[this.y][this.x] = 0;


            for (let i = 0; i < grassArr.length; i++) {
                if (grassArr[i].x == this.x && grassArr[i].y == this.y) {
                    grassArr.splice(i, 1);
                }
            }
            this.x = newX;
            this.y = newY;
        }
        else {
            this.move();
        }
    }

    die() {
        matrix[this.y][this.x] = 0;
        for (let i = 0; i < grassEaterArr.length; i++) {
            if (grassEaterArr[i].x == this.x && grassEaterArr[i].y == this.y) {
                grassEaterArr.splice(i, 1);
                break;
            }
        }
    }
}
class Predator {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.directions = [];
        this.energy = 12;
    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    chooseCell(ch) {
        this.getNewCoordinates()
        var found = [];
        for (let i in this.directions) {
            let x = this.directions[i][0]
            let y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == ch) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }

    move() {

        let emptyCell1 = this.chooseCell(1)
        let emptyCell0 = this.chooseCell(0)

        let arr = emptyCell0.concat(emptyCell1)

        let newCell = arr[Math.floor(Math.random() * arr.length)];
        if (newCell && this.energy > 0) {
            this.energy--;
            if (newCell == 0) {
                let newX = newCell[0];
                let newY = newCell[1];
                matrix[newY][newX] = 3
                matrix[this.y][this.x] = 0;
                this.x = newX
                this.y = newY
            } else if (newCell == 1) {
                let newX = newCell[0];
                let newY = newCell[1];
                matrix[newY][newX] = 3
                matrix[this.y][this.x] = 1;
                this.x = newX
                this.y = newY
            }
        }
        else if (this.energy <= 0) {
            this.die();
        }
    }
    mul() {
        let emptyCell = this.chooseCell(0)
        let newCell = emptyCell[Math.floor(Math.random() * emptyCell.length)];
        if (newCell && this.energy >= 15) {
            let newX = newCell[0];
            let newY = newCell[1];
            matrix[newY][newX] = 3;
            let newGazanik = new Predator(newX, newY)
            gazanikArr.push(newGazanik);
            this.energy -= 4;
        }
        else {
            this.eat();
        }
    }
    eat() {
        let emptyCell0 = this.chooseCell(2)
        let emptyCell = this.chooseCell(4).concat(emptyCell0)
        let newCell = emptyCell[Math.floor(Math.random() * emptyCell.length)];
        if (newCell) {
            this.energy += 2
            let newX = newCell[0];
            let newY = newCell[1];
            matrix[newY][newX] = 3;
            matrix[this.y][this.x] = 0;
            if (newCell == 2) {
                for (let i = 0; i < grassEaterArr.length; i++) {
                    if (grassEaterArr[i].x == this.x && grassEaterArr[i].y == this.y) {
                        grassEaterArr.splice(i, 1);
                    }
                }
            }
            if (newCell == 4) {
                for (let i = 0; i < humanArr.length; i++) {
                    if (humanArr[i].x == this.x && humanArr[i].y == this.y) {
                        humanArr.splice(i, 1);
                    }
                }
            }
            this.x = newX
            this.y = newY
        }
        else {
            this.move();
        }
    }

    die() {
        matrix[this.y][this.x] = 0;
        for (let i = 0; i < gazanikArr.length; i++) {
            if (gazanikArr[i].x == this.x && gazanikArr[i].y == this.y) {
                gazanikArr.splice(i, 1);
            }
        }

    }
}
class Human {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.directions = [];
        this.energy = 12;
        this.id = humanArr.length
    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    chooseCell(ch) {
        this.getNewCoordinates()
        var found = [];
        for (let i in this.directions) {
            let x = this.directions[i][0]
            let y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == ch) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }

    move() {
        this.energy--;
        let emptyCell1 = this.chooseCell(1)
        let emptyCell0 = this.chooseCell(0)
        let arr = emptyCell0.concat(emptyCell1)
        let newCell = arr[Math.floor(Math.random() * arr.length)];
        if (newCell && this.energy > 0) {
            if (newCell == 0) {
                let newX = newCell[0];
                let newY = newCell[1];
                matrix[newY][newX] = 4
                matrix[this.y][this.x] = 0;
                this.x = newX
                this.y = newY
            } else if (newCell == 1) {
                let newX = newCell[0];
                let newY = newCell[1];
                matrix[newY][newX] = 4
                matrix[this.y][this.x] = 1;
                this.x = newX
                this.y = newY
            }
        }
        else if (this.energy <= 0) {
            this.die();
        }
    }
    mul() {
        let emptyCell = this.chooseCell(0)
        let newCell = emptyCell[Math.floor(Math.random() * emptyCell.length)];
        if (newCell && this.energy >= 21) {
            let newX = newCell[0];
            let newY = newCell[1];
            matrix[newY][newX] = 4;
            let newHuman = new Human(newX, newY)
            humanArr.push(newHuman);
            this.energy--
            this.create()
        }
        else {
            this.eat();
        }
    }
    kill() {
        let emptyCell = this.chooseCell(3)
        let newCell = emptyCell[Math.floor(Math.random() * emptyCell.length)];
        if (newCell) {
            this.energy -= 2
            let newX = newCell[0];
            let newY = newCell[1];
            matrix[newY][newX] = 4;
            matrix[this.y][this.x] = 0;
            for (let i = 0; i < gazanikArr.length; i++) {
                if (gazanikArr[i].x == newX && gazanikArr[i].y == newY) {
                    gazanikArr.splice(i, 1);
                }
            }
            this.x = newX
            this.y = newY
        }
        else {
            this.move();
        }
    }
    eat() {
        let emptyCell = this.chooseCell(2)
        let newCell = emptyCell[Math.floor(Math.random() * emptyCell.length)];
        if (newCell) {
            this.energy += 2
            let newX = newCell[0];
            let newY = newCell[1];
            matrix[newY][newX] = 4;
            matrix[this.y][this.x] = 0;
            for (let i = 0; i < grassEaterArr.length; i++) {
                if (grassEaterArr[i].x == this.x && grassEaterArr[i].y == this.y) {
                    grassEaterArr.splice(i, 1);
                }
            }
            this.x = newX
            this.y = newY
        }
        else {
            this.move();
        }
    }
    die() {
        matrix[this.y][this.x] = 0;
        for (let i = 0; i < homeArr.length; i++) {
            if (homeArr[i].id == this.id) {
                let x = homeArr[i].x
                let y = homeArr[i].y
                matrix[y][x] = 0
                homeArr.splice(i, 1)
            }
        }
        for (let i = 0; i < humanArr.length; i++) {
            if (humanArr[i].x == this.x && humanArr[i].y == this.y) {
                humanArr.splice(i, 1);
            }
        }
    }
    create() {
        let emptyCell = this.chooseCell(0)
        let newCell = emptyCell[Math.floor(Math.random() * emptyCell.length)];
        if (newCell && this.energy >= 21) {
            let newX = newCell[0];
            let newY = newCell[1];
            matrix[newY][newX] = 5;
            let newHome = new Home(newX, newY, this.id)
            homeArr.push(newHome)
            this.energy -= 4
        }
        else {
            this.eat();
        }
    }
}

class Home {
    constructor(x, y, id) {
        this.x = x
        this.y = y
        this.id = id
    }
}

class Regulator {
    check() {
        for (let i = 0; i < grassArr.length; i++) {
            if (grassArr.length < 10) {
                let j = 0;
                while (j < 10) {
                    var y = Math.floor(Math.random() * matrix.length)
                    var x = Math.floor(Math.random() * matrix[y].length)
                    if (matrix[y][x] == 0) {
                        matrix[y][x] = 1
                        let newGrass = new Grass(x, y)
                        grassArr.push(newGrass)
                        j++
                    }
                }
            }
        }
        for (let i = 0; i < grassEaterArr.length; i++) {
            if (grassEaterArr.length < 10) {
                let j = 0;
                while (j < 10) {
                    var y = Math.floor(Math.random() * matrix.length)
                    var x = Math.floor(Math.random() * matrix[y].length)
                    if (matrix[y][x] == 0) {
                        matrix[y][x] = 2
                        let newGrassEater = new GrassEater(x, y)
                        grassEaterArr.push(newGrassEater)
                        j++
                    }
                }
            }
        }
        for (let i = 0; i < gazanikArr.length; i++) {
            if (gazanikArr.length < 10) {
                let j = 0;
                while (j < 10) {
                    var y = Math.floor(Math.random() * matrix.length)
                    var x = Math.floor(Math.random() * matrix[y].length)
                    if (matrix[y][x] == 0) {
                        matrix[y][x] = 3
                        let newGazanik = new Predator(x, y)
                        gazanikArr.push(newGazanik)
                        j++
                    }
                }
            }
        }
        for (let i = 0; i < humanArr.length; i++) {
            if (humanArr.length < 10) {
                let j = 0;
                while (j < 10) {
                    var y = Math.floor(Math.random() * matrix.length)
                    var x = Math.floor(Math.random() * matrix[y].length)
                    if (matrix[y][x] == 0) {
                        matrix[y][x] = 4
                        let newHuman = new Human(x, y)
                        humanArr.push(newHuman)
                        j++
                    }
                }
            }
        }
        for (let i = 0; i < homeArr.length; i++) {
            if (homeArr.length > 150) {
                let j = 0;
                while (j < 20) {
                    homeArr.splice(homeArr.length - 1, 1)
                    j++
                }
            }
        }
    }
}