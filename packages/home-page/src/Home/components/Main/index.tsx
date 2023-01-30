import React, { useRef, useContext, useCallback } from 'react'
import { ThemeContext } from 'styled-components'
import ProjectWindow, { ProjectWindowRef } from '../ProjectWindow'
import { APP_MAP } from '../../constants'
import './index.css'

const Main = () => {

  const { borderDark } = useContext(ThemeContext)

  const projectWindowRef = useRef<ProjectWindowRef>(null)

  const handleClick = useCallback((appDetail: any) => {
    const { key, url } = appDetail
    if(typeof url === 'string') {
      window.open(url, "_blank")
    }else {
      switch(key) {
        case 'project':
        default:
          projectWindowRef.current?.open()
      }
    }
  }, [])

  return (
    <div 
      className="home-page-main"
      style={{
        backgroundColor: borderDark || 'rgb(17, 128, 128)'
      }}
    >
      <div className="home-page-main-app-wrapper">
        {
          APP_MAP.map(app => {
            const { title, icon, key } = app 
            return (
              <div
                key={key}
                onClick={() => handleClick(app)}
                className="home-page-main-app"
              > 
                <img src={icon} alt={title} />
                <div>{title}</div>
              </div>
            )
          })
        }
      </div>
      <ProjectWindow ref={projectWindowRef} />
    </div>
  )

}

export default Main 