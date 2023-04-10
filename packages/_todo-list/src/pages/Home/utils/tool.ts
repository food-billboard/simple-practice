
function uuid() {
  return `todo-uuid-${Math.random()}-${Math.random()}_${Date.now()}`
}

export {
  uuid
}