# TODO_LIST  
待办事项  

## 数据格式
```ts
// 列表状态
type ToDoStatus = 'todo' | 'delete' | 'complete'
// 分类
type ClassifyData = {
  label: string 
  value: string 
}
// todo项
type ToDoData = {
  classify: string 
  label: string 
  date: string 
  status: ToDoStatus
  top: boolean 
}
```

## 功能  
### 存储   
  定时器定时更新数据，将需要删除的数据进行删除  
### 操作
  - 删除（提示保留1天）    
  - 置顶  
  - 完成/取消完成  
  - 修改  
  - 分类增删改查  
### 动画  
  - 删除横划线  中间横划线   
  - 任务完成  画圈    
  - 新生成  animate__lightSpeedInLeft  