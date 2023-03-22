import cax from './libs/cax'

import Introduce from './runtime/introduce/index'
import Game from './runtime/game/index'
import Banner from './runtime/banner'

const stage = new cax.Stage()

const introduce = new Introduce()
const game = new Game()
const banner = new Banner()

stage.add(introduce, game, banner)

function update () {
  stage.update()
  introduce.update()
  game.update()

  requestAnimationFrame(update)
}

update()
