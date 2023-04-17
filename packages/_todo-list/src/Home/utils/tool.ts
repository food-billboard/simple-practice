
function uuid() {
  return `todo-uuid-${Math.random()}-${Math.random()}_${Date.now()}`
}

const COLOR_MAP = [
  "#c12e34",
  "#e6b600",
  "#0098d9",
  "#2b821d",
  "#005eaa",
  "#339ca8",
  "#cda819",
  "#32a487"
]

export {
  uuid,
  COLOR_MAP
}