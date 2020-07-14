export {linearSearch, binarySearch, exponentialSearch};

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

    setTimeout(function (){
        return grid.map((cell) => cell.classList.add('visitedCell'))
    }, (speed));

    setTimeout(function () {
        if (grid.length === 1 && grid.includes(selectedCell)) {
            selectedCell.style.backgroundColor = "#00ff00";
        }

        return grid.map((cell) => cell.classList.remove('visitedCell'))
    }, (speed * 3) * 100);

    if (grid.length == 1 && grid.includes(selectedCell)) {
        return selectedCell
    } 

    if (+selectedCell.innerHTML < +middleCell.innerHTML) {
        grid = grid.slice(0, middleIndex);
    } else {
        grid = grid.slice(middleIndex);
    }

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

    while (i < grid.length && +grid[i].innerHTML <= +selectedCell.innerHTML){
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
        speedB = speedA + 300 * speed

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
        return binarySearch(selectedCell, grid.splice(i/2, Math.min((i + 1), grid.length)), speed)
    }, speedB);
}

