class Tower{
    #x
    #y
    #speed
    #container
    #element
    #shoot_interval

    constructor(x, y, container){
        this.setX(x)
        this.setY(y)
        this.setContainer(container)
        this.create()
    }

    setX(x){
        this.#x = x
    }

    setY(y){
        this.#y = y
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
        this.#element.classList.add("tower")
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