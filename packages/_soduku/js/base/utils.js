
const keys = [
  'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K',
  'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V',
  'W', 'X', 'Y', 'Z', '0', '1', '2', '3', '4', '5', '6',
  '7', '8', '9'
]
export function uuid(prefix='soduku') {
  return `${prefix}_${Date.now()}_${new Array(5).fill(0).map(item => keys[Math.floor(Math.random() * keys.length)]).join('_')}_${Math.random()}`
}

const DEFAULT_SODUKU_LIST = [
  [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ],
  [ 2, 3, 4, 5, 6, 7, 8, 9, 1 ],
  [ 3, 4, 5, 6, 7, 8, 9, 1, 2 ],
  [ 4, 5, 6, 7, 8, 9, 1, 2, 3 ],
  [ 5, 6, 7, 8, 9, 1, 2, 3, 4 ],
  [ 6, 7, 8, 9, 1, 2, 3, 4, 5 ],
  [ 7, 8, 9, 1, 2, 3, 4, 5, 6 ],
  [ 8, 9, 1, 2, 3, 4, 5, 6, 7 ],
  [ 9, 1, 2, 3, 4, 5, 6, 7, 8 ]
]

function randomIndexFunc(count=2) {

  const base = [
    Math.floor(Math.random() * 9),
    ...new Array(count - 1).fill(0)
  ]

  function randomMethod(origin) {
    const index = Math.floor(Math.random() * 9)
    if(origin.includes(index)) {
      return randomMethod(origin)
    }
    return index
  }
  
  const result = base.reduce((acc, item, index) => {
    if(index === 0) {
      acc.push(item)
    }else {
      acc.push(randomMethod(acc))
    }
    return acc 
  }, [])

  return result
}

export function generateSoduku() {
  let tempSoduku = [...DEFAULT_SODUKU_LIST]
  // 行打乱
  tempSoduku.sort(() => Math.random() - 0.5)
  console.log(tempSoduku, 2222)
  // 列打乱
  const [ randomIndex, randomIndexAfter ] = randomIndexFunc()
  tempSoduku.forEach((_, index) => {
    const temp = tempSoduku[index][randomIndex]
    tempSoduku[index][randomIndex] = tempSoduku[index][randomIndexAfter]
    tempSoduku[index][randomIndexAfter] = temp 
  })
  console.log(tempSoduku, 33333)
  // 掏空格子
  // 先设置每行两个格子
  tempSoduku = tempSoduku.map(item => {
    const emptyIndex = randomIndexFunc()
    return item.map((item, index) => {
      if(emptyIndex.includes(index)) return -1
      return item
    })
  })
  console.log(tempSoduku)
  return tempSoduku
}

generateSoduku()