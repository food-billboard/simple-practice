import { useRef, useCallback, useState } from 'react';
import {
  WiredCard as WERWiredCard,
  WiredImage as WERWiredImage
} from 'wired-elements-react'
import DataSourceRequest from '../../utils/request'
import { useContext } from '../../utils/context'
import { CommonFormProps } from '../../type'
import './index.less'

const WiredCard = WERWiredCard as any
const WiredImage = WERWiredImage as any

const ImageUpload = (props: CommonFormProps<string[]> & { limit?: number }) => {

  const { value = [], onChange, limit = 3 } = props
  const [loading, setLoading] = useState(false)

  const { message } = useContext()

  const fileRef = useRef<HTMLInputElement>(null)

  const handleAdd = useCallback(() => {
    if (loading) return
    fileRef.current?.click()
  }, [loading])

  const onFileChange = useCallback(async (e: any) => {
    const [file] = e.target.files
    if (file) {
      if (file.size > 5 * 1024) {
        message('文件大小不能超过5kb')
        return
      }
      setLoading(true)
      try {
        const result = await DataSourceRequest.postImageUpload(file)
        onChange?.([...value, result])
      } catch (err) {

      } finally {
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
          <div onClick={handleAdd} className='todo-list-upload-item'>
            <WiredCard className='todo-list-upload-item-card'>
              <img
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFUAAABMCAMAAAAr8gs7AAAAPFBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADQLyYwAAAAE3RSTlMAwECAcF4gTxDfsPDQoDDvkI/PCjtUZwAAAQVJREFUWMPt2I1OxSAMhmHawoD9a+//XgVPTObJjGL6xRB5L+DJlhVYcKPRn5bCbo9Oh+pmroqWJmuVIGou6OKs0xJZo1xVgajBWpWqMkRN1ipBRoAQI+CWop7mKmSwHGQEdojKHanxqvawYId6r+4sL0T6iFLzWcgXiTlK1Q793NmsBg6y0at+VcPRNr0/VdYf5t1TaaanDr0pE81S8/yRyEalRVe5+SLflCXw5BrzNxARbVKw9ff7a7i+VXLXCLJr61BrM0SloXahckdqhMyrQNbWCVFJax6isrGaIar+d3WCqAxRvSrgJkMequtBJaC6QlTqQvWYH6K5oGty1kWJbjRq6g3isSNM2K9SuQAAAABJRU5ErkJggg=="
              />
            </WiredCard>
          </div>
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
              <WiredCard className='todo-list-upload-item-card'>
               
              </WiredCard>
              <div className='todo-list-upload-item-card' style={{padding: 10}}>
                <img
                  src={item}
                />
              </div>
            </div>
          )
        })
      }
      <input style={{ display: 'none' }} multiple={false} type="file" ref={fileRef} onChange={onFileChange} />
    </div>
  )

}

export default ImageUpload