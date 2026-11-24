class Tower{
    #x
    #y
    #speed
    #facing
    #container
    #element
    #shoot_interval

    constructor(x, y, facing, container){
        this.setX(x)
        this.setY(y)
        this.setFacing(facing)
        this.setContainer(container)
        this.create()
    }

    setX(x){
        this.#x = x
    }

    setY(y){
        this.#y = y
    }

    setFacing(facing){
        this.#facing = facing
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

    getFacing(){
        return this.#facing
    }

    create(){
        this.#element = document.createElement("div")
        this.#element.style.left = this.#x + "px"
        this.#element.style.top = this.#y + "px"
        this.#element.classList.add("tower")
        this.#element.classList.add(`facing-${this.getFacing()}`)
        console.log(this.#element)
        console.log(this.#container)
        this.#container.appendChild(this.#element)
    }

    shoot(func_to_execute){
        this.#shoot_interval = setInterval(func_to_execute, 1500)
    }

    remove(){
        clearInterval(this.#shoot_interval)
        this.#element.remove()
    }
}