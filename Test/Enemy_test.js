var e1 = new Enemy(100, 0, 2, 3, ".game-area")
console.assert(e1.getX() === 100, "Enemy: getX hiba")
console.assert(e1.getY() === 0, "Enemy: getY hiba")
console.assert(e1.getSpeed() === 2, "Enemy: getSpeed hiba")
console.assert(e1.getHealth() === 3, "Enemy: getHealth hiba")
console.assert(e1.isAlive() === true, "Enemy: kezdetben életben kell lennie")
console.assert(e1.getContainer() === document.querySelector(".game-area"), "Enemy: getContainer hiba")

var e2 = new Enemy(0, 0, 0, 3, ".game-area")
e2.create()
console.assert(e2.takeDamage(1) === false, "Enemy: 1 sebzéstől nem halhat meg (3 hp)")
console.assert(e2.getHealth() === 2, "Enemy: életerő csökkenés hiba")
console.assert(e2.isAlive() === true, "Enemy: még életben kell lennie")

console.assert(e2.takeDamage(2) === true, "Enemy: takeDamage-nek true-t kell adnia halálkor")
console.assert(e2.isAlive() === false, "Enemy: halál után isAlive false")

var e3 = new Enemy(50, 60, 0, 4, ".game-area")
e3.create()
var el3 = document.querySelector(".game-area").lastElementChild
console.assert(el3.classList.contains("enemy"), "Enemy: hiányzik az enemy class")
console.assert(el3.style.left === "50px" && el3.style.top === "60px", "Enemy: rossz kezdőpozíció")
console.assert(el3.querySelector(".hp-bar").style.width === "40px", "Enemy: hp bar szélesség hiba")
e3.remove()
console.assert(!document.querySelector(".game-area").contains(el3), "Enemy: remove után ki kell kerülnie a DOM-ból")

var e4 = new Enemy(0, 0, 0, 7, ".game-area")
e4.create()
console.assert(document.querySelector(".game-area").lastElementChild.classList.contains("enemy-big"), "Enemy: hiányzik az enemy-big class")
e4.remove()

var e5 = new Enemy(100, 0, 5, 3, ".game-area")
e5.create()
setTimeout(() => {
    console.assert(e5.getY() > 0, "Enemy: nem mozdult lefelé")
    console.assert(e5.getX() === 100, "Enemy: az első szakaszon nem változhat az x")
    e5.remove()
}, 300)

Enemy.setHp(3)
var e6 = new Enemy(50, 699, 5, 3, ".game-area")
e6.create()
setTimeout(() => {
    console.assert(Enemy.getHp() === 2, "Enemy: a statikus hp-nek csökkennie kellett")
    console.assert(e6.isAlive() === false, "Enemy: a pálya alján el kell tűnnie")
    Enemy.setHp(3)
}, 300)
