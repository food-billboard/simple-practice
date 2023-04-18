
// 图表数据
export type ChartData = {
  name: string 
  value: number 
}

// 全局数据
export type ContextData = {
  classify: ClassifyData[]
  width: number 
  message: (message: string, duration?: number) => void 
}

// 分类
export type ClassifyData = {
  id: string 
  label: string 
}

// 列表项
export type ListData = {
  id: string 
  classify: string 
  status: 'todo' | 'delete' | 'complete'
  label: string 
  top: boolean 
  images?: string[] 
  description?: string 
  timestamps: number 
}

// 列表搜索项
export type ListSearchType = Partial<Pick<ListData, 'status'> & {
  content?: string 
}>

// 表单
export type CommonFormProps<T=any> = {
  readonly?: boolean 
  value?: T 
  onChange?: (value: T) => void 
}