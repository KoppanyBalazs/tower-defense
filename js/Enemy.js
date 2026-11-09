class Enemy{

    #x
    #y
    #speed
    #container
    #element
    #move_interval
    static #hp = 3

    constructor(x, y, speed, container){
        this.setX(x)
        this.setY(y)
        this.setSpeed(speed)
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

    getX(){
        return this.#x
    }

    getY(){
        return this.#y
    }

    create(){
        this.#element = document.createElement("div")//Majd img csak kellenek még képek lowkey
        this.#element.style.left = this.#x + "px"
        this.#element.style.top = this.#y + "px"
        this.#element.classList.add("enemy")
        this.#container.appendChild(this.#element)
        this.move()

    }

    move(){
        this.#move_interval = setInterval(() => {
            if(this.#y < 100 && this.#x <= 600){
                this.#y += this.#speed
            }
            else if(this.#x <= 600 && (this.#y >= 100 && this.#y < 300)){
                this.#x += this.#speed
            }
            else if(this.#y < 300 && this.#x >= 50){
                this.#y += this.#speed
            }
            else if(this.#x > 50 && this.#y >= 300){
                this.#x -= this.#speed
            }
            else if(this.#y <= 450 && this.#x <= 50){
                this.#y += this.#speed
            }

            this.#element.style.top = this.#y + "px" 
            this.#element.style.left = this.#x + "px"

            if(this.#y >= this.#container.offsetHeight){
                Enemy.#hp--
                this.remove()
            }
            if(this.is_hit(document.querySelectorAll(".bullet"))){
                this.remove()
            }
        }, 25)
    }

    remove(){
        clearInterval(this.#move_interval)
        this.#element.remove()
    }

    is_hit(bullets){
        for(let i = 0; i < bullets.length; i++){
            //eltalálta e a golyó?
        }
    }
}