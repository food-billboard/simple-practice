
const keys = [
  'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K',
  'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V',
  'W', 'X', 'Y', 'Z', '0', '1', '2', '3', '4', '5', '6',
  '7', '8', '9'
]
export function uuid(prefix='soduku') {
  return `${prefix}_${Date.now()}_${new Array(5).fill(0).map(item => keys[Math.floor(Math.random() * keys.length)]).join('_')}_${Math.random()}`
}

export function generateSoduku() {
  
}