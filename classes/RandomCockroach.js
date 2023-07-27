import Cockroach from './Cockroach'
import getRandomInRange from '../utils/getRandomInRange'
import getRandomInList from '../utils/getRandomInList'

const RANGE_OPACITY = [2, 9]
const RANGE_SCALE = [1, 4]
const RANGE_MIRRORED = [false, true]
const RANGE_FRAMESHOLD = [2, 5]
const RANGE_SPEED = [4, 7]

export default class RandomCockroach extends Cockroach {
    constructor({
        cvs,
        ctx,
        img,
    }) {
        const frameWidth = img.width / Cockroach.COUNT_FRAMES
        const mirrored = getRandomInList(...RANGE_MIRRORED)
        const position = {
            x: mirrored ? window.innerWidth + frameWidth : -frameWidth,
            y: getRandomInRange(0, window.innerHeight),
        }

        super({
            cvs,
            ctx,
            img,
            position,
            scale: getRandomInRange(...RANGE_SCALE) / 10,
            mirrored,
            opacity: getRandomInRange(...RANGE_OPACITY) / 10,
            frameCurrent: getRandomInRange(0, (Cockroach.COUNT_FRAMES - 1)),
            framesHold: getRandomInRange(...RANGE_FRAMESHOLD),
        })
        this.frameWidth = frameWidth
        this.speed = getRandomInRange(...RANGE_SPEED) * (mirrored ? -1 : 1)
    }

    update() {
        super.update()
        this.position.x += this.speed
        if (
            (this.mirrored && this.position.x <= -this.frameWidth * this.scale)
            || (!this.mirrored && this.position.x >= this.cvs.width + (this.frameWidth * this.scale))
        ) {
            this.mirrored = getRandomInList(...RANGE_MIRRORED)
            this.position = {
                x: this.mirrored ? this.cvs.width + this.frameWidth : -this.frameWidth,
                y: getRandomInRange(0, this.cvs.height),
            }
            this.scale = getRandomInRange(...RANGE_SCALE) / 10
            this.opacity = getRandomInRange(...RANGE_OPACITY) / 10
            this.frameCurrent = getRandomInRange(0, (Cockroach.COUNT_FRAMES - 1))
            this.framesHold = getRandomInRange(...RANGE_FRAMESHOLD)
            this.speed = getRandomInRange(...RANGE_SPEED) * (this.mirrored ? -1 : 1)
        }
    }
}