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
gameloop = setInterval(() => {
    var x = 100
    var speed = 2
    enemy = new Enemy(x, 0, speed, ".game")
    enemy.create()
}, 1000)


music_played.addEventListener("ended", () => {
    music_played = music[Math.floor(Math.random() * music.length)]
    music_played.play()
})
