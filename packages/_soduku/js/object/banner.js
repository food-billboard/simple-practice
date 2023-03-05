import cax from "../libs/cax"
import { EVENT_EMITTER, EVENT_EMITTER_NAME, ContainerWidth, ContainerHeight, BANNER_HEIGHT } from '../databus'

const BG_WIDTH = 768
const BG_HEIGHT = 896

const BG_BOTTOM_WIDTH = 37
export const BG_BOTTOM_HEIGHT = 128

const BACKGROUND_NORMAL = 'images/background.png'

const NORMAL_RATE = BG_HEIGHT / (BG_HEIGHT + BG_BOTTOM_HEIGHT)
export const BACKGROUND_NORMAL_HEIGHT = ContainerHeight * NORMAL_RATE

// 广告位
export default class Banner extends cax.Group {
	constructor() {
    super()
		this.init()
	}

	banner 

	init() {

    this.y = ContainerHeight
    this.width = ContainerWidth
    this.height = BANNER_HEIGHT

    this.rect = new cax.Rect(ContainerWidth, BANNER_HEIGHT, {
      fillStyle: 'gray'
    })

    this.text = new cax.Text('广告位招租', {
      font: '20px Arial',
      color: '#ff7700',
      baseline: 'middle',
      textAlign: 'center'
    })

    this.text.x = ContainerWidth / 2
    this.text.y = BANNER_HEIGHT / 2

    this.add(this.rect, this.text)

	}

}