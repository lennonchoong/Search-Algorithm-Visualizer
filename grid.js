export {createGrid, positionGridCenter, randomizeGrid}

//creates grid and auto-resizes grid according to slider value
function createGrid(gridSize) {
    if (gridbody.rows.length != 0) {
        Array.from(gridbody.rows).forEach(function(row) {
            row.remove();
        })
    } 

    for (let i = 0; i < gridSize; i++) {
        let row = document.createElement('tr');

        for (let j = 0; j < gridSize; j++) {
            let cell = document.createElement('td');

            row.append(cell);
            cell.classList.add('cells')
        }
        gridbody.append(row);
    }

    let cellCollection = document.querySelectorAll('.cells');
    
    Array.from(cellCollection).map((cell) => {
        cell.style.width = Math.floor(800/gridSize) + 'px';
        cell.style.height = Math.floor(800/gridSize) + 'px';
        cell.style.fontSize = Math.floor(0.4 * 800/gridSize) + 'px';
    })

    assignValuetoGrid();
}

//positions grid on horizontal center of window
function positionGridCenter() {
    let computedWidth = getComputedStyle(grid).width;
    grid.style.left = (document.documentElement.clientWidth/2 - parseInt(computedWidth)/2) + 'px';
}

//assigns integer to each cell of the grid
function assignValuetoGrid() {
    let cellCollection = document.querySelectorAll('.cells');
    
    let num = 1;

    for (let cell of cellCollection) {
        cell.innerHTML = (num);
        num ++;
    }
}

//Fisher-Yates shuffling algorithm
function fisherYatesShuffle() {
    let cellCollection = gridbody;
    
    let individualCells = Array.from(cellCollection.querySelectorAll('td'));

    for (let i = individualCells.length - 1; i > 0; i--) {
        let randInt = Math.floor(Math.random() * (i));
        
        [individualCells[randInt], individualCells[i]] = [individualCells[i], individualCells[randInt]];
    }
    return individualCells
}

//randomizes grid 
function randomizeGrid(gridSize) {
    createGrid(gridSize);

    let shuffledCells = fisherYatesShuffle();

    let index = 0;

    let newBody = document.createElement('tbody');
    
    for (let i = 0; i < gridSize; i++) {
        let row = document.createElement('tr');

        for (let j = 0; j < gridSize; j++) {
            row.append(shuffledCells[index]);
            index++
        }
        
        newBody.append(row);
    }
    gridbody.replaceWith(newBody);
    newBody.id = 'gridbody'
}