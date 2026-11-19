const towers = []
const enemies = []
const TOWER_RANGE = 200
var gameloop = null
var game_area = document.querySelector(".game")
game_area.classList.add("gamehatter")
const music = [
    new Audio("../audio/holst_mars.mp3"),
    new Audio("../audio/klapka.mp3"),
    new Audio("../audio/rakoczi.mp3"),
    new Audio("../audio/wagner_valkyries.mp3"),
]
music_played = music[Math.floor(Math.random() * music.length)]
music_played.play()

var gameloop = null
var game_area = document.querySelector(".game")
var place = ""


var tower_spot = null
var tower_x = [20, 640, 90, 540]
var tower_y = [140, 540, 200, 480, 50, 620]
var x
var y
for(let i = 0; i < 8; i++){

    x = parseInt(i / 2)
    if(i < 2){
        y = i % 2   
    }
    else{
        y = i - 2
    }
    
    game_area.innerHTML +=
    `
    <div class = "tower-spot" onclick = "new_tower(${tower_x[x]  + 5}, ${tower_y[y] + 5}, this)" style="left: ${tower_x[x]}px; top: ${tower_y[y]}px;">

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

function nearest_enemy(tower){
    for(let i = enemies.length - 1; i >= 0; i--){
        if(!enemies[i].isAlive()){
            enemies.splice(i, 1)
        }
    }

    let closest = null
    let closest_distance = TOWER_RANGE
    for(let i = 0; i < enemies.length; i++){
        let dx = (enemies[i].getX() + 10) - (tower.getX() + 20)
        let dy = (enemies[i].getY() + 10) - (tower.getY() + 20)
        let distance = Math.sqrt(dx * dx + dy * dy)
        if(distance <= closest_distance){
            closest = enemies[i]
            closest_distance = distance
        }
    }
    return closest
}

function new_tower(x, y, spot){
    if(place == "ijasz"){
        let tower = new Tower(x, y, ".game")
        tower.shoot(() => {
            let target = nearest_enemy(tower)
            if(target != null){
                new Bullet(tower.getX() + 20, tower.getY() + 20, 8, target, ".game")
            }
        })
        towers.push(tower)

        spot.removeAttribute("onclick")
        place = ""
    }
}

music_played.addEventListener("ended", () => {
    music_played = music[Math.floor(Math.random() * music.length)]
    music_played.play()
})

document.querySelector(".ijasz").addEventListener("click", () => {
    place = "ijasz"
})
