let active_num = 1;
let workers = ["empty"];
let first_array = [[], [], [], [], [], [], [], [], []];

function updateGrid(arr) {
    for (let i=0;i<arr.length;i++) {
        if (arr[i] == 0) {
            arr[i] = " ";
        }
        document.getElementById(`grid-${i}`).innerText = arr[i];
    }
}

function updateActive(num) {
    document.getElementById(`num-${active_num}`).classList.remove("selected-num")
    document.getElementById(`num-${num}`).classList.add("selected-num")
}

function updateItem(num) {
    document.getElementById(`grid-${num}`).classList.add("root")
    document.getElementById(`grid-${num}`).innerText = active_num;
}

function enable_sudoku_overlay() {
  document.getElementById("sudoku-wrapper").style.display = "block";
}

function disable_sudoku_overlay() {
  document.getElementById("sudoku-wrapper").style.display = "none";
}


function fire() {
    document.getElementById("submit").style.display = "none";
    if (workers[0] !== "empty") {
        workers[0].terminate();
    }

    workers[0] = new Worker('static/js/sudoku_worker.js');

    for (let i=0;i<81;i++) {
        first_array[parseInt(i/9)][i%9] = parseInt(document.getElementById(`grid-${i}`).innerText.replace(" ", "0"));
    }

    workers[0].postMessage(first_array);
    workers[0].onmessage = function(msg) {
        if (msg.data === "Mr. Stark I don't feel so good") {
            workers[0].terminate();
        } else {
            updateGrid(msg.data);
        }
    }
    return 0;
}

function kill_all_workers() {
    for (let i=0;i<workers.length;i++)
    if (workers[i] !== "empty") {
        workers[i].terminate();
        workers[i] = "empty";
    }
}

function reset() {
    document.getElementById("submit").style.display = "inline";

    first_array = [[], [], [], [], [], [], [], [], []];
    for (let i=0;i<81;i++) {
        document.getElementById(`grid-${i}`).innerText = " ";
        document.getElementById(`grid-${i}`).classList = ["sudoku-item"];
    }
}