class Bullet{

    #x
    #y
    #speed
    #target
    #container
    #element
    #move_interval
    #type
    #direction

    static pont = 1500;


    constructor(x, y, speed, type, target, container){
        this.setX(x)
        this.setY(y)
        this.setSpeed(speed)
        this.setType(type)
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

    setType(type){
        this.#type = type
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

    getTarget(){
        return this.#target
    }

    getContainer(){
        return this.#container
    }

    getType(){
        return this.#type
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

            let dx = target_x - this.getX()
            let dy = target_y - this.getY()
            let distance = Math.sqrt(dx * dx + dy * dy)

            if(distance <= Math.abs(this.getSpeed()[0])){
                if(this.#target.takeDamage(0.01)){
                    Bullet.pont += 10
                }
                this.remove()
                return

            }

            if(this.getType() == "magus"){
                this.setX(this.getX() + (dx / distance) * this.getSpeed()[0])
                this.setY(this.getY() + (dy / distance) * this.getSpeed()[1])
            }
            else if(this.getType() == "ijasz"){
                if(this.getSpeed()[1] == 0){
                    this.setX(this.getX() + this.getSpeed()[0])
                }
                else if(this.getSpeed[0] == 0){
                    this.setY(this.getY() + this.getSpeed()[1])
                }
            }

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
