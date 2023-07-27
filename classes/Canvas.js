export default class Canvas {
    constructor() {
        this.cvs = document.createElement('canvas')
        this.cvs.id = 'cvs'
        this.cvs.classList.add('cue-in')
        this.ctx = this.cvs.getContext('2d')
    }

    init() {
        this.resize()
        this.clear()
        document.body.append(this.cvs)
        document.body.onresize = () => this.resize()
    }

    resize() {
        this.cvs.width = document.body.clientWidth
        this.cvs.height = document.body.clientHeight
    }

    clear() {
        this.ctx.fillStyle = 'black'
        this.ctx.fillRect(0, 0, this.cvs.width, this.cvs.height)
    }
}