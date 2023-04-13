import { useCallback, useState } from 'react';
import {
  WiredButton as WERWiredButton
} from 'wired-elements-react'
import {
  ArcSeries,
  Arc,
  Tooltip as RTooltip,
  ChartProvider as RChartProvider,
} from 'rough-charts'
import { useContext } from '../../utils/context'
import DataSourceRequest from '../../utils/request'
import { ChartData } from '../../type'
import useModal from '../Modal'

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

const WiredButton = WERWiredButton as any
const ChartProvider = RChartProvider as any
const Tooltip = RTooltip as any

const Chart = () => {

  const [dataSource, setDataSource] = useState<ChartData[]>([])

  const { width, message } = useContext()

  const [Modal, showModal, hideModal, modalProps] = useModal()

  const handleClick = useCallback(() => {
    const currentData = DataSourceRequest.CACHE.todoList
    const { todo, remove, complete } = currentData.reduce(
      (acc, cur) => {
        const { status } = cur
        switch (status) {
          case "complete":
            acc.complete++
            break
          case "delete":
            acc.remove++
            break
          case "todo":
            acc.todo++
            break
        }
        return acc
      },
      {
        todo: 0,
        remove: 0,
        complete: 0,
      }
    )
    if(todo + complete + remove === 0) return message('暂无数据')
    setDataSource([
      {
        name: '待办',
        value: todo
      },
      {
        name: '已办',
        value: complete
      },
      {
        name: '已删除',
        value: remove
      }
    ])
    showModal()
  }, [])

  return (
    <div>
      <WiredButton onClick={handleClick}>待办情况</WiredButton>
      <Modal
        title="待办情况"
        {...modalProps}
        width={0.7}
        cancelText=""
        okText="关闭"
        onOk={hideModal}
      >
        <div style={{textAlign: 'center'}}>
          <ChartProvider
            height={width * 0.5}
            width={width * 0.5}
            data={dataSource}
          >
            <ArcSeries
              dataKey="value"
            >
              {(item, itemProps, index) => {
                return (
                  <Arc
                    key={index}
                    {...itemProps}
                    options={{ fill: COLOR_MAP[index % COLOR_MAP.length] }}
                  />
                )
              }}
            </ArcSeries>
            <Tooltip>
              {
                (activeItem: any) => {
                  const { name, value } = activeItem
                  return `${name}: ${value}`
                }
              }
            </Tooltip>
          </ChartProvider>
        </div>
      </Modal>
    </div>
  )

}

export default Chart