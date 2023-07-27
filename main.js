import cockroachImage from './images/cockroach.webp'

class Canvas {
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

class Cockroach {
  COUNT_FRAMES = 27
  constructor({
    cvs,
    ctx,
    img,
    main = false,
    position,
    velocity,
    scale = 1,
    mirrored = false,
    opacity = 1,
    framesHold = 2,
  }) {
    this.cvs = cvs
    this.ctx = ctx
    this.img = img
    this.main = main

    this.position = position
    this.velocity = velocity
    this.frameWidth = img.width / this.COUNT_FRAMES
    this.frameHeight = img.height

    this.scale = scale
    this.mirrored = mirrored
    this.opacity = opacity

    this.framesElapsed = 0
    this.framesHold = framesHold
    this.frameCurrent = 0
    this.ratio = +(this.frameWidth / this.frameHeight).toFixed(3)
  }

  draw() {
    this.ctx.globalAlpha = this.opacity
    const sx = (this.frameWidth * this.frameCurrent)
    const sy = 0

    const dWidthScale = +(this.frameWidth / this.frameHeight).toFixed(3)
    const dHeightScale = +(this.frameHeight / this.frameWidth).toFixed(3)


    const dWidth = this.cvs.height > this.cvs.width ? (this.cvs.width) : (this.cvs.height * dWidthScale)
    const dHeight = this.cvs.height > this.cvs.width ? (this.cvs.width * dHeightScale) : (this.cvs.height)
    const dx = this.main ? (this.cvs.width - dWidth) / 2 : this.position.x
    const dy = this.main ? (this.cvs.height - dHeight) / 2 : this.position.y

    this.ctx.fillStyle = 'blue'
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

  animateFrames() {
    this.framesElapsed--
    if (this.framesElapsed % this.framesHold === 0) {
      if (this.frameCurrent < this.COUNT_FRAMES - 1) {
        this.frameCurrent++
      } else {
        this.frameCurrent = 0
      }
    }
  }

  update() {
    this.draw()
    this.animateFrames()
    this.position.y += this.velocity.y
    this.position.x += this.velocity.x
  }
}

const btn = document.getElementById('startBtn')
const audio = document.getElementById('sound')

async function start() {
  const canvas = new Canvas()
  const { cvs, ctx } = canvas

  const btn = document.createElement('button')
  btn.id = 'startBtn'
  btn.textContent = 'Trust me'

  const img = await new Promise((resolve, reject) => {
    const img = new Image()
    img.src = cockroachImage
    img.onerror = reject
    img.onload = () => {
      document.body.append(btn)
      resolve(img)
    }
  })

  const cockroach = new Cockroach({
    cvs,
    ctx,
    img,
    main: true,
    position: { x: 0, y: 0 },
    velocity: { x: 0, y: 0 },
    scale: 1,
    mirrored: false,
    opacity: 1,
    framesHold: 2,
  })

  function draw() {
    requestAnimationFrame(draw)
    canvas.clear()
    cockroach.update()
  }

  btn.onclick = () => {
    canvas.init()
    audio.play()
    draw()
    btn.onclick = null
    btn.remove()
  }
}
start()