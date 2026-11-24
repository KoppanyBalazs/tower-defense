const towers = []
const enemies = []
const tower_range = 200
const lose_modal = new bootstrap.Modal('#myModal')
var gameloop = null
var game_area = document.querySelector(".game")
game_area.classList.add("gamehatter")

var hp_interval = null

const music = [
    new Audio("../audio/holst_mars.mp3"),
    new Audio("../audio/wagner_valkyries.mp3"),
    new Audio("../audio/farewell_of_slavianka.mp3"),
    new Audio("../audio/shostakovich_waltz_no_2.mp3"),
    new Audio("../audio/stronghold_appy_times.mp3"),
    new Audio("../audio/stronghold_castle_jam.mp3"),
    new Audio("../audio/stronghold_the_chant.mp3"),
    new Audio("../audio/the_varangians_faraji.mp3"),
    new Audio("../audio/venice_combat_ac2.mp3"),
    new Audio("../audio/william_tell.mp3"),
]
music_played = music[Math.floor(Math.random() * music.length)]
music_played.play()

var hp = document.querySelector(".hp")
var place = ""

var tower_spot = null
var tower_x = [20, 640, 90, 540]
var tower_y = [140, 540, 200, 480, 50, 620]
var x
var y
var facing
for (let i = 0; i < 8; i++) {

    x = parseInt(i / 2)
    if (i < 2) {
        y = i % 2
    }
    else {
        y = i - 2
    }

    game_area.innerHTML +=
        `
    <div class = "tower-spot" onclick = "new_tower(${tower_x[x] + 5}, ${tower_y[y] + 5}, ${facing})" style="left: ${tower_x[x]}px; top: ${tower_y[y]}px;">

    </div>
    `
}

gameloop = setInterval(() => {
    var x = 100
    var speed = 2
    enemy = new Enemy(x, 0, speed, ".game")
    enemy.create()
    enemies.push(enemy)
}, 1000)

hp_interval = setInterval(() => {
    hp.innerHTML = Enemy.getHp()

    if(Enemy.getHp() <= 0){
        end_game()
    }

}, 20)

function nearest_enemy(tower) {
    for (let i = enemies.length - 1; i >= 0; i--) {
        if (!enemies[i].isAlive()) {
            enemies.splice(i, 1)
        }
    }

    var closest = null
    var closest_distance = tower_range
    var dx
    var dy
    var distance
    for (let i = 0; i < enemies.length; i++) {
        dx = (enemies[i].getX() + 10) - (tower.getX() + 20)
        dy = (enemies[i].getY() + 10) - (tower.getY() + 20)
        distance = Math.sqrt(dx * dx + dy * dy)
        if (distance <= closest_distance) {
            closest = enemies[i]
            closest_distance = distance
        }
    }
    return closest
}

function new_tower(x, y, facing) {
    if (place == "magus") {
        let tower = new Tower(x, y, "e", ".game")
        tower.shoot(() => {
            let target = nearest_enemy(tower)
            if (target != null) {
                new Bullet(tower.getX() + 20, tower.getY() + 20, [6, 6], "magus", target, ".game")
            }
        })
        towers.push(tower)

        place = ""
    }
}

function end_game(){
    enemies.forEach(enemy => {enemy.remove()});
    towers.forEach(tower => {tower.remove()});
    gameloop = null
    music_played.pause()
    lose_modal.show()
}

music_played.addEventListener("ended", () => {
    let last_music = music_played
    do{
        music_played = music[Math.floor(Math.random() * music.length)]
    }while(last_music === music_played)
    
    music_played.play()
})

document.querySelector(".magus").addEventListener("click", () => {
    place = "magus"
})
