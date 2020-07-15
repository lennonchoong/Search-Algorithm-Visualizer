export {linearSearch, binarySearch, exponentialSearch, jumpSearch, breadthFirstSearch, depthFirstSearch};

/************************************************************************/

function linearSearch(selectedCell, grid, speed) {
    for (let i = 0; i < grid.length; i++) {
        if (grid[i].innerHTML === selectedCell.innerHTML && selectedCell) {
            break;
        }

        setTimeout(function() {
            grid[i].classList.add('visitedCell');

            if (grid[i + 1].innerHTML === selectedCell.innerHTML) {
                grid[i + 1].style.backgroundColor = '#00ff00';
            }

            setTimeout(function () {
                grid[i].classList.remove('visitedCell');
            }, speed * 50);
        }, (i*speed) * 50);
    }
}

/************************************************************************/

function binarySearch(selectedCell, grid, speed) {
    let middleIndex, middleCell;
    
    middleIndex = Math.round(grid.length/2);
    
    middleCell = grid[middleIndex];

    if (grid.length == 1 && grid.includes(selectedCell)) {
        return selectedCell
    } 
    let leftoverPartition;
    if (+selectedCell.innerHTML < +middleCell.innerHTML) {
        leftoverPartition = grid.slice(middleIndex);
        grid = grid.slice(0, middleIndex);
    } else {
        leftoverPartition = grid.slice(0,middleIndex);
        grid = grid.slice(middleIndex);
    }
    
    setTimeout(function (){
        leftoverPartition.map((cell) => cell.classList.add('leftoverPartition'))
        grid.map((cell) => cell.classList.add('visitedCell'))
    }, (speed));

    setTimeout(function () {
        if (grid.length === 1 && grid.includes(selectedCell)) {
            selectedCell.style.backgroundColor = "#00ff00";
        }

        leftoverPartition.map((cell) => cell.classList.remove('leftoverPartition'))
        grid.map((cell) => cell.classList.remove('visitedCell'))
    }, (speed * 3) * 100);

    setTimeout(function() {
        binarySearch(selectedCell, grid, speed);
    }, (speed * 3)* 100);
}

/************************************************************************/

function exponentialSearch(selectedCell, grid, speed) {
    if (grid[0] === selectedCell) {
        selectedCell.style.backgroundColor = "#00ff00"
        return;
    }

    let i = 1;
    
    let arr = [1];

    while (i < grid.length && +grid[i].innerHTML < +selectedCell.innerHTML){
        if (i * 2 < grid.length) {
            i *= 2
        } else {
            i = grid.length - 1
        }
        
        arr.push(i);
    }

    let speedA, speedB, index;
    
    speedA = 500;
    index = 1
    
    for (let j = 1; j < arr.length; j++) {
        speedB = speedA + 180 * speed

        setTimeout(function() {
            grid[arr[index - 1]].classList.add('lowHighBounds');
            grid[arr[index]].classList.add('lowHighBounds');
            grid.slice(+grid[arr[index - 1]].innerHTML, +grid[arr[index]].innerHTML - 1).map((cell) => cell.classList.add('visitedCell'));
        }, speedA);

        setTimeout(function () {
            grid[arr[index - 1]].classList.remove('lowHighBounds');
            grid[arr[index]].classList.remove('lowHighBounds');
            grid.slice(+grid[arr[index - 1]].innerHTML, +grid[arr[index]].innerHTML - 1).map((cell) => cell.classList.remove('visitedCell'));
            index += 1
        }, speedB);

        speedA = speedB;
    }

    setTimeout(function () {
        return binarySearch(selectedCell, grid.slice(arr[arr.length - 2], i + 1), speed)
    }, speedB);
}

/************************************************************************/

