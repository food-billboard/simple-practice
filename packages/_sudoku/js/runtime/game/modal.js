import cax from '../../libs/cax'
import Button from './button'
import IconButton from './icon-button'

const info = wx.getSystemInfoSync()
const screenWidth = info.windowWidth
const screenHeight = info.windowHeight 

const exitImage = 'images/home.png'
const restartImage = 'images/restart.png'

export default class Modal extends cax.Group {
  constructor () {
    super()
    this.init()
  }

  container 
  mask 
  title 
  button
  background 
  exitButton 
  restartButton 
  score 

  initScore() {
    const container = new cax.Group() 
    container.x = screenWidth * 0.1 
    container.y = 72 

    const wrapperWidth = screenWidth * 0.8 * 0.8
    const wrapperHeight = wrapperWidth * 0.5 
    const deepBg = new cax.Rect(wrapperWidth, wrapperHeight, {
      fillStyle: '#ff7700'
    }) 
    const bg = new cax.Rect(wrapperWidth - 4, wrapperHeight - 4, {
      fillStyle: '#eee'
    }) 
    bg.x = 2 
    bg.y = 2

    container.add(deepBg, bg)

    return container
  }

  init() {
    
    this.mask = new cax.Rect(screenWidth, screenHeight, {
      fillStyle: 'rgba(0, 0, 0, 0.5)'
    })
    const containerWidth = screenWidth * 0.8 
    const containerHeight = containerWidth * 1.2 
    this.container = new cax.Group() 
    this.container.x = screenWidth * 0.1 
    this.container.y = (screenHeight - containerHeight) / 2 

    this.background = new cax.Rect(containerWidth, containerHeight, {
      fillStyle: '#fff'
    })
    this.title = new cax.Text('暂停', {
      font: '36px Arial',
      color: '#ff7700',
      baseline: 'middle',
      textAlign: 'center',
    })
    this.title.x = containerWidth / 2 
    this.title.y = 36
    this.button = new cax.Rect(containerWidth * 0.6, 36, {
      fillStyle: '#ff7700'
    })

    const buttonHeight = 36 
    this.button = new Button({
      width: containerWidth * 0.6,
      height: buttonHeight,
      title: '继续',
      onClick: () => {}
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
      onClick: () => {},
      title: '主页',
    })
    this.exitButton.x = containerWidth * 0.3 
    this.exitButton.y = containerHeight * 0.7 + buttonHeight * 1.5
    this.restartButton = new IconButton({
      ...commonProps,
      image: restartImage,
      onClick: () => {},
      title: '重玩',
    })
    this.restartButton.x = containerWidth * 0.6 
    this.restartButton.y = containerHeight * 0.7 + buttonHeight * 1.5

    this.score = this.initScore() 

    this.container.add(this.background, this.title, this.button, this.restartButton, this.exitButton, this.score)

    this.add(this.mask, this.container)

  }

}
