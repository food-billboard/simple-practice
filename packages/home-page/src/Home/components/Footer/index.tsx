import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import {
  AppBar,
  Button,
  MenuList,
  MenuListItem,
  Separator,
  Toolbar
} from 'react95'
import { START_ICON } from '../../constants'

const _Clock = styled.div`

`
const Clock = () => {

  const [ currentTime, setCurrentTime ] = useState(new Date())

  useEffect(() => {
    let timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => {
      clearInterval(timer)
    }
  }, [])

  return (
    <_Clock>
      {currentTime.getFullYear()}-{currentTime.getMonth() + 1}-{currentTime.getDate()}
    </_Clock>
  )

}

const Footer = () => {

  const [open, setOpen] = useState(false)

  return (
    <AppBar>
      <Toolbar style={{ justifyContent: 'space-between' }}>
        <div style={{ position: 'relative', display: 'inline-block' }}>
          <Button
            onClick={() => setOpen(!open)}
            active={open}
            style={{ fontWeight: 'bold' }}
          >
            <img
              src={START_ICON}
              alt='start'
              style={{ height: '20px', marginRight: 4 }}
            />
            开始
          </Button>
          {
            open && (
              <MenuList
                style={{
                  position: 'absolute',
                  left: '0',
                  top: '100%'
                }}
                onClick={() => setOpen(false)}
              >
                <MenuListItem>
                  <span role='img' aria-label='👨‍💻'>
                    👨‍💻
                  </span>
                  Profile
                </MenuListItem>
                <MenuListItem>
                  <span role='img' aria-label='📁'>
                    📁
                  </span>
                  My account
                </MenuListItem>
                <Separator />
                <MenuListItem disabled>
                  <span role='img' aria-label='🔙'>
                    🔙
                  </span>
                  Logout
                </MenuListItem>
              </MenuList>
            )
          }
        </div>
        <div>
          <Clock />
        </div>
      </Toolbar>
    </AppBar>
  )

}

export default Footer 