import Canvas from './classes/Canvas'
import MainCockroach from './classes/MainCockroach'
import RandomCockroach from './classes/RandomCockroach'
import cockroachImage from './images/cockroach.webp'

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

  const mainCockroach = new MainCockroach({ cvs, ctx, img, })

  const cockroachesNum = 10
  const cockroaches = []
  for (let i = 0; i < cockroachesNum; i++) {
    const cockroach = new RandomCockroach({ cvs, ctx, img, })
    cockroaches.push(cockroach)
  }

  function draw() {
    requestAnimationFrame(draw)
    canvas.clear()
    mainCockroach.update()
    cockroaches.forEach(cockroach => cockroach.update())
  }

  btn.onclick = () => {
    btn.onclick = null
    btn.remove()
    canvas.init()
    audio.play()
    draw()
  }
}
start()