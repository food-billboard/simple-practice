import { ColorStyleManage } from '../../../databus'
import cax from '../../../libs/cax'
import Image from './image'

export default class Button extends cax.Group {
  constructor (options) {
    super()
    this.init(options)
  }

  background
  title

  init(options) {

    const { image, width, height, originWidth, originHeight, title='', onClick, titleProps={} } = options 

    this.background = new Image({
      image,
      width,
      height,
      originWidth,
      originHeight
    })
    this.temp = new cax.Rect(width, height, {
      fillStyle: 'rgba(0, 0, 0, 0.01)'
    })

    this.title = new cax.Text(title, {
      font: `${ColorStyleManage.defaultButtonSize}px Arial`,
      baseline: 'middle',
      textAlign: 'center',
      ...titleProps
    })
    this.title.x = width / 2 
    this.title.y = height + (parseInt(titleProps.font) || 18) / 1.5

    this.background.image.on('tap', onClick)
    this.title.on('tap', onClick)
    this.temp.on('tap', onClick)

    this.add(this.background, this.title, this.temp)

  }

}
