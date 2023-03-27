const keys = [
  'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K',
  'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V',
  'W', 'X', 'Y', 'Z', '0', '1', '2', '3', '4', '5', '6',
  '7', '8', '9'
]
export function uuid(prefix='sudoku') {
  return `${prefix}_${Date.now()}_${new Array(5).fill(0).map(item => keys[Math.floor(Math.random() * keys.length)]).join('_')}_${Math.random()}`
}

// 去重
export function duplicateRemoval(array) {
  return array.reduce((acc, cur) => {
    if(!acc.includes(cur)) acc.push(cur)
    return acc 
  }, [])
}

export class Interval {

  static onChangeList = [] 
  static onChange(callback) {
    this.onChangeList.push(callback)
  }

  counter = 0 
  timestamps = -1 
  timer 

  reset() {
    this.counter = 0 
    this.timestamps = - 1
  }

  stop() {
    clearTimeout(this.timer)
  }

  update = (first=false) => {
    if(!first) {
      this.counter ++ 
      let hour = Math.floor(this.counter / 60 / 60)
      let minute = Math.floor((this.counter - hour * 60 * 60) / 60)
      let second = Math.floor(this.counter - hour * 60 * 60 - minute * 60)
      hour = hour > 9 ? hour : `0${hour}`
      minute = minute > 9 ? minute : `0${minute}`
      second = second > 9 ? second : `0${second}`
      Interval.onChangeList.forEach(callback => callback(`${hour}:${minute}:${second}`))
    }else {
      this.reset()
    }
    this.timer = setTimeout(this.update, 1000)
  }

}

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

// 数独生成
export function generateSudoku(level) {

  const baseDataSource = []

  class Block {

    constructor([value, ...condition]) {
      this.value = value 
      this.condition = condition
    }

    value 
    condition 

    replaceCondition() {
      this.value = this.condition.splice(0, 1)[0]
      return this.value
    }

  }
  const BASE_DATA = new Array(9).fill(0).map((_, index) => index + 1)

  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      // 第一行
      if (i === 0) {
        baseDataSource.push(
          ...new Array(9)
            .fill(0)
            .map((_, index) => index + 1)
            .sort(() => (Math.random() > 0.5 ? 1 : -1))
            .map((item) => new Block([item])),
        );
        break;
      } else {
        const currentIndex = i * 9 + j;

        let block = baseDataSource[currentIndex];
        if (block) {
          block.replaceCondition()
        } else {
          const currentRowBlock = baseDataSource
            .slice(i * 9, i * 9 + j)
            .map((item) => item.value);
          const prevColumnBlock = [];
          const prevRowBlock = new Array(i).fill(0).map((_, index) => {
            return baseDataSource[index * 9 + j].value 
          })
          for (let q = Math.floor(i / 3) * 3; q <= i; q++) {
            const start = Math.floor(j / 3) * 3;
            for (let p = start; p < start + 3; p++) {
              const target = baseDataSource[q * 9 + p]
              if(target) prevColumnBlock.push(target.value);
            }
          }
          const condition = BASE_DATA.filter(
            (item) =>
              !currentRowBlock.includes(item) && !prevColumnBlock.includes(item) && !prevRowBlock.includes(item),
          ).sort(() => (Math.random() > 0.5 ? -1 : 1));
          block = new Block(condition);
        }

        if (typeof block.value === 'number') {
          baseDataSource[currentIndex] = block;
        } else {
          if (j === 0) {
            i -= 2;
            baseDataSource.splice(currentIndex, 9)
            break 
          } else {
            j -= 2;
            baseDataSource[currentIndex] = undefined
          }
        }
      }
    }
  }

  return baseDataSource.map(item => item.value)

}