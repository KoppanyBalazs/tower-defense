const towers = []

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
    
    tower_spot = document.createElement("div")
    tower_spot.style.left = tower_x[x] + "px"
    tower_spot.style.top = tower_y[y] + "px" 

    tower_spot.classList.add("tower-spot")
    tower_spot.onclick = () => {
        new_tower(tower_x[x], tower_y[y])
        console.log("új")
    }
    game_area.appendChild(tower_spot)
}

gameloop = setInterval(() => {
    var x = 100
    var speed = 2
    enemy = new Enemy(x, 0, speed, ".game")
    enemy.create()
}, 1000)

function new_tower(x, y){
    console.log(x)
    if(place == "ijasz"){
        let tower = new Tower(x, y, ".game")
        tower.shoot(() => {console.log("lövés")})
        towers.push(tower)

    }
}

music_played.addEventListener("ended", () => {
    music_played = music[Math.floor(Math.random() * music.length)]
    music_played.play()
})

document.querySelector(".ijasz").addEventListener("click", () => {
    place = "ijasz"
})
