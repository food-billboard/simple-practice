import { useMemo, useRef, useCallback, useEffect } from 'react'
import { annotate } from 'rough-notation'
import type { RoughAnnotationConfig, RoughAnnotationType } from 'rough-notation/lib/model'

const COLOR_TYPE_MAP: {
  [K in RoughAnnotationType]: string 
} = {
  underline: '',
  box: '',
  circle: '',
  highlight: '',
  'strike-through': '#4ea397',
  'crossed-off': '#f00',
  bracket: ''
}

type ShowMethodType = (config: Partial<RoughAnnotationConfig> & { type: RoughAnnotationConfig['type'] }) => void 

export default function useNotation(query: string): [
  ShowMethodType,
  () => void 
] {

  const notationRef = useRef<ReturnType<typeof annotate>>()
  const currentType = useRef('')

  const show: ShowMethodType = useCallback((config) => {
    const { type } = config 
    if(!type) return
    const prevType = currentType.current 
    currentType.current = type
    if(currentType.current !== prevType) {
      notationRef.current?.remove()
      notationRef.current = annotate(document.querySelector(query) as any, {
        color: COLOR_TYPE_MAP[config.type],
        ...config 
      })
    }
    notationRef.current?.show()
  }, [])

  const hide = useCallback(() => {
    notationRef.current?.hide() 
  }, [])

  useEffect(() => {
    return () => {
      notationRef.current?.remove()
    }
  }, [])

  return [
    show,
    hide 
  ]

}