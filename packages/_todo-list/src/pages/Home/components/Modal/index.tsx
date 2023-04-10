import { ReactNode, useCallback, useState, useRef } from 'react';
import { 
  WiredDialog as WERWiredDialog
} from 'wired-elements-react'
import './index.less'

const WiredDialog = WERWiredDialog as any 

const Modal = (props: {
  children?: ReactNode
  visible: boolean 
}) => {

  const { children, visible } = props 

  return (
    <WiredDialog 
      className='todo-list-modal'
      open={visible}
      elevation={3}
    >
      {children}
    </WiredDialog>
  )

}

function useModal() {

  const [ visible, setVisible ] = useState(false)

  const timeoutRef = useRef<any>()

  const show = useCallback(() => {
    setVisible(true)
  }, [])

  const hide = useCallback(() => {
    clearTimeout(timeoutRef.current)
    setVisible(false)
  }, [])  

  return [
    Modal as any,
    show,
    hide,
    {
      visible
    }
  ]

}

export default useModal