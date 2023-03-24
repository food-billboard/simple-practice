import cax from '../../libs/cax'
import DataBus, { ColorStyleManage } from '../../databus'
import { BANNER_HEIGHT } from '../banner'

const info = wx.getSystemInfoSync()
const screenWidth = info.windowWidth
const screenHeight = info.windowHeight

const dataBus = new DataBus()

const LOGO_IMAGE = 'images/logo.jpeg'
const LOGO_WIDTH = 185
const LOGO_HEIGHT = 185 

function createLevel(options) {
  const {
    width=screenWidth,
    height,
    x=0,
    y,
    text,
    fontOptions={},
    tap,
  } = options 
  const group = new cax.Group()
  group.width = width
  group.height = height 
  group.x = x 
  group.y = y 

  const textInstance = new cax.Text(text, {
    font: '20px Arial',
    color: ColorStyleManage.activeFontColor,
    baseline: 'middle',
    textAlign: 'center',
    ...fontOptions
  })
  textInstance.x = width / 2
  textInstance.y = height / 2
  textInstance.on('tap', tap)
  group.add(textInstance)

  return group 
}

export default class Introduce extends cax.Group {
  constructor () {
    super()

    // logo 
    this.logo = new cax.Bitmap(LOGO_IMAGE)
    this.logo.originX = LOGO_WIDTH / 2 
    this.logo.originY = LOGO_HEIGHT / 2
    this.logo.scaleX = this.logo.scaleY = screenWidth / 4 / LOGO_WIDTH
    this.logo.x = screenWidth / 2
    this.logo.y = 20 + this.logo.scaleY * LOGO_HEIGHT / 2

    const levelStartY = this.logo.y + this.logo.scaleY * LOGO_HEIGHT / 2 + 20
    const restHeight = screenHeight - levelStartY - BANNER_HEIGHT

    const levelHeight = restHeight / Object.keys(this.levelMap).length
    
    this.levelMap.easy = createLevel({
      height: levelHeight,
      y: levelStartY,
      text: '简单',
      tap: this.onGameStepChange.bind(this, 0)
    })
    this.levelMap.normal = createLevel({
      height: levelHeight,
      y: levelStartY + levelHeight,
      text: '普通',
      tap: this.onGameStepChange.bind(this, 1)
    })
    this.levelMap.hard = createLevel({
      height: levelHeight,
      y: levelStartY + levelHeight * 2,
      text: '困难',
      tap: this.onGameStepChange.bind(this, 2)
    })

    this.add(this.logo, ...Object.values(this.levelMap))
  }

  // 介绍页logo
  logo 
  // 难度
  levelMap = {
    easy: null,
    normal: null,
    hard: null 
  }

  onGameStepChange(level) {
    dataBus.difficulty = level
    dataBus.gameStep = 1
  }

  update () {
    if(dataBus.gameStep === 0) {
      if(!this.visible) this.visible = true 
      // this.text.x = 100
      // this.text.y = 100
    }else if(this.visible) {
      this.visible = false 
    }
  }
}
