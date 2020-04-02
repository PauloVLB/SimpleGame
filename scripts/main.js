const screen = document.getElementById('screen');
const context = screen.getContext('2d');

const game = {
    players: {
        'player1': { x: 0, y: 9},
    },

    fruits: {
        'fruit1': { x: 3, y: 2}
    }
};

const movements = {
    'ArrowUp'    : (player) => {
        player.y = player.y - 1 >= 0 ? player.y - 1 : player.y;
    },
    
    'ArrowDown'  : (player) => {
        player.y = player.y + 1 < screen.height ? player.y + 1 : player.y;
    },

    'ArrowLeft'  : (player) => {
        player.x = player.x - 1 >= 0 ? player.x - 1 : player.x;
    },

    'ArrowRight' : (player) => {
        player.x = player.x + 1 < screen.width ? player.x + 1 : player.x;
    } 
}

document.addEventListener('keydown', (event) => {
    movements[event.key](game.players.player1);
});

renderScreen();

function renderScreen() {
    clearScreen();

    for (const playerId in game.players) {
        const player = game.players[playerId];

        context.fillStyle = 'black';
        context.fillRect(player.x, player.y, 1, 1);
    }

    for (const fruitId in game.fruits) {
        const fruit = game.fruits[fruitId];

        context.fillStyle = 'green';
        context.fillRect(fruit.x, fruit.y, 1, 1);
    }

    requestAnimationFrame(renderScreen);
}

function clearScreen() {
    context.clearRect(0, 0, 10, 10);
}
