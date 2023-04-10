
// 分类
type ClassifyData = {
  id: string 
  label: string 
}

// 列表项
type ListData = {
  id: string 
  classify: string 
  status: 'todo' | 'delete' | 'complete'
  label: string 
  description?: string 
}

// 列表搜索项
type ListSearchType = Partial<Pick<ListData, 'status'> & {
  content?: string 
}>

// 表单
type CommonFormProps<T=any> = {
  readonly?: boolean 
  value?: T 
  onChange?: (value: T) => void 
}

export {
  CommonFormProps,
  ClassifyData,
  ListData,
  ListSearchType
}