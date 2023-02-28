import { useEffect, useRef, useState } from 'react'
import Anime from 'animejs'
import { uniqueId } from 'lodash'
import EventEmitter from 'eventemitter3'
import styles from './index.less'

const PREFIX = "PREFIX"

const emitter = new EventEmitter()

const list = [
  {
    width: 100,
    height: 100,
    backgroundColor: 'red',
    type: 'normal'
  },
  {
    width: 100,
    height: 100,
    backgroundColor: 'green',
    type: 'normal'
  },
  {
    width: 100,
    height: 100,
    backgroundColor: 'yellow',
    type: 'normal'
  },
]

const FadeComponent = (props: {
  width: number 
  height: number 
  backgroundColor: string 
}) => {

  const ref = useRef(null)

  return (
    <div 
      style={{
        width: 200,
        height: 200,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute'
      }}
      ref={ref}
    >
      <div
        style={{
          backgroundColor: props.backgroundColor,
          width: props.width,
          height: props.height,
        }}
      >

      </div>
    </div>
  )

}

const LeftComponent = (props: {
  width: number 
  height: number 
  backgroundColor: string 
  defaultState?: number 
  isActive: boolean 
  index: number 
}) => {

  const { defaultState=0, index } = props

  const ref = useRef<HTMLDivElement>(null)
  const idRef = useRef(uniqueId(PREFIX))

  const animeStart = useRef<Anime.AnimeInstance>()

  const animeEnd = useRef<Anime.AnimeInstance>()

  useEffect(() => {
    if(!animeEnd.current) animeEnd.current = Anime({
      autoplay: false,
      translateX: '-100%',
      targets: `#${idRef.current}`,
    })
    if(!animeStart.current) animeStart.current = Anime({
      autoplay: false,
      translateX: 0,
      targets: `#${idRef.current}`,
      complete: () => {
        setTimeout(() => {
          animeEnd.current?.play()
        }, 2000)
      }
    })
    const emit = (currentIndex: number) => {
      if(currentIndex === index) {
        console.log('current index')
        if(ref.current) ref.current.style.transform = 'translateX(100%)'
        animeStart.current?.play()
      }
    }

    emitter.addListener('index', emit)
    return () => {
      emitter.removeListener('index', emit)
    }

  }, [index])

  return (
    <div 
      id={idRef.current}
      ref={ref}
      style={{
        width: 200,
        height: 200,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        transform: 'translateX(100%)'
      }}
    >
      <div
        style={{
          backgroundColor: props.backgroundColor,
          width: props.width,
          height: props.height,
        }}
      >

      </div>
    </div>
  )
}

const AnimeCarousel = () => {

  const [ index, setIndex ] = useState(0)

  const timer = useRef<NodeJS.Timeout>()

  useEffect(() => {
    timer.current = setInterval(() => {
      setIndex(prev => (prev + 1) % list.length)
    }, 3000)
    return () => {  
      clearInterval(timer.current)
    }
  }, [])

  useEffect(() => {
    emitter.emit('index', index)
  }, [index])

  return (
    <div
      style={{
        width: 200,
        height: 200,
        border: '1px solid black',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        position: 'relative',
        left: '50%',
        top: '50%',
        transform: 'translateX(-50%) translateY(-50%)',
      }}
    >
      {
        list.map((item, ind) => {
          const { type } = item 
          if(type === 'fade') return (
            <FadeComponent key={item.backgroundColor} {...item} />
          )
          return (
            <LeftComponent 
              key={item.backgroundColor} 
              {...item} 
              index={ind}
              isActive={index === ind} 
              defaultState={ind === 0 ? 1 : 0}
            />
          )
        })
      }
    </div>
  )

}

export default AnimeCarousel