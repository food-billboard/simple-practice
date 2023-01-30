import React, { useCallback, useState, forwardRef, useImperativeHandle, useMemo, useEffect } from 'react'
import {
  Window,
  WindowHeader,
  Button,
  Toolbar,
  WindowContent,
  TextInput,
  ScrollView
} from 'react95'
import { debounce } from "debounce"
import { PACKAGE_MAP } from '../../constants'
import PackageDetail from '../PackageDetail'
import './index.css'

export type ProjectWindowRef = {
  open: () => void 
}

export type ProjectWindowType = {

}

const ProjectWindow = forwardRef<ProjectWindowRef, ProjectWindowType>((props, ref) => {

  const [ searchText, setSearchText ] = useState('')
  const [ visible, setVisible ] = useState(false)
  const [ packageList, _setPackageList ] = useState([...PACKAGE_MAP])

  const setPackageList = debounce(_setPackageList, 200)

  const onSearchTextChange = useCallback((e: any) => {
    setSearchText(e.target.value)
  }, [])

  const open = useCallback(() => {
    setVisible(true)
  }, [])

  const close = useCallback(() => {
    setVisible(false)
  }, [])

  useImperativeHandle(ref, () => {
    return {
      open
    }
  }, [])

  useEffect(() => {
    setPackageList(
      [...PACKAGE_MAP]
      .filter(pack => Object.entries(pack).filter(item => !['image', 'url', 'development'].includes(item[0])).some(item => item[1].includes(searchText) || searchText.includes(item[1])))
      .sort((a, b) =>  new Date(b.date).getTime() - new Date(a.date).getTime())
    )
  }, [searchText])

  if(!visible) return null 

  return (
    <Window className='home-page-project-window'>
      <WindowHeader className='home-page-project-window-title'>
        <span>my project</span>
        <Button onClick={close}>
          <span className='home-page-project-window-close-icon' />
        </Button>
      </WindowHeader>
      <Toolbar className="home-page-project-window-toolbar">
        <Button variant='menu' size='sm' style={{visibility: 'hidden'}}>
          TODO
        </Button>
        <TextInput
          value={searchText}
          placeholder='search project...'
          onChange={onSearchTextChange}
        />
      </Toolbar>
      <WindowContent>
        {
          !!packageList.length && (
            <ScrollView className="home-page-project-window-content">
              {
                packageList
                .map(pack => {
                  return (
                    <PackageDetail
                      {...pack}
                      key={pack.key}
                    />
                  )
                })
              }
            </ScrollView>
          )
        }
      </WindowContent>
    </Window>
  )
})

export default ProjectWindow