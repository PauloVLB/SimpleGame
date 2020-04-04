const screen = document.getElementById('screen');
const context = screen.getContext('2d');

const game = {
    'player': { x: 0, y: 9 },
    'fruit': { x: 3, y: 2, isRed: false}
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
    movements[event.key](game.player);
});

let score = 0;
let spawnTime = document.getElementById("spawnTime").value;
let spawn = setInterval(spawnFruit, spawnTime);
let fixed = false;

renderScreen();
function renderScreen() {
    clearScreen();

    const player = game.player;
    const fruit = game.fruit;

    context.fillStyle = 'black';
    context.fillRect(player.x, player.y, 1, 1);
    
    if(fruit !== undefined) {
        let fruitColor = 'green';
        let increment = 1;

        if(fruit.isRed){
            fruitColor = 'red';
            increment = 10;
        } 

        context.fillStyle = fruitColor;
        context.fillRect(fruit.x, fruit.y, 1, 1);

        if (player.x === fruit.x && player.y === fruit.y) {
            delete game.fruit;

            score += increment;
            document.getElementById("score").innerHTML = score;
            
            if (!fixed) {
                spawnTime = 2000 - (score * 10);
            }
            clearInterval(spawn);
            spawn = setInterval(spawnFruit, spawnTime);
            
            document.getElementById("spawnTime").value = spawnTime;
        }
    }

    requestAnimationFrame(renderScreen);
}

function changeTime() {
    spawnTime = document.getElementById("spawnTime").value;
    clearInterval(spawn);
    spawn = setInterval(spawnFruit, spawnTime);
}

function spawnFruit() {
    let chance = false;
    if (Math.floor(Math.random() * 10) === 1){ 
        chance = true; 
    }
    game.fruit = {
        x: Math.floor(Math.random() * 10),
        y: Math.floor(Math.random() * 10),
        isRed: chance
    };
}

function changeFixed() {
    fixed = document.getElementById("fixed").checked;
}

function clearScreen() {
    context.clearRect(0, 0, 10, 10);
}
