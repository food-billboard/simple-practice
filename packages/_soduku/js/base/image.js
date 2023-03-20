import cax from '../libs/cax'

export default class Image extends cax.Group {

  constructor(options) {
    super() 
    const { width, height, image, originWidth, originHeight } = options
    this.image = new cax.Bitmap(image)
    this.image.width = width 
    this.image.height = height 
    this.image.scaleX = width / originWidth
    this.image.scaleY = height / originHeight 
    this.add(this.image)
  }

  setProp(options) {
    Object.entries(options).forEach(item => {
      const [ key, value ] = item
      this[key] = value  
    })
  }

}