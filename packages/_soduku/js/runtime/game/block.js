import cax from '../../libs/cax'
import { uuid } from '../../base/utils'

const info = wx.getSystemInfoSync()
const screenWidth = info.windowWidth

export default class Block {
  constructor (position) {
    this.x = position.x 
    this.y = position.y
    this.width = screenWidth / 9
    this.height = screenWidth / 9
    this.instance = new cax.Group()
    this.instance.x = this.x * screenWidth / 9
    this.instance.y = this.y * screenWidth / 9
    this.instance.width = this.width
    this.instance.height = this.height
    this.init()
  }

  id = uuid()
  x = 0 
  y = 0 

  instance  
  text 

  init(value=0) {
    if(!this.text) {
      this.text = new cax.Text(value, {
        baseline: 'middle',
        textAlign: 'center',
        font: "20px Arial"
      })
      this.text.x = this.width / 2
      this.text.y = this.height / 2
      this.instance.add(this.text)
    }else {
      this.text.text = value 
    }
  }

}
