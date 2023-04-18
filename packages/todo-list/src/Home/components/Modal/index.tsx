import { ReactNode, useCallback, useState, useRef, CSSProperties } from 'react';
import { useContext } from '../../utils/context';
import { WiredDialog, WiredButton, WiredDivider } from '../../utils/element';
import './index.css'

const Modal = (props: {
  children?: ReactNode
  title?: false | ReactNode 
  okText?: ReactNode 
  cancelText?: ReactNode
  visible: boolean 
  onOk?: () => void 
  onCancel?: () => void 
  disabled?: boolean 
  style?: CSSProperties
  className?: string,
  width?: number 
}) => {

  const { children, visible, title, okText='确定', cancelText='取消', onOk, onCancel, disabled, style, className, width: propsWidth } = props 

  const { width } = useContext()

  return (
    <WiredDialog 
      className={`todo-list-modal ${className || ""}`}
      open={visible}
      elevation={3}
      style={style}
    >
      <div 
        className='todo-list-modal-wrapper'
        style={propsWidth ? {
          width: propsWidth <= 1 ? propsWidth * width : propsWidth
        } : {
          maxWidth: width * 0.8
        }}
      >
        {
          !!title && (
            <div className='todo-list-modal-title'>
              {title}
              <WiredDivider elevation={1} />
            </div>
          )
        }
        {children}
        {
          (okText || cancelText) && (
            <div className='todo-list-modal-footer'>
              {
                !!cancelText && (
                  <WiredButton style={{marginRight: 8}} elevation={3} onClick={onCancel}>{cancelText}</WiredButton>
                )
              }
              {
                !!okText && (
                  <WiredButton disabled={disabled} elevation={3} onClick={onOk}>{okText}</WiredButton>
                )
              }
            </div>
          )
        }
      </div>
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
      visible,
    }
  ]

}

export default useModal