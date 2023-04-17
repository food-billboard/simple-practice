import { createContext, useContext as RCUseContext } from 'react'
import { ContextData } from '../type'

export const Context = createContext<ContextData>({
  classify: [],
  width: 100,
  message: () => {}
})

export const useContext = () => {
  return RCUseContext(Context)
}