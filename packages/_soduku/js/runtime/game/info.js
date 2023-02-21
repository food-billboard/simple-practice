import cax from '../../libs/cax'


const info = wx.getSystemInfoSync()
const screenWidth = info.windowWidth

export default class Info extends cax.Group {
  constructor (options) {
    super()

    Object.entries(options).forEach(([key, value]) => {
      this[key] = value 
    })

    this.rect = new cax.Rect(screenWidth, options.height, {
      fillStyle: 'gray'
    })

    this.add(this.rect)
   
  }

  update () {
    
  }
}
