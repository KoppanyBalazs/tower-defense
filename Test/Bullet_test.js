var enemies_for_testing = [new Enemy(200, 300, 0, 2, ".game-area")]
enemies_for_testing[0].create()
var test_case01 = new Bullet(100, 200, 2, 2, enemies_for_testing[0], ".game-area")
console.log(test_case01.debugger_tool())
console.assert(test_case01.debugger_tool() === `100;200;2;2;Enemy:(200,300);<div class="game-area"></div>`, "hiba a konstruktorban vagy a getterekben")

var test_cases02 = []
var test_interval = setInterval(() => {
    enemies_for_testing.push(new Enemy(0 + parseInt(Math.random() * 600), 0 + parseInt(Math.random() * 600), 0, 3, ".game-area"))
    enemies_for_testing[enemies_for_testing.length - 1].create()
    test_cases02.push(new Bullet(0 + parseInt(Math.random() * 600), parseInt(Math.random() * 600), 2, 2 + Math.round(Math.random()), enemies_for_testing[enemies_for_testing.length - 1], ".game-area"))
}, 500)

setTimeout(() => {
    clearInterval(test_interval)
    test_interval = null
}, 5500)

setTimeout(() => {
    for (let i = 1; i < enemies_for_testing.length; i++) {
        console.log(enemies_for_testing[i].getHealth(), 3 - test_cases02[i - 1].getDam())
        console.assert(enemies_for_testing[i].getHealth() === 3 - test_cases02[i - 1].getDam(), "Hiba az Enemy és a Bullet class interakcióival")
    }
}, 15000)