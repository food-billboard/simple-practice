import LocalForage from 'localforage'
import PMap from 'p-map'
import { uuid } from './tool'
import { ClassifyData, ListData, ListSearchType } from '../type'

const REQUEST_CACHE_PREFIX = "TODO_LIST_REQUEST_CACHE_PREFIX"
const REQUEST_CACHE_CLASSIFY = `${REQUEST_CACHE_PREFIX}_CLASSIFY`
const REQUEST_CACHE_LIST_DATA = `${REQUEST_CACHE_PREFIX}_LIST_DATA`
const REQUEST_CACHE_IMAGE = "REQUEST_CACHE_IMAGE"

class DataSourceRequest {

  // ---getter---

  // 分类列表
  async getClassifyList(): Promise<ClassifyData[]> {
    try {
      const result = await LocalForage.getItem<ClassifyData[]>(REQUEST_CACHE_CLASSIFY)
      return result || []
    }catch(err) {
      console.error(err)
      return [] 
    }
  }

  // todo搜索查询parse
  parseSearchTodo(value: ListData[], search?: ListSearchType) {
    if(!search) return value 
    const { content, ...nextSearch } = search 
    return value.filter(item => {
      return Object.entries(nextSearch).every(search => {
        const [ key, value ] = search
        return (item as any)[key] === value 
      }) && [ 'label', 'description' ].some(search => (item as any)[search].includes(content))
    })
  }

  // 指定分类todo 
  async getListDataByClassify(_classify?: string, _search?: ListSearchType): Promise<ListData[]> {

    let classify = _classify === 'all' ? '' : _classify
    let search: ListSearchType = _search || {}

    if(typeof _classify === 'object') {
      classify = '' 
      search = _classify 
    }

    try {
      if(classify) {
        const result = await LocalForage.getItem<ListData[]>(`${REQUEST_CACHE_LIST_DATA}_${classify}`) || []
        return result || []
      }else {
        const classifyData = await this.getClassifyList() 
        const result = await PMap<ClassifyData, ListData[]>(classifyData, classify => {
          return this.getListDataByClassify(classify.id, search)
        })
        return result.flat(1)
      }
    }catch(err) {
      console.error(err)
      return [] 
    }
  }

  // ---setter--

  // 增加todo项  
  async postInsertTodo(value: Omit<ListData, 'id' | 'status'>) {
    const { classify } = value 
    try {
      const data = await this.getListDataByClassify(classify)
      data.push({
        ...value, 
        status: 'todo',
        id: uuid() 
      })
      await LocalForage.setItem(`${REQUEST_CACHE_LIST_DATA}_${classify}`, data)
      return true 
    }catch(err) {
      console.error(err)
      return false 
    }
  }

  // 修改todo项
  async postUpdateTodo(id: string, classify: string, value: Partial<Pick<ListData, 'label' | 'description' | 'status'>>) {
    try {
      const data = await this.getListDataByClassify(classify)
      const newData = data.map(item => {
        if(item.id !== id) return item 
        return {
          ...item,
          ...value 
        }
      })
      await LocalForage.setItem(`${REQUEST_CACHE_LIST_DATA}_${classify}`, newData)
      return true 
    }catch(err) {
      console.error(err)
      return false 
    }
  }

  // 增加classify 
  async postInsertClassify(classify: Omit<ClassifyData, 'id'>) {
    try {
      const data = await this.getClassifyList()
      const newData: ClassifyData = {
        ...classify,
        id: uuid()
      }
      data.push(newData)
      await LocalForage.setItem(REQUEST_CACHE_CLASSIFY, data)
      return true 
    }catch(err) {
      console.error(err)
      return false 
    }
  }

  // 删除classify 
  async postDeleteClassify(id: string) {
    try {
      const listDataKey = `${REQUEST_CACHE_LIST_DATA}_${id}` 
      await LocalForage.removeItem(listDataKey)
      const data = await this.getClassifyList()
      const newData = data.filter(item => item.id !== id)
      await LocalForage.setItem(REQUEST_CACHE_CLASSIFY, newData)
      return true 
    }catch(err) {
      console.error(err)
      return false 
    }
  }

  // 修改classify 
  async postUpdateClassify(id: string, label: string) {
    try {
      const data = await this.getClassifyList()
      const newData = data.map(item => {
        if(item.id !== id) return item 
        return {
          ...item,
          label 
        }
      })
      await LocalForage.setItem(REQUEST_CACHE_CLASSIFY, newData)
      return true 
    }catch(err) {
      console.error(err)
      return false 
    }
  }

  // 文件上传
  async postImageUpload(file: File): Promise<string> {
    return new Promise(resolve => {
      const fileReader = new FileReader() 
      fileReader.onload = (e) => {
        const result = e.target?.result
        resolve(result as string || '')
      }
      fileReader.readAsDataURL(file)
    })
  }

}

export default new DataSourceRequest() 