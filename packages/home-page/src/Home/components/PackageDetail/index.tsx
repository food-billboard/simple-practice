import React, { useCallback, useState } from 'react'
import {
  Window,
  WindowHeader,
  Button,
  WindowContent,
  Tooltip
} from 'react95'
import './index.css'
import '../ProjectWindow/index.css'

export type ProjectDetailProps = {
  label: string
  description: string
  date: string
  image: string
  url?: string
  code?: string 
  development?: boolean 
}

const PackageDetail = ((props: ProjectDetailProps) => {

  const { label, image, description, date, url, code, development=false } = props

  const [visible, setVisible] = useState(false)

  const open = useCallback(() => {
    setVisible(true)
  }, [])

  const close = useCallback(() => {
    setVisible(false)
  }, [])

  const handleClick = useCallback(() => {
    window.open(url, '_blank')
  }, [url])

  const handleClickCode = useCallback(() => {
    window.open(code, '_blank')
  }, [code])

  return (
    <>
      <div
        onClick={open}
        className="home-page-main-app home-page-main-app-detail"
        style={{
          verticalAlign: 'top',
          marginBottom: 8
        }}
      >
        <img src={image} alt={label} />
        <div>{label}</div>
      </div>
      {
        visible && (
          <Window className='home-page-project-window home-page-project-detail-window'>
            <WindowHeader className='home-page-project-window-title'>
              <span>{label}</span>
              <Button onClick={close}>
                <span className='home-page-project-window-close-icon' />
              </Button>
            </WindowHeader>
            <WindowContent>
              <div className="home-page-project-detail-window-main">
                <img src={image} alt={label} />
                <div>
                  <span>{label}({date}){development ? '(迭代中)' : ''}</span>

                  <Tooltip text={description} style={{whiteSpace: 'normal', minWidth: '24em'}}>
                    <p>
                      {description}
                    </p>
                  </Tooltip>
                </div>
              </div>
              <div className="home-page-project-detail-window-footer">
                {
                  code && (
                    <Button style={{marginRight: 8}} onClick={handleClickCode}>代码</Button>
                  )
                }
                {
                  url && (
                    <Button onClick={handleClick}>前往</Button>
                  )
                }
              </div>
            </WindowContent>
          </Window>
        )
      }
    </>
  )
})

export default PackageDetail