const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
canvas.width = 600;
canvas.height = 400;

const player = { x: 50, y: 175, width: 20, height: 20, speed: 2 };
const goal = { x: 530, y: 175, width: 40, height: 40 };
const enemies = [
    { x: 150, y: 100, width: 20, height: 20, speed: 2, direction: 1 },
    { x: 300, y: 250, width: 20, height: 20, speed: 2, direction: -1 }
];
let keys = {};

window.addEventListener("keydown", (e) => (keys[e.key] = true));
window.addEventListener("keyup", (e) => (keys[e.key] = false));

function movePlayer() {
    if (keys["ArrowUp"] && player.y > 0) player.y -= player.speed;
    if (keys["ArrowDown"] && player.y + player.height < canvas.height) player.y += player.speed;
    if (keys["ArrowLeft"] && player.x > 0) player.x -= player.speed;
    if (keys["ArrowRight"] && player.x + player.width < canvas.width) player.x += player.speed;
}

function moveEnemies() {
    enemies.forEach(enemy => {
        enemy.y += enemy.speed * enemy.direction;
        if (enemy.y <= 0 || enemy.y + enemy.height >= canvas.height) {
            enemy.direction *= -1;
        }
    });
}

function detectCollision(a, b) {
    return (
        a.x < b.x + b.width &&
        a.x + a.width > b.x &&
        a.y < b.y + b.height &&
        a.y + a.height > b.y
    );
}

function updateGame() {
    movePlayer();
    moveEnemies();
    enemies.forEach(enemy => {
        if (detectCollision(player, enemy)) {
            player.x = 50;
            player.y = 175;
        }
    });
    if (detectCollision(player, goal)) {
        alert("You Win!");
        player.x = 50;
        player.y = 175;
    }
}

function drawGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "red";
    ctx.fillRect(player.x, player.y, player.width, player.height);
    ctx.fillStyle = "green";
    ctx.fillRect(goal.x, goal.y, goal.width, goal.height);
    ctx.fillStyle = "blue";
    enemies.forEach(enemy => ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height));
}

function gameLoop() {
    updateGame();
    drawGame();
    requestAnimationFrame(gameLoop);
}

gameLoop();
