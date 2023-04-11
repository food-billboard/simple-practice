import { createContext, useContext as RCUseContext } from 'react'
import { ContextData } from '../type'

export const Context = createContext<ContextData>({
  classify: [],
  message: () => {}
})

export const useContext = () => {
  return RCUseContext(Context)
}