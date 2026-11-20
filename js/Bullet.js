class Bullet{

    #x
    #y
    #speed
    #target
    #container
    #element
    #move_interval

    static pont = 250;


    constructor(x, y, speed, target, container){
        this.setX(x)
        this.setY(y)
        this.setSpeed(speed)
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



    create(){
        this.#element = document.createElement("div")
        this.#element.style.left = this.#x + "px"
        this.#element.style.top = this.#y + "px"
        this.#element.classList.add("bullet")
        this.#container.appendChild(this.#element)
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

            let dx = target_x - this.#x
            let dy = target_y - this.#y
            let distance = Math.sqrt(dx * dx + dy * dy)

            if(distance <= this.#speed){
                this.#target.remove()
                this.remove()
                Bullet.pont += 10;
                    return

            }

            this.#x += (dx / distance) * this.#speed
            this.#y += (dy / distance) * this.#speed

            this.#element.style.left = this.#x + "px"
            this.#element.style.top = this.#y + "px"
            this.#element.style.transform = `translate(-50%, -50%) rotate(${Math.atan2(dy, dx)}rad)`
        }, 25)
    }

    remove(){
        clearInterval(this.#move_interval)
        this.#element.remove()
    }
}
