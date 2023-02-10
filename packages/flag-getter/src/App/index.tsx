import { useState, useCallback, useEffect, useRef } from 'react'
import {
  Engine,
  Render,
  Runner,
  Body,
  Events,
  Composite,
  Bodies,
  World,
  Common,
  Svg
} from 'matter-js'
// @ts-ignore 
import polyDecomp from 'poly-decomp'
import 'pathseg'
import './index.css'

Common.setDecomp(polyDecomp)

const sandglass = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" version="1.1" width="1000" height="1000">
  <path d="M884.913887 113.294149H139.033638a56.647075 56.647075 0 1 1 0-113.294149h745.880249a56.647075 56.647075 0 1 1 0 113.294149zM139.033638 38.398437a18.23613 18.23613 0 1 0 0 36.47226h745.880249a18.23613 18.23613 0 1 0 0-36.47226H139.033638zM884.913887 1024H139.033638a56.647075 56.647075 0 1 1 0-113.294149h745.880249a56.647075 56.647075 0 1 1 0 113.294149zM139.033638 949.054257a18.23613 18.23613 0 1 0 0 36.472261h745.880249a18.23613 18.23613 0 1 0 0-36.472261H139.033638z" fill="#040000" p-id="2798"/>
  <path d="M192.853987 949.054257a19.199218 19.199218 0 0 1-19.199218-19.199219c0-89.942396 13.645829-167.414682 40.537242-230.265542 21.950898-51.2813 52.70717-93.04429 91.418297-124.100746 46.278246-37.160181 92.694076-49.892952 117.57176-54.233101v-34.846268c-63.91401-3.977428-116.896348-28.129669-157.733773-71.943911-44.239502-47.529009-73.00706-116.208428-85.489679-204.312203-9.168096-64.664468-5.753512-115.282863-5.60342-117.40916a19.202971 19.202971 0 1 1 38.310884 2.701648c-0.175107 2.501527-12.094882 193.192916 80.949407 292.92879 37.285257 40.024429 87.340809 60.224258 148.753292 60.224258a19.199218 19.199218 0 0 1 19.199218 19.199218v70.442995a19.199218 19.199218 0 0 1-18.486283 19.224234c-0.500305 0-58.423159 3.01434-115.182802 49.442677-75.783755 61.975327-115.833199 173.668499-115.833199 322.984634a19.199218 19.199218 0 0 1-19.211726 19.161696zM831.093538 949.054257a19.199218 19.199218 0 0 1-19.199219-19.199219c0-150.516868-40.662318-262.660315-117.57176-324.410504-56.772151-45.477757-112.893905-47.979284-113.494271-47.979284a19.199218 19.199218 0 0 1-18.523806-19.186711V467.785514a19.199218 19.199218 0 0 1 19.236741-19.13668c61.424991 0 111.468035-20.262367 148.753292-60.224258 93.194381-99.885966 81.086992-291.015122 80.949407-292.92879a19.202971 19.202971 0 0 1 38.310884-2.689141c0.150092 2.126298 3.564676 52.744693-5.60342 117.409161-12.507634 88.103774-41.275192 156.845731-85.489679 204.312202-40.837425 43.776719-93.807255 67.966483-157.733773 71.943911v34.858776c24.890192 4.340149 71.293514 17.07292 117.57176 54.233101 38.711127 31.056455 69.4674 72.806938 91.418297 124.100745 26.903921 62.850861 40.537242 140.323146 40.537242 230.265543a19.199218 19.199218 0 0 1-19.161695 19.124173z" fill="#040000" p-id="2799"/>
</svg>
`

const WORD_MAP = [
  "升官发财", "五福临门",
  ...new Array(100).fill(0).map((item, index) => `${Date.now()}_${Math.random()}_${index}`)
]

const GameCanvas = (props: {}) => {

  const EngineInstance = useRef<Engine>()
  const WorldInstance = useRef<World>()
  const RenderInstance = useRef<Render>()
  const RunnerInstance = useRef<Runner>()

  // 随机掉落词语
  // const createWord = useCallback(() => {
  //   var bodyOptions = {
  //     frictionAir: 0, 
  //     friction: 0.0001,
  //     restitution: 0.6
  //   };
  
  //   Composite.add(world, Composites.stack(80, 100, 20, 20, 10, 10, function(x, y) {
  //       if (Query.point([terrain], { x: x, y: y }).length === 0) {
  //           return Bodies.polygon(x, y, 5, 12, bodyOptions);
  //       }
  //   }));
  // }, [])

  // 创建初始物体
  const initExtraBody = useCallback(() => {
    const svg = (new window.DOMParser()).parseFromString(sandglass, 'image/svg+xml')
    const select = function (root: any, selector: string) {
      return Array.prototype.slice.call(root.querySelectorAll(selector));
    }
    const paths = select(svg, 'path')
    console.log(paths, 44444)
    const vertexSets = paths.map(function (path) { return Svg.pathToVertices(path, 30); })
    console.log(vertexSets, 222)
    const body = Bodies.fromVertices(400, 350, vertexSets, {
      isStatic: true,
      render: {
        fillStyle: '#060a19',
        strokeStyle: '#060a19',
        lineWidth: 1
      }
    }, true)
    console.log(body, 2222)
    Composite.add(WorldInstance.current!, body)
  }, [])

  // init 
  useEffect(() => {
    const container = document.querySelector('#flag-getter-caontainer')
    const containerWidth = container?.clientWidth || 0
    const containerHeight = container?.clientHeight || 0
    // create engine
    EngineInstance.current = Engine.create()
    WorldInstance.current = EngineInstance.current!.world
    // create renderer
    RenderInstance.current = Render.create({
      canvas: document.querySelector('#flag-getter-canvas') as any,
      engine: EngineInstance.current,
      options: {
        width: containerWidth,
        height: containerHeight,
        wireframes: false,
        background: "transparent",
      },
    })
    Render.run(RenderInstance.current)
    // create runner
    RunnerInstance.current = Runner.create()
    Runner.run(RunnerInstance.current, EngineInstance.current)

    initExtraBody()

  }, [])

  useEffect(() => {
    const resize = () => {

    }
    window.addEventListener('resize', resize)
    return () => {
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <div
      className="flag-getter-main"
    >
      <canvas id="flag-getter-canvas" />
    </div>
  )
}

function App() {

  return (
    <div id="flag-getter-caontainer">
      <GameCanvas />
    </div>
  )
}

export default App
