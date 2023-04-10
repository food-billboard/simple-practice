import DataBus, { EVENT_EMITTER, EVENT_EMITTER_NAME } from '../../../databus'

const dataBus = new DataBus()

// 提示
class MemoAction {
  
  emit() {
    const sudokuData = dataBus.sudokuData
    // const targetEmptyIndex = sudokuData.findIndex(item => !item)
    // const targetEmpty = sudokuData[targetEmptyIndex]

    let inputMap = {
      // key: {
      //   value: 值
      //   condition: [1, 2]
      // }
    }
    const emptyList = [] 
    const mapList = new Array(9).fill(0).map((_, index) => index + 1)

    for(let index = 0; index < sudokuData.length; index ++) {

      const currentData = sudokuData[index] || (inputMap[index] || {}).value 
      if(currentData) {
        continue
      }

      emptyList.push(index)

      const x = index % 9 
      const y = Math.floor(index / 9)
      const startX = Math.floor(x / 3) * 3 
      const startY = Math.floor(y / 3) * 3 
      const relationRow = new Array(9).fill(0).map((item, index) => {
        const ind = index * 9 + x
        return sudokuData[ind] || (inputMap[ind] || {}).value 
      })
      const relationColumn = new Array(9).fill(0).map((item, index) => {
        const ind = y * 9 + index
        return sudokuData[ind] || (inputMap[ind] || {}).value 
      })
      const relationGrid = new Array(3).fill(0).reduce((acc, cur, index) => {
        sudokuData.push(...new Array(3).fill(0).map((_, ind) => {
          const i = (startY + index) * 9 + (startX + ind)
          return sudokuData[i] || (inputMap[i] || {}).value 
        }))
        return sudokuData 
      }, [])

      const condition = mapList.filter(item => !relationRow.includes(item) && !relationColumn.includes(item) && !relationGrid.includes(item))
      if(!condition.length) {
        let prevIndex 
        do {
          if(typeof prevIndex === 'number') delete inputMap[prevIndex]
          emptyList.pop()
          const [ _prevIndex ] = emptyList.slice(-1)
          prevIndex = _prevIndex 
        }while(!!inputMap[prevIndex].condition.length)
  
        inputMap[prevIndex].value = inputMap[prevIndex].condition.pop() 
        index = prevIndex - 1 
      }else {
        const value = condition.pop()
        inputMap[index] = {
          value,
          condition,
        }
      }
      
    }

    EVENT_EMITTER.emit(EVENT_EMITTER_NAME.ON_MEMO)
  }

}

export default new MemoAction()