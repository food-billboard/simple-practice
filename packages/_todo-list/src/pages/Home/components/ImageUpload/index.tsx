import { useRef, useCallback, useState } from 'react';
import { 
  WiredCard as WERWiredCard,
  WiredImage as WERWiredImage 
} from 'wired-elements-react'
import DataSourceRequest from '../../utils/request'
import useMessage from '../message'
import { CommonFormProps } from '../../type'
import './index.less'

const WiredCard = WERWiredCard as any 
const WiredImage = WERWiredImage as any 

const ImageUpload = (props: CommonFormProps<string[]> & { limit?: number }) => {

  const { value=[], onChange, limit=3 } = props 
  const [ loading, setLoading ] = useState(false)

  const [ Message, show, hide, messageProps ] = useMessage()

  const fileRef = useRef<HTMLInputElement>(null)

  const handleAdd = useCallback(() => {
    if(loading) return
    fileRef.current?.click() 
  }, [loading])

  const onFileChange = useCallback(async (e: any) => {
    const [file] = e.target.files 
    if(file) {
      if(file.size > 5 * 1024) {
        show()
        return 
      }
      setLoading(true)
      try {
        const result = await DataSourceRequest.postImageUpload(file)
        onChange?.([...value, result])
      }catch(err) {

      }finally {
        setLoading(false)
      }
    }
  }, [value, onChange])

  const handleDelete = useCallback((index: number) => {
    value.splice(index, 1)
    onChange?.(value)
  }, [value, onChange])

  return (
    <div className='todo-list-upload'>
      {
        (!~limit || limit > value.length) && (
          <WiredCard className='todo-list-add'>
            <div onClick={handleAdd}>
              文件上传
            </div>
          </WiredCard>
        )
      }
      {
        value.map((item, index) => {
          return (
            <div
              key={index}
              onClick={handleDelete.bind(null, index)}
              className='todo-list-upload-item'
            >
              <WiredImage src={item} elevation={2} />
            </div>
          )
        })
      }
      <input multiple={false} type="file" ref={fileRef} onChange={onFileChange} />
      <Message {...messageProps}>
        文件大小不能超过5kb
      </Message>
    </div>
  )

}

export default ImageUpload