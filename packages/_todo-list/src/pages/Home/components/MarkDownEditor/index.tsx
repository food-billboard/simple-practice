import { useRef, useState, useCallback, useMemo } from 'react'
import MarkDownIt from 'markdown-it'
import {
  WiredCard as WERWiredCard,
  WiredButton as WERWiredButton,
  WiredTextarea as WERWiredTextarea,
} from 'wired-elements-react'
import { CommonFormProps } from '../../type'
import './index.less'

const WiredCard = WERWiredCard as any
const WiredButton = WERWiredButton as any
const WiredTextarea = WERWiredTextarea as any

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

  render(value: string) {
    return this.markDownInstance?.render(value)
  }

}

const MarkDownEditor = (props: CommonFormProps) => {

  const { value, onChange } = props 

  const [ markdownAble, setMarkdownAble ] = useState(true)

  const markdownRef = useRef<MarkDownRender>(new MarkDownRender())

  const onTextChange = useCallback((value: any) => {
    onChange?.(value.target.value)
  }, [])

  const previewValue = useMemo(() => {
    if(markdownAble) return '' 
    return markdownRef.current.render(value)
  }, [markdownAble, value])

  return (
    <WiredCard className="todo-list-markdown">
      <div className='todo-list-markdown-header'>
        <WiredButton onClick={setMarkdownAble.bind(null, !markdownAble)}>
          {markdownAble ? '编辑模式' : '预览模式'}
        </WiredButton>
      </div>
      <WiredTextarea 
        className="todo-list-markdown-editor" 
        style={{
          display: markdownAble ? 'inline-block' : 'none'
        }}
        onchange={onTextChange}
        value={value} 
        rows={6}
        maxRows={10}
      />
      {
        !markdownAble && (
          <div className="todo-list-markdown-shower">
            {previewValue}
            {'22'.repeat(200)}
          </div>
        )
      }
    </WiredCard>
  )

}

export default MarkDownEditor