import { createContext, useCallback, useContext, useState } from 'react'
import { observer } from 'mobx-react'
import { makeAutoObservable } from "mobx"

class Context {

  name = 'hello'
  age = 10

  constructor() {
    makeAutoObservable(this)
  }

  changeAge() {
    this.age ++
  }

  changeName() {
    this.name = Math.random().toString()
  }

}

const context = new Context()

const MOBX_CONTEXT = createContext<Context>(context)

const ChildrenMobx = observer(() => {

  console.log('children mobx render')

  const { age, name } = useContext<Context>(MOBX_CONTEXT)

  return (
    <div>
      {age}
    </div>
  )

})

const ChildrenNormal = () => {

  console.log('children normal render')

  const handleClick = useCallback(() => {
    context.changeAge()
  }, [])

  const handleChangeName = useCallback(() => {
    context.changeName()
  }, [])

  return (
    <div>
      <div onClick={handleClick}>
        改变年龄
      </div>
      <div onClick={handleChangeName}>
        改变名称
      </div>
    </div>
  )

}

const MobxTest = () => {

  return (
    <MOBX_CONTEXT.Provider value={context}>
      <ChildrenMobx />
      <ChildrenNormal />
    </MOBX_CONTEXT.Provider>
  )

}

export default MobxTest