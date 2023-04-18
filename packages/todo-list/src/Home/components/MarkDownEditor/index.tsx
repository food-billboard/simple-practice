import { useRef, useState, useCallback, useMemo } from 'react'
import MarkDownIt from 'markdown-it'
import { CommonFormProps } from '../../type'
import { WiredCard, WiredButton } from '../../utils/element'
import './index.css'

let instance: MarkDownRender

class MarkDownRender {

  constructor() {
    if(instance) return instance 
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
  }, [onChange])

  const previewValue = useMemo(() => {
    if(markdownAble || !value) return '' 
    return markdownRef.current.render(value.toString())
  }, [markdownAble, value])

  return (
    <WiredCard className="todo-list-markdown">
      <div className='todo-list-markdown-header'>
        <WiredButton onClick={setMarkdownAble.bind(null, !markdownAble)}>
          {markdownAble ? '编辑模式' : '预览模式'}
        </WiredButton>
      </div>
      <WiredCard className="todo-list-markdown-editor">
        {
          markdownAble ? (
            <textarea onChange={onTextChange} value={value} rows={10} placeholder='可以输入待办的描述（这是一个markdown编辑）' />
          )
          :
          (
            <div 
              className="todo-list-markdown-shower"
              dangerouslySetInnerHTML={{
                __html: previewValue || ''
              }}
            />
          )
        }
      </WiredCard>
    </WiredCard>
  )

}

export default MarkDownEditor