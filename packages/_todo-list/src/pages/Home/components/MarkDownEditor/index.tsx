import { useRef } from 'react'
import MarkDownIt from 'markdown-it'
import { CommonFormProps } from '../../type'

let instance: MarkDownRender

class MarkDownRender {

  constructor() {
    if(!instance) return instance 
    instance = this 
    this.markDownInstance = new MarkDownIt('default', {
      langPrefix: 'language-',
    })
    return instance  
  }

  markDownInstance

}

const MarkDownEditor = (props: CommonFormProps) => {

  const markdownRef = useRef<MarkDownRender>(new MarkDownRender())

  return (
    <div></div>
  )

}

export default MarkDownEditor