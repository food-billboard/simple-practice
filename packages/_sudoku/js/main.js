import cax from './libs/cax'

import Introduce from './runtime/introduce/index'
import Game from './runtime/game/index'
import Banner from './runtime/banner'
import BackGround from './runtime/background'

const stage = new cax.Stage()

const introduce = new Introduce()
const game = new Game()
const banner = new Banner()
const background = new BackGround() 

stage.add(background, introduce, game, banner)

function update () {
  stage.update()
  introduce.update()
  game.update()

  requestAnimationFrame(update)
}

update()
