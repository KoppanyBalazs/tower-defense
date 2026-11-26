var open_upgrade_hivva = null
function open_upgrade(tower) { open_upgrade_hivva = tower }

var t1 = new Tower(10, 20, 500, "e", ".game-area", "tower")
console.assert(t1.getX() === 10, "Tower: getX hiba")
console.assert(t1.getY() === 20, "Tower: getY hiba")
console.assert(t1.getInterval_ms() === 500, "Tower: getInterval_ms hiba")
console.assert(t1.getFacing() === "e", "Tower: getFacing hiba")
console.assert(t1.getType() === "tower", "Tower: getType hiba")
console.assert(t1.getLevel() === 0, "Tower: kezdő szint 0 kell legyen")

var tower_el = document.querySelector(".game-area").lastElementChild
console.assert(tower_el.classList.contains("tower"), "Tower: hiányzik a típus class")
console.assert(tower_el.classList.contains("facing-e"), "Tower: hiányzik a facing class")
console.assert(tower_el.style.left === "10px" && tower_el.style.top === "20px", "Tower: rossz pozíció")

tower_el.click()
console.assert(open_upgrade_hivva === t1, "Tower: kattintásra open_upgrade(this)-nek kell futnia")

t1.upgrade()
console.assert(t1.getLevel() === 1, "Tower: upgrade után szint 1")
console.assert(tower_el.classList.contains("lvl-1"), "Tower: hiányzik a lvl-1 class")
console.assert(t1.getInterval_ms() === 350, "Tower: upgrade után 350 ms kell (500 * 0.7)")
t1.upgrade()
console.assert(t1.getLevel() === 2, "Tower: upgrade után szint 2")
console.assert(!tower_el.classList.contains("lvl-1") && tower_el.classList.contains("lvl-2"), "Tower: lvl class csere hiba")
console.assert(t1.getInterval_ms() === 245, "Tower: második upgrade után 245 ms kell")

var lovesek = 0
var t2 = new Tower(100, 100, 100, "w", ".game-area", "tower-pyro")
t2.shoot(() => { lovesek++ })
setTimeout(() => {
    console.assert(lovesek >= 3 && lovesek <= 5, "Tower: ~4 lövés kellett 450 ms alatt, lett: " + lovesek)
    t2.remove()
    var lovesek_remove_utan = lovesek
    setTimeout(() => {
        console.assert(lovesek === lovesek_remove_utan, "Tower: remove után nem lőhet tovább")
    }, 300)
}, 450)

var lovesek3 = 0
var t3 = new Tower(200, 200, 200, "e", ".game-area", "tower")
t3.shoot(() => { lovesek3++ })
t3.upgrade() // 140 ms
setTimeout(() => {
    console.assert(lovesek3 >= 3, "Tower: upgrade után is lőnie kell, lett: " + lovesek3)
    t3.remove()
}, 500)
