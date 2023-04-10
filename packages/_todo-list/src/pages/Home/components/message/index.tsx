import { ReactNode, useCallback, useState, useRef } from 'react';
import { 
  WiredCard
} from 'wired-elements-react'
import './index.less'

const Message = (props: {
  children?: ReactNode
  visible: boolean 
}) => {

  const { children, visible } = props 

  if(visible) return null 

  return (
    <div className='todo-list-message'>
      {children}
    </div>
  )

}

function useMessage(duration=3000) {

  const [ visible, setVisible ] = useState(false)

  const timeoutRef = useRef<any>()

  const show = useCallback(() => {
    setVisible(true)
    timeoutRef.current = setTimeout(() => {
      setVisible(false)
    }, duration)
  }, [duration])

  const hide = useCallback(() => {
    clearTimeout(timeoutRef.current)
    setVisible(false)
  }, [])  

  return [
    Message as any,
    show,
    hide,
    {
      visible
    }
  ]

}

export default useMessage