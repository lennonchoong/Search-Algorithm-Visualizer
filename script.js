import {createGrid, positionGridCenter, randomizeGrid} from './grid.js'

import {linearSearch, binarySearch, exponentialSearch, jumpSearch, breadthFirstSearch, depthFirstSearch} from './algorithms.js'

let sizeSlider = document.getElementById("mySize");

let speedSlider = document.getElementById('mySpeed');

let speed = (14 - speedSlider.value);

let selectedCell;

let algoPairs = {
    "linearSearch": linearSearch,
    "binarySearch": binarySearch,
    "exponentialSearch": exponentialSearch,
    "jumpSearch": jumpSearch,
    "depthFirstSearch": depthFirstSearch,
    "breadthFirstSearch": breadthFirstSearch
}

sizeSlider.addEventListener("input", function(){
    let x = sizeSlider.value;
    createGrid(x);
    clearSelectedCell();
});

speedSlider.addEventListener('change', function(){
    speed = (14 - speedSlider.value);
})

//user's choice of search algorithm
algos.addEventListener("change", function(){
    createGrid(sizeSlider.value);
    
    clearSelectedCell();
    
    //if user's choice is binary search, blur out randomize button
    switch (algos.value) {
        case "binarySearch":
            randomizebtn.style.opacity = 0.5;
            randomizebtn.style.cursor = 'default';
            break;
        case "exponentialSearch":
            randomizebtn.style.opacity = 0.5;
            randomizebtn.style.cursor = 'default';
            break;
        case "jumpSearch":
            randomizebtn.style.opacity = 0.5;
            randomizebtn.style.cursor = 'default';
            break;
        default:
            randomizebtn.style.opacity = 1;
            randomizebtn.style.cursor = 'pointer'
            break;
    }
})

//event listener on randomize button
randomizebtn.addEventListener("click", function() {
    //prevents randomizing grid on binary search
    if (algos.value === 'binarySearch' || algos.value === 'exponentialSearch' || algos.value === 'jumpSearch') {
        return false;
    }
    clearSelectedCell();
    return randomizeGrid(sizeSlider.value);
});

let state = true;

//event listener on run button to run algorithm
runbtn.addEventListener('click', () => runAlgorithm());

//event delegation on table, allows for selection of single cell
cellcontainer.addEventListener('click', () => {clickHandler(event)});

function runAlgorithm() {
    let cells = Array.from(document.querySelectorAll('td'));
    
    if (!selectedCell) {
        alert("Please select a number from the grid.");
        return;
    }

    if (selectedCell.style.backgroundColor === 'rgb(0, 255, 0)') {
        state = true;
    }
    
    if (state) {
        selectedCell.style.backgroundColor = 'red';
        state = false;
        algoPairs[algos.value](selectedCell, cells, speed);
    } else return;
}

//clears selected cell
function clearSelectedCell() {
    state = true;
    selectedCell = null;
}

//function handles clicks on grid and prevent selection while function is running
function clickHandler(event) {
    if (event.target.tagName.toLowerCase() !== 'td') return;

    if (selectedCell) {
        if (selectedCell.style.backgroundColor === 'rgb(0, 255, 0)') {
            state = true;
        }

        if (state === true) {
            selectedCell.style.backgroundColor = "";
            clearSelectedCell();
        }
    }

    if (state === true) {
        selectedCell = event.target;
        selectedCell.style.backgroundColor = 'red';
    }
}

createGrid(sizeSlider.value);

positionGridCenter();

window.addEventListener('resize', positionGridCenter);


