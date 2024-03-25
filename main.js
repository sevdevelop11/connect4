// Definición de variables
let players = [{ color: 'red', wins: 0 }, { color: 'yellow', wins: 0 }];
let actualPlayer = 0;
let rowsNumber = 6;
let colsNumber = 7;
let horizontalWin = 0;
let verticalWin = 0;
let redlWins = 0;
let yellowWins = 0;

// Funciones
function checkWin() {
    if (verticalCheck() || horizontalCheck() || diagonalCheck()) {
        let instructions = document.getElementById('instructions');
        instructions.textContent = 'Winner: ' + players[actualPlayer].color;
        instructions.style.color = players[actualPlayer].color;
        players[actualPlayer].wins = players[actualPlayer].wins + 1;
        let winsActualPlayer = document.getElementsByClassName('team').item(actualPlayer).children.item(0);
        winsActualPlayer.textContent = winsActualPlayer.textContent.slice(0, winsActualPlayer.textContent.length - 1) + 
            players[actualPlayer].wins;
//        winsActualPlayer.textContent = winsActualPlayer.textContent.charAt(0, winsActualPlayer.textContent.length -1);
        document.getElementById('bavtbec').style.display = 'block';
    } else {
        actualPlayer = (actualPlayer + 1) % 2;
    }

}

function horizontalCheck() {
    var horizontalWin = 0;
    var i = rowsNumber - 1;
    var actualColor = players[actualPlayer].color;
    while (i >= 0 && horizontalWin < 4) {
        var j = 0;

        while (j < colsNumber && horizontalWin < 4) {
            var colSelected = document.getElementsByClassName("col").item(j);
            var rowSelected = colSelected.children.item(i);
            if (rowSelected.classList.contains(actualColor)) {
                horizontalWin = horizontalWin + 1;
                j = j + 1;
            } else {
                horizontalWin = 0;
                j = j + 1;
            }
        }
        i = i - 1;
    }

    return horizontalWin >= 4;
}

function verticalCheck() {
    var verticalWin = 0;
    var i = 0;
    var actualColor = players[actualPlayer].color;
    while (i < colsNumber && verticalWin < 4) {
        var colSelected = document.getElementsByClassName("col").item(i);
        var j = rowsNumber - 1;
        while (j >= 0 && verticalWin < 4) {
            var rowSelected = colSelected.children.item(j);
            if (rowSelected.classList.contains(actualColor)) {
                verticalWin = verticalWin + 1;
                j = j - 1;
            } else {
                verticalWin = 0;
                j = j - 1;
            }
        }
        i = i + 1;
    }

    return verticalWin >= 4

}

function diagonalCheck() {
    let cols = document.getElementsByClassName("col");
    var actualColor = players[actualPlayer].color;
    // Verificar diagonal de izquierda a derecha (\)
    for (let i = 0; i < colsNumber - 3; i++) {
        for (let j = rowsNumber - 1; j >= 3; j--) {
            if (cols[i].children[j].classList.contains(actualColor) &&
                cols[i + 1].children[j - 1].classList.contains(actualColor) &&
                cols[i + 2].children[j - 2].classList.contains(actualColor) &&
                cols[i + 3].children[j - 3].classList.contains(actualColor)) {
                return true;
            }
        }
    }

    // Verificar diagonal de derecha a izquierda (/)
    for (let i = colsNumber - 1; i >= 3; i--) {
        for (let j = rowsNumber - 1; j >= 3; j--) {
            if (cols[i].children[j].classList.contains(actualColor) &&
                cols[i - 1].children[j - 1].classList.contains(actualColor) &&
                cols[i - 2].children[j - 2].classList.contains(actualColor) &&
                cols[i - 3].children[j - 3].classList.contains(actualColor)) {
                return true;
            }
        }
    }

    return false;
}

function resetBoard() {
    resetClassname(players[0].color);
    resetClassname(players[1].color);
    actualPlayer = 0;
    document.getElementById('bavtbec').style.display = 'none';
    let instructions = document.getElementById('instructions');
    instructions.textContent = 'Turn ' + players[0].color;
    instructions.style.color = players[actualPlayer].color;
}

function resetClassname(className) {
    var elements = document.getElementsByClassName(className);
    while (elements.length > 0) {
        elements.item(0).classList.remove(className);
    }
}

function resetCount() {
    players[0].wins = 0;
    players[1].wins = 0;
    let teams = document.getElementsByClassName('team');
    let player1 = teams[0].children[0].textContent;
    let player2 = teams[1].children[0].textContent;
    player1 = player1.slice(0, player1.length - 1) + '0';
    player2 = player2.slice(0, player2.length - 1) + '0';
    teams[0].children[0].textContent = player1;
    teams[1].children[0].textContent = player2;
}

function game(i) {
    let instructions = document.getElementById('instructions');
    var actualColor = players[actualPlayer].color;
    var nextPlayer = (actualPlayer + 1) % 2;
    var nextColor = players[nextPlayer].color;
    var col = (i % colsNumber);
    var seteado = false;
    var colSelected = document.getElementsByClassName("col").item(col);
    var listChildren = colSelected.children;
    var j = listChildren.length - 1;
    while (!seteado && j >= 0) {
        var rowSelected = listChildren.item(j);
        if (rowSelected.classList.contains(actualColor) || rowSelected.classList.contains(nextColor)) {
            j = j - 1;
        } else {
            rowSelected.classList.add(actualColor);
            seteado = true;
            instructions.textContent = "Turn " + nextColor;
            instructions.style.color = players[nextPlayer].color;
        }
    }

    checkWin();
}

// Event Listeners (escuchadores de eventos)
document.addEventListener("DOMContentLoaded", function () {
    instructions.textContent = "Turn " + players[0].color;
    instructions.style.color = players[0].color;
    let elements = document.getElementsByClassName('col');
    for (var i = 0; i < elements.length; i++) {
        (function (i) {
            elements[i].addEventListener('click', function () {
                game(i);
            }, false);
        })(i);
    }

    document.getElementById('resetButton').addEventListener('click', resetBoard);
    document.getElementById('resetCount').addEventListener('click', resetCount);
});
