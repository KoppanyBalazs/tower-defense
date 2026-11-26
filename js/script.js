const game_area = document.querySelector(".game")
const hp = document.querySelector(".hp")
const pont = document.querySelector(".pont")
const round = document.querySelector(".round")
const lose_modal = new bootstrap.Modal('#myModal')
const upgradeModal = new bootstrap.Modal('#upgrades')
const buildSound = new Audio("../audio/build.mp3")
const towers = []
const enemies = []
const magusar = 150
const langar = 100
const aknaar = 25
const tower_range = 200


var gameloop = null
var hp_interval = null
var pont_interval = null

var difficulty = 1
var place = ""
var tower_spot = null
var tower_x = [20, 630, 90, 540]
var tower_y = [140, 540, 225, 450, 50, 620]
var tower_facing = ["e", "w"]
const no_interaction_sound = new Audio("../audio/not_intractable.mp3")
const music = [
    new Audio("../audio/music/holst_mars.mp3"),
    new Audio("../audio/music/stronghold_appy_times.mp3"),
    new Audio("../audio/music/stronghold_castle_jam.mp3"),
    new Audio("../audio/music/stronghold_the_chant.mp3"),
]
music.forEach(zene => {
    zene.volume = 0.6
})
music_played = music[Math.floor(Math.random() * music.length)]
music_played.play()


for (let i = 0; i < 8; i++) {
    let x = parseInt(i / 2)
    let facing = x % 2
    
    let y = i
    if (i >= 2) {
        y -= 2
    }
    game_area.innerHTML +=
    `
    <div class = "tower-spot" onclick = "new_tower(${tower_x[x] + 5}, ${tower_y[y] - 35}, '${tower_facing[facing]}')" style="left: ${tower_x[x]}px; top: ${tower_y[y]}px;">

    </div>
    `
}

gameloop = setInterval(() => {
    var x = 100
    var speed = (difficulty <= 3) ? difficulty  + Math.round((Math.random())) : 4
    enemy = new Enemy(x, 0, speed, difficulty + Math.round((Math.random())), ".game")
    enemy.create()
    enemies.push(enemy)
    console.log((2200 - (difficulty * 200) >= 300) ?  2200 - (difficulty * 200) : 300)
}, (2200 - (difficulty * 200) > 300) ?  2200 - (difficulty * 200) : 300) //Minimum 300 ms-enként jön enemy, alapból 2000 - (körök száma * 200) ms-enként 

pont_interval = setInterval(() => {
    difficulty = 1 + parseInt(Bullet.getPont_collected() / 100)
    pont.innerHTML = Bullet.getPont();
    round.innerHTML = difficulty
}, 20);

hp_interval = setInterval(() => {
    hp.innerHTML = Enemy.getHp()

    if(Enemy.getHp() <= 0){
        end_game()
    }

}, 20)

function nearest_enemy(tower) {
    var closest = null
    var closest_distance = tower_range
    var dx
    var dy
    var distance
    for (let i = enemies.length - 1; i >= 0; i--) {
        if (!enemies[i].isAlive()) {
            enemies.splice(i, 1)
        }
    }

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

function new_tower(x, y, facing){
    let tower
    let dam
    if(place == "magus" && Bullet.getPont() >= magusar){
        dam = 2
        Bullet.setPont(Bullet.getPont() - magusar)
        tower = new Tower(x, y, 1500, facing, ".game", "tower")
        
    }
    else if(place == "lang" && Bullet.getPont() >= langar){
        dam = 0.15
        Bullet.setPont(Bullet.getPont() - langar)
        tower = new Tower(x, y, 100, facing, ".game", "tower-pyro")
    }
    else if((place == "lang" && Bullet.getPont() < langar) || (place == "magus" && Bullet.getPont() < magusar)){
        no_interaction_sound.play()
    }

    if(!tower){
        return
    }

    tower.shoot(() => {
        let target = nearest_enemy(tower)
        if (target != null) {
            new Bullet(tower.getX() + 20, tower.getY() + 20, 6, dam, target, ".game")
        }    
    })

    towers.push(tower)
    buildSound.currentTime = 0
    buildSound.play()
    place = ""
}

function end_game(){
    clearInterval(gameloop)
    gameloop = null
    Enemy.setHp(3)
    enemies.forEach(enemy => {enemy.remove()});
    towers.forEach(tower => {tower.remove()});
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

document.querySelector(".lang").addEventListener("click", () => {
    place = "lang"
})

document.querySelector(".akna").addEventListener("click", () => {
    place = "akna"
})

game_area.addEventListener("click", (e) => {
    if(place == "akna"){
        let rect = game_area.getBoundingClientRect()
        let tmp_tower = new Tower(e.clientX - rect.left, e.clientY - rect.top, 0, "e", ".game", "magus")
        let target = nearest_enemy(tmp_tower)
        if(target != null && Bullet.getPont() > aknaar){
            Bullet.setPont(Bullet.getPont() - aknaar)
            let akna = new Bullet(e.clientX - rect.left - 25, e.clientY - rect.top - 15, 0, 5, nearest_enemy(tmp_tower), ".game")
            akna.getElement().classList.add("mine")
        }
        else{
            no_interaction_sound.play()
        }
    }
    
})