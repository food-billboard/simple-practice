import { ColorStyleManage } from '../../../databus'
import cax from '../../../libs/cax'

export default class ListItem extends cax.Group {
  constructor (value, options, info) {
    super()
    this.init(value, options, info)
  }

  label 
  value 

  updateText([label, value]) {
    this.label.text = label 
    this.value.text = value 
  }

  init(valueItem, options, info) {
    const [ label, value ] = valueItem 
    const { width, height } = info || {}

    const fontSize = ColorStyleManage.contentFontSize

    const commonProps = {
      font: `${fontSize}px Arial`,
      color: ColorStyleManage.activeFontColor,
      baseline: 'middle'
    }
    
    this.label = new cax.Text(label, {
      ...commonProps,
      ...options
    })
    this.value = new cax.Text(value, {
      ...commonProps,
      textAlign: 'right',
      ...options
    })

    this.label.x = (parseInt(options.font) || fontSize) / 2
    this.value.x = width - (parseInt(options.font) || fontSize)
    this.label.y = this.value.y = parseInt(options.font) || fontSize 

    this.add(this.label, this.value)

  }

}
