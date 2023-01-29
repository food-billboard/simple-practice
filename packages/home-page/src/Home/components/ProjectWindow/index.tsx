import React, { useCallback, useState } from 'react'
import {
  Window,
  WindowHeader,
  Button,
  Toolbar,
  WindowContent,
  TextInput
} from 'react95'
import { PACKAGE_MAP } from '../../constants'
import PackageDetail from '../PackageDetail'

const ProjectWindow = () => {

  const [ searchText, setSearchText ] = useState('')

  const onSearchTextChange = useCallback((e: any) => {
    setSearchText(e.target.value)
  }, [])

  return (
    <Window resizable className='window'>
      <WindowHeader className='window-title'>
        <span>我的项目</span>
        <Button>
          <span className='close-icon' />
        </Button>
      </WindowHeader>
      <Toolbar>
        <Button variant='menu' size='sm'>
          File
        </Button>
        <TextInput
          value={searchText}
          placeholder='search project...'
          onChange={onSearchTextChange}
        />
      </Toolbar>
      <WindowContent>
        <p>
          {
            PACKAGE_MAP.map(pack => {
              return (
                <PackageDetail
                  {...pack}
                />
              )
            })
          }
        </p>
      </WindowContent>
    </Window>
  )
}

export default ProjectWindow