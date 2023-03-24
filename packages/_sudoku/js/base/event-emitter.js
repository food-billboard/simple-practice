import { uuid } from './utils/index'

const EMITTER_NAME_MAP = {}
let instance 

export default class EventEmitter {

  constructor() {
    if(instance) return instance 
    instance = this 

    return instance
  }

  emit(eventName, ...args) {
    const target = EMITTER_NAME_MAP[eventName] || [] 
    target.forEach(item => {
      const { handler, context } = item 
      handler.call(context, ...args)
    })
  }

  addListener(eventName, handler, context) {
    if(!EMITTER_NAME_MAP[eventName]) EMITTER_NAME_MAP[eventName] = []
    const uid = uuid()
    EMITTER_NAME_MAP[eventName].push({
      context: context || this,
      handler,
      uuid: uid 
    })
    return uid 
  }

  removeListener(eventName, handler) {
    if(!EMITTER_NAME_MAP[eventName]) return 
    EMITTER_NAME_MAP[eventName] = EMITTER_NAME_MAP[eventName].filter(item => {
      return typeof handler === 'string' ? item.uuid !== handler : item.handler !== handler
    })
  }

}