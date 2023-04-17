import { ReactNode, useCallback, useState, useRef } from 'react';
import { 
  WiredCard as WERWiredCard
} from 'wired-elements-react'
import './index.less'

const WiredCard = WERWiredCard as any

const Message = (props: {
  children?: ReactNode
  visible: boolean 
}) => {

  const { children, visible } = props 

  if(!visible) return null 

  return (
    <WiredCard className='todo-list-message animate__animated animate__fadeInUp animate__faster' fill="green">
      {children}
    </WiredCard>
  )

}

function useMessage(duration=3000) {

  const [ visible, setVisible ] = useState(false)
  const [ children, setChildren ] = useState<any>('')

  const timeoutRef = useRef<any>()

  const show = useCallback((child?: ReactNode, _duration?: number) => {
    setChildren(child)
    setVisible(true)
    timeoutRef.current = setTimeout(() => {
      setVisible(false)
    }, _duration ?? duration)
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
      visible,
      children
    }
  ]

}

export default useMessage