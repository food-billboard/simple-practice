import { ColorStyleManage, EVENT_EMITTER, EVENT_EMITTER_NAME } from '../../databus'
import cax from '../../libs/cax'
import Button from './components/button'
import IconButton from './components/icon-button'
import ListItem from './components/list-item'
import DataBus from '../../databus'
import { Interval } from '../../base/utils/index'

const info = wx.getSystemInfoSync()
const screenWidth = info.windowWidth
const screenHeight = info.windowHeight 

const databus = new DataBus() 

const exitImage = 'images/home.png'
const restartImage = 'images/restart.png'

export default class Modal extends cax.Group {
  constructor () {
    super()
    Interval.onChange((timeText) => {
      this.timeText = timeText
    })
    this.init()
    this.eventBind()
  }

  // 倒计时文字
  timeText

  container 
  mask 
  title 
  button
  background 
  exitButton 
  restartButton 
  score 
  scoreInfo = []

  initScore() {
    const container = new cax.Group() 
    container.x = screenWidth * 0.8 * 0.1 
    container.y = 72 

    const wrapperWidth = screenWidth * 0.8 * 0.8
    const wrapperHeight = wrapperWidth * 0.5 
    const deepBg = new cax.Rect(wrapperWidth, wrapperHeight, {
      fillStyle: ColorStyleManage.borderColor
    }) 
    const bg = new cax.Rect(wrapperWidth - 4, wrapperHeight - 4, {
      fillStyle: ColorStyleManage.defaultBackgroundColor
    }) 
    bg.x = 2 
    bg.y = 2

    container.add(deepBg, bg)
    this.updateInfo(container, { width: wrapperWidth, height: wrapperHeight })

    return container
  }

  updateInfo(_container, options) {
    const container = _container || this.score
    const data = [
      ['难度', databus.difficulty], 
      ['时间', this.timeText], 
      ['完成度', `${databus.sudokuData.filter(item => !!item).length}/${databus.sudokuCompleteTotal}`]
    ]
    const startY = 4 
    const startX = 4 
    if(!this.scoreInfo.length || data.length !== this.scoreInfo.length) {
      this.scoreInfo = data.map((item, index) => {
        const text = new ListItem(item, {
          font: '16px Arial',
        }, options)
        text.x = startX
        text.y = startY + index * 32
        return text 
      })
      container.add(...this.scoreInfo)
    }else {
      data.forEach((item, index) => {
        this.scoreInfo[index].updateText(item) 
      })
    }
  }

  init() {
    this.visible = false 
    this.mask = new cax.Rect(screenWidth, screenHeight, {
      fillStyle: 'rgba(0, 0, 0, 0.7)'
    })
    const containerWidth = screenWidth * 0.8 
    const containerHeight = containerWidth * 1
    this.container = new cax.Group() 
    this.container.x = screenWidth * 0.1 
    this.container.y = (screenHeight - containerHeight) / 2 

    this.background = new cax.Rect(containerWidth, containerHeight, {
      fillStyle: ColorStyleManage.nextBackgroundColor
    })
    this.title = new cax.Text('暂停', {
      font: '28px Arial',
      color: ColorStyleManage.defaultFontColor,
      baseline: 'middle',
      textAlign: 'center',
    })
    this.title.x = containerWidth / 2 
    this.title.y = 36
    this.button = new cax.Rect(containerWidth * 0.6, 36, {
      fillStyle: ColorStyleManage.activeFontColor
    })

    const buttonHeight = 36 
    this.button = new Button({
      width: containerWidth * 0.6,
      height: buttonHeight,
      title: '继续',
      onClick: this.handleContinue
    })
    this.button.x = containerWidth * 0.2 
    this.button.y = containerHeight * 0.7

    const commonProps = {
      originWidth: 128,
      originHeight: 128,
      width: containerWidth / 15,
      height: containerWidth / 15,
      titleProps: {
        font: '14px Arial',
      }
    }
    this.exitButton = new IconButton({
      ...commonProps,
      image: exitImage,
      onClick: this.handleExit,
      title: '主页',
    })
    this.exitButton.x = containerWidth * 0.3 
    this.exitButton.y = containerHeight * 0.7 + buttonHeight * 1.2
    this.restartButton = new IconButton({
      ...commonProps,
      image: restartImage,
      onClick: this.handleRestart,
      title: '重玩',
    })
    this.restartButton.x = containerWidth * 0.7 -  commonProps.width
    this.restartButton.y = containerHeight * 0.7 + buttonHeight * 1.2

    this.score = this.initScore() 

    this.container.add(this.background, this.title, this.button, this.restartButton, this.exitButton, this.score)

    this.add(this.mask, this.container)

  }

  // 回到主页
  handleExit = () => {
    this.handleHidden()
    EVENT_EMITTER.emit(EVENT_EMITTER_NAME.ON_GAME_QUITE)
  }

  // 继续游戏
  handleContinue = () => {
    this.handleHidden()
    EVENT_EMITTER.emit(EVENT_EMITTER_NAME.ON_GAME_CONTINUE)
  }

  // 重玩
  handleRestart = () => {
    EVENT_EMITTER.emit(EVENT_EMITTER_NAME.ON_GAME_START)
    this.handleHidden() 
  }

  // 游戏暂停
  onGameStop() {
    this.updateInfo()
    this.visible = true 
  }

  // 隐藏
  handleHidden() {
    this.visible = false 
    this.button.visible = true 
    this.title.text = '暂停'
  }

  // 游戏结束
  onGameEnd() {
    this.button.visible = false 
    this.title.text = '游戏结束'
    this.updateInfo()
    this.visible = true 
  }

  // 游戏完成
  onGameComplete() {
    this.button.visible = false 
    this.title.text = '游戏完成'
    this.updateInfo() 
    this.visible = true 
  }

  eventBind() {
    EVENT_EMITTER.addListener(EVENT_EMITTER_NAME.ON_GAME_STOP, this.onGameStop, this)
    EVENT_EMITTER.addListener(EVENT_EMITTER_NAME.ON_GAME_END, this.onGameEnd, this)
    EVENT_EMITTER.addListener(EVENT_EMITTER_NAME.ON_GAME_COMPLETE, this.onGameComplete, this)
  }

  eventUnBind() {
    EVENT_EMITTER.removeListener(EVENT_EMITTER_NAME.ON_GAME_STOP, this.onGameStop)
    EVENT_EMITTER.removeListener(EVENT_EMITTER_NAME.ON_GAME_END, this.onGameEnd)
    EVENT_EMITTER.removeListener(EVENT_EMITTER_NAME.ON_GAME_COMPLETE, this.onGameComplete)
  }

}
