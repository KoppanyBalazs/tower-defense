const fireballSound = new Audio("../audio/fireball.mp3")
const pyroSound = new Audio("../audio/pyro.mp3")

fireballSound.volume = 0.5
pyroSound.volume = 0.2
var pyroSoundTime = 0

class Bullet{

    #x
    #y
    #speed
    #dam
    #interval_ms
    #target
    #container
    #element
    #move_interval
    #direction

    static pont = 400;
 

    constructor(x, y, speed, dam, target, container){
        this.setX(x)
        this.setY(y)
        this.setSpeed(speed)
        this.setDam(dam)
        this.setTarget(target)
        this.setContainer(container)
        this.create()
        
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

    setDam(dam){
        this.#dam = dam
    }

    setTarget(target){
        this.#target = target
    }


    setContainer(container){
        this.#container = document.querySelector(container)
    }

    getX(){
        return this.#x
    }

    getY(){
        return this.#y
    }

    getSpeed(){
        return this.#speed
    }

    getDam(){
        return this.#dam
    }

    getIntervalMs(){
        return this.#interval_ms
    }

    getTarget(){
        return this.#target
    }

    getContainer(){
        return this.#container
    }

    create(){
        this.#element = document.createElement("div")
        this.#element.style.left = this.#x + "px"
        this.#element.style.top = this.#y + "px"
        this.#element.classList.add("bullet")
        this.#container.appendChild(this.#element)
if (this.#container) {
    if (this.#dam == 0.15) {
if (Date.now() - pyroSoundTime > 3000) {
    pyroSound.currentTime = 0
    pyroSound.play()
    pyroSoundTime = Date.now()
}
    }
    else {
        fireballSound.currentTime = 0
        fireballSound.play()
    }
}
        this.move()
        
    }

    move(){
        this.#move_interval = setInterval(() => {
            if(!this.#target.isAlive()){
                this.remove()
                return
            }

            let target_x = this.#target.getX() + 10
            let target_y = this.#target.getY() + 10

            let dx = target_x - this.getX()
            let dy = target_y - this.getY()
            let distance = Math.sqrt(dx * dx + dy * dy)

            if(distance <= Math.abs(this.getSpeed())){
                console.log(this.getDam())
                if(this.#target.takeDamage(this.getDam())){
                    Bullet.pont += 10
                }
                this.remove()
                return

            }

            this.setX(this.getX() + (dx / distance) * this.getSpeed())
            this.setY(this.getY() + (dy / distance) * this.getSpeed())


            this.#element.style.left = this.getX() + "px"
            this.#element.style.top = this.getY() + "px"
            this.#element.style.transform = `translate(-50%, -50%) rotate(${Math.atan2(dy, dx)}rad)`
        }, 25)
    }

    remove(){
        clearInterval(this.#move_interval)
        this.#element.remove()
    }
}
