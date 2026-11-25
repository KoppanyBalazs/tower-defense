class Tower{
    #x
    #y
    #interval_ms
    #facing
    #container
    #element
    #shoot_interval
    #type


    constructor(x, y, interval_ms, facing, container, type = "tower"){
        this.setX(x)
        this.setY(y)
        this.setIntervalMs(interval_ms)
        this.setFacing(facing)
        this.setContainer(container)
        this.setType(type)
        this.create()
    }

    setX(x){
        this.#x = x
    }

    setY(y){
        this.#y = y
    }

    setIntervalMs(interval_ms){
        this.#interval_ms = interval_ms
    }

    setFacing(facing){
        this.#facing = facing
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

    getIntervalMs(){
        return this.#interval_ms
    }

    getFacing(){
        return this.#facing
    }

    getType(){
        return this.#type
    }

    create(){
        this.#element = document.createElement("div")
        this.#element.style.left = this.#x + "px"
        this.#element.style.top = this.#y + "px"
        this.#element.classList.add(this.#type)
        this.#element.classList.add(`facing-${this.getFacing()}`)
        this.#container.appendChild(this.#element)
        this.#element.addEventListener("click", () => {
        upgradeModal.show()})
    }

    shoot(func_to_execute){
        this.#shoot_interval = setInterval(func_to_execute, this.getIntervalMs())
    }

    remove(){
        clearInterval(this.#shoot_interval)
        this.#element.remove()
    }
}
