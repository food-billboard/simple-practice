import { useCallback, useState, useRef, useEffect, useMemo } from 'react';
// @ts-ignore
import * as ChartXkcd from 'chart.xkcd'
// @ts-ignore
import { uniqueId } from 'lodash'
import { useContext } from '../../utils/context'
import { WiredButton } from '../../utils/element'
import DataSourceRequest from '../../utils/request'
import { COLOR_MAP } from '../../utils/tool'
import { ChartData } from '../../type'
import useModal from '../Modal'

const InternalChart = (props: {
  dataSource: { name: string, value: number }[]
}) => {

  const { dataSource } = props

  const chartRef = useRef<SVGSVGElement>(null)

  const realDataSource = useMemo(() => {
    let labels: string[] = []
    let values: number[] = []
    dataSource.forEach(item => {
      const { name, value } = item
      labels.push(name)
      values.push(value)
    })
    return {
      labels,
      datasets: [{
        data: values,
      }]
    }
  }, [dataSource])

  useEffect(() => {
    new ChartXkcd.Pie(chartRef.current, {
      title: '',
      data: realDataSource,
      options: {
        backgroundColor: 'transparent',
        dataColors: COLOR_MAP
      }
    })
  }, [realDataSource])

  return (
    <svg
      ref={chartRef}
    />
  )

}

const Chart = () => {

  const [dataSource, setDataSource] = useState<ChartData[]>([])

  const { message } = useContext()

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
    if (todo + complete + remove === 0) return message('暂无数据')
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
        <div style={{ textAlign: 'center' }}>
          <InternalChart dataSource={dataSource} />
        </div>
      </Modal>
    </div>
  )

}

export default Chart