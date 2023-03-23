import cax from '../../libs/cax'

export default class Button extends cax.Group {
  constructor (options) {
    super()
    this.init(options)
  }

  background
  title

  updateText(title) {
    this.title.text = title 
  }

  init(options) {

    const { width, height, title, onClick, buttonProps={}, titleProps={} } = options 

    this.background = new cax.Rect(width, height, {
      fillStyle: '#ff7700',
      ...buttonProps
    })
    this.title = new cax.Text(title, {
      font: '18px Arial',
      baseline: 'middle',
      textAlign: 'center',
      ...titleProps
    })
    this.title.x = width / 2 
    this.title.y = height / 2 

    this.background.on('tap', onClick)
    this.title.on('tap', onClick)

    this.add(this.background, this.title)

  }

}
