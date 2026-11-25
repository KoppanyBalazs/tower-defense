const enemyDeathSound = new Audio("../audio/viking_death.mp3")
enemyDeathSound.volume = 0.6
class Enemy{

    #x
    #y
    #speed
    #container
    #element
    #move_interval
    #alive = true
    #health
    #bar
    static #hp = 3


    constructor(x, y, speed, health, container){
        this.setX(x)
        this.setY(y)
        this.setSpeed(speed)
        this.setHealth(health)
        this.setContainer(container)
    }

    setX(x){
        this.#x = x
    }

    setY(y){
        this.#y = y
    }

    setSpeed(speed){
        this.#speed = speed
    }

    setContainer(container){
        this.#container = document.querySelector(container)
    }

    setHealth(health){
        this.#health = health
    }

    static setHp(hp){
        this.#hp = hp
    }

    getX(){
        return this.#x
    }

    getY(){
        return this.#y
    }

    isAlive(){
        return this.#alive
    }

    static getHp(){
        return Enemy.#hp
    }

    create(){
        this.#element = document.createElement("div")//Majd img csak kellenek még képek lowkey
        this.#element.style.left = this.#x + "px"
        this.#element.style.top = this.#y + "px"
        this.#element.classList.add("enemy")
        this.#bar = document.createElement("div")
        this.#bar.classList.add("hp-bar")
        this.#element.appendChild(this.#bar)
        this.#container.appendChild(this.#element)
        this.move()

    }

    move(){
        this.#move_interval = setInterval(() => {
            if(this.#y < 525 && this.#x <= 550){
                if(this.#y < 150){
                    this.#y += this.#speed
                }
                else{
                    this.#x += this.#speed
                }
                
            }
            else if(this.#x >= 100){
                if(this.#y < 525){
                    this.#y += this.#speed
                }
                else{
                    this.#x -= this.#speed
                }
            }
            else{
                this.#y += this.#speed
            }

            this.#element.style.top = this.#y + "px" 
            this.#element.style.left = this.#x + "px"

            if(this.#y >= this.#container.offsetHeight){
                Enemy.#hp--
                console.log(Enemy.#hp)
                this.remove()
            }
        }, 25)
    }

takeDamage(damage){
    this.#health -= damage
    this.#bar.style.width = (this.#health / 4 * 100) + "%"

    if(this.#health <= 0){
        enemyDeathSound.currentTime = 0
        enemyDeathSound.play()

        setTimeout(() => {
            enemyDeathSound.pause()
            enemyDeathSound.currentTime = 0
        }, 1000)

        this.remove()
        return true
    }
    return false
}

    remove(){
        this.#alive = false
        clearInterval(this.#move_interval)
        this.#element.remove()

    }
}