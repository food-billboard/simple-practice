import cax from '../../libs/cax'
import DataBus, { ColorStyleManage } from '../../databus'
import { BANNER_HEIGHT } from '../banner'
import Button from '../game/components/button'

const info = wx.getSystemInfoSync()
const screenWidth = info.windowWidth
const screenHeight = info.windowHeight
const statusBarHeight = info.statusBarHeight

const dataBus = new DataBus()

const LOGO_IMAGE = 'images/logo.jpeg'
const LOGO_WIDTH = 185
const LOGO_HEIGHT = 185 

function createLevel(options) {
  const {
    height,
    y,
    text,
    fontOptions={},
    tap,
  } = options 

  const button = new Button({
    width: screenWidth * 0.3, 
    height: height * 0.5, 
    title: text, 
    onClick: tap, 
    buttonProps: {

    }, 
    titleProps: {
      font: `${ColorStyleManage.primaryButtonSize}px Arial`,
      baseline: 'middle',
      textAlign: 'center',
      ...fontOptions
    }
  })

  button.x = screenWidth * 0.35
  button.y = y + height * 0.25

  return button 
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
    this.logo.y = 20 + this.logo.scaleY * LOGO_HEIGHT / 2 + statusBarHeight

    const levelStartY = this.logo.y + this.logo.scaleY * LOGO_HEIGHT / 2 + 20 + statusBarHeight
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
    }else if(this.visible) {
      this.visible = false 
    }
  }
}
