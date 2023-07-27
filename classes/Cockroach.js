export default class Cockroach {
    static COUNT_FRAMES = 27
    constructor({
        cvs,
        ctx,
        img,
        position,
        scale = 1,
        mirrored = false,
        opacity = 1,
        frameCurrent = 0,
        framesHold = 2,
    }) {
        this.cvs = cvs
        this.ctx = ctx
        this.img = img

        this.position = position
        this.frameWidth = img.width / Cockroach.COUNT_FRAMES
        this.frameHeight = img.height

        this.scale = scale
        this.mirrored = mirrored
        this.opacity = opacity

        this.framesElapsed = 0
        this.framesHold = framesHold
        this.frameCurrent = frameCurrent
    }

    draw() {
        this.ctx.globalAlpha = this.opacity
        const sx = (this.frameWidth * this.frameCurrent)
        const sy = 0

        this.ctx.drawImage(
            this.img,
            sx,
            sy,
            this.frameWidth,
            this.frameHeight,
            this.position.x,
            this.position.y,
            this.frameWidth * this.scale,
            this.frameHeight * this.scale,
        )
    }

    animateFrames() {
        this.framesElapsed--
        if (this.framesElapsed % this.framesHold === 0) {
            if (this.frameCurrent < Cockroach.COUNT_FRAMES - 1) {
                this.frameCurrent++
            } else {
                this.frameCurrent = 0
            }
        }
    }

    update() {
        this.draw()
        this.animateFrames()
    }
}