function jumpSearch(selectedCell, grid, speed) {
    let step = Math.round(Math.sqrt(grid.length));
    
    let prev = 0;

    let speedA = 500;

    let arr = [];

    let linearSearchArr = [];

    while (+grid[(Math.min(step, grid.length) - 1)].innerHTML < +selectedCell.innerHTML) {
        prev = step;

        arr.push(prev-1);

        step += Math.round(Math.sqrt(grid.length));
    }

    step -= 1;

    arr.push(step);

    while (+grid[step].innerHTML != +selectedCell.innerHTML) {
        linearSearchArr.push(grid[step]);
        step--
    }

    for (let elem of arr) {
        setTimeout(function () {
            grid[elem].classList.add('lowHighBounds')
        }, speedA)
        
        speedA = speedA + 45 * speed;

        setTimeout(function () {
            grid[elem].classList.remove('lowHighBounds')
        }, speedA)
    }
    
    for (let cell of linearSearchArr) {
        setTimeout(function () {
            cell.classList.add('visitedCell')
        }, speedA)
        
        speedA = speedA + 45 * speed;

        setTimeout(function () {
            cell.classList.remove('visitedCell')
        }, speedA)
    }
    
    setTimeout(function () {
        grid[step].style.backgroundColor = '#00ff00'
    }, speedA + 45 * speed)
}

/************************************************************************/

function breadthFirstSearch(selectedCell, grid, speed) {
    let matrix = create2DMatrix(grid);

    let queue = [];

    queue.push(0 + ',' + 0);
    
    let visited = new Set();

    let speedA = 500;

    while (queue.length != 0) {

        let x = queue.shift();

        let row = +(x.split(',')[0]);

        let col = +(x.split(',')[1]);
        
        if (row < 0 || col < 0 || row >= Math.sqrt(grid.length) || col >= Math.sqrt(grid.length) || visited.has(x)) {
            continue;
        }

        visited.add(x);
        queue.push(row + ',' + (col - 1)); //left
        queue.push(row + ',' + (col + 1)); //right
        queue.push((row - 1) + ',' + col ); //up
        queue.push((row + 1) + ',' + col ); //down
        
        setTimeout(function () {
            matrix[row][col].classList.add('visitedCell');
        }, speedA);

        speedA = speedA + 30 * speed;

        if (matrix[row][col].innerHTML === selectedCell.innerHTML) {
            setTimeout(function () {
                grid.filter((cell) => cell.classList.contains('visitedCell')).map((cell) => cell.classList.remove('visitedCell'));
                selectedCell.style.backgroundColor = "#00ff00";
            }, speedA)
            break;
        } 
    }
}

/************************************************************************/

function depthFirstSearch(selectedCell, grid, speed) {
    let matrix = create2DMatrix(grid);

    let queue = [];

    queue.push(0 + ',' + 0);
    
    let visited = new Set();

    let speedA = 500;

    while (queue.length != 0) {

        let x = queue.pop();

        let row = +(x.split(',')[0]);

        let col = +(x.split(',')[1]);
        
        if (row < 0 || col < 0 || row >= Math.sqrt(grid.length) || col >= Math.sqrt(grid.length) || visited.has(x)) {
            continue;
        }

        visited.add(x);
        queue.push(row + ',' + (col - 1)); //left
        queue.push(row + ',' + (col + 1)); //right
        queue.push((row - 1) + ',' + col ); //up
        queue.push((row + 1) + ',' + col ); //down
        
        setTimeout(function () {
            matrix[row][col].classList.add('visitedCell');
        }, speedA);

        speedA = speedA + 30 * speed;

        if (matrix[row][col].innerHTML === selectedCell.innerHTML) {
            setTimeout(function () {
                grid.filter((cell) => cell.classList.contains('visitedCell')).map((cell) => cell.classList.remove('visitedCell'));
                selectedCell.style.backgroundColor = "#00ff00";
            }, speedA)
            break;
        } 
    }
}

/************************************************************************/

function create2DMatrix(grid) {
    let i = 0;
    let matrix = [];
    for (let j = 0; j < Math.sqrt(grid.length); j ++) {
        let row = [];
        for (let k = 0; k < Math.sqrt(grid.length); k ++) {
            row.push(grid[i]);
            i ++
        }
        matrix.push(row);
    }
    return matrix
}