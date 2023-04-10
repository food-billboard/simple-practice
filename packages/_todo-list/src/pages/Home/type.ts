
type CommonFormProps<T=any> = {
  readonly?: boolean 
  value?: T 
  onChange?: (value: T) => void 
}

export {
  CommonFormProps
}