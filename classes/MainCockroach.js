import Cockroach from './Cockroach'

export default class MainCockroach extends Cockroach {
    constructor({ cvs, ctx, img }) {
        super({
            cvs,
            ctx,
            img,
        })
    }

    draw() {
        this.ctx.globalAlpha = this.opacity
        const sx = (this.frameWidth * this.frameCurrent)
        const sy = 0

        const dWidthScale = +(this.frameWidth / this.frameHeight).toFixed(3)
        const dHeightScale = +(this.frameHeight / this.frameWidth).toFixed(3)


        const dWidth = this.cvs.height > this.cvs.width ? (this.cvs.width) : (this.cvs.height * dWidthScale)
        const dHeight = this.cvs.height > this.cvs.width ? (this.cvs.width * dHeightScale) : (this.cvs.height)
        const dx = (this.cvs.width - dWidth) / 2
        const dy = (this.cvs.height - dHeight) / 2

        this.ctx.drawImage(
            this.img,
            sx,
            sy,
            this.frameWidth,
            this.frameHeight,
            dx,
            dy,
            dWidth,
            dHeight,
        )
    }
}