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
  'strike-through': '#666',
  'crossed-off': '#f00',
  bracket: ''
}

export default function useNotation(query: string) {

  const notationRef = useRef<ReturnType<typeof annotate>>()
  const currentType = useRef('')

  const element: any = useMemo(() => {
    return document.querySelector(query)
  }, [query])

  const show = useCallback((config: Partial<RoughAnnotationConfig> & { type: RoughAnnotationConfig['type'] }) => {
    const { type } = config 
    if(!type || !element) return
    const prevType = currentType.current 
    currentType.current = type
    if(currentType.current !== prevType) {
      notationRef.current?.remove()
      notationRef.current = annotate(element, {
        color: COLOR_TYPE_MAP[config.type],
        ...config 
      })
    }
  }, [])

  const hide = useCallback(() => {
    currentType.current = '' 
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