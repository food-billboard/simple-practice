import { useCallback, useEffect, useMemo, useState } from 'react';
import IsMobile from 'is-mobile';
import { 
  WiredCard as WERWiredCard,
  WiredCombo as WERWiredCombo,
  WiredItem as WERWiredItem
} from 'wired-elements-react'
import DataSourceRequest from './utils/request'
import { ListData, ClassifyData } from './type'
import './index.less'

const WiredCard = WERWiredCard as any 
const WiredCombo = WERWiredCombo as any 
const WiredItem = WERWiredItem as any 

const isMobile = IsMobile()

function HomePage() {

  const [ fetchLoading, setFetchLoading ] = useState(true)
  const [ classifyList, setClassifyList ] = useState<ClassifyData[]>([])
  const [ currentClassify, setCurrentClassify ] = useState('')

  const fetchClassifyList = useCallback(async () => {
    setFetchLoading(true) 
    const result = await DataSourceRequest.getClassifyList()
    setClassifyList(result)
    setFetchLoading(false)
  }, [])

  const fetchData = useCallback(() => {

  }, [])

  const classifyDomList = useMemo(() => {
    return classifyList.map(item => {
      const { id, label } = item 
      return (
        <WiredItem value={id}>{label}</WiredItem>
      )
    })
  }, [classifyList])

  useEffect(() => {
    fetchClassifyList()
    .then(fetchData)
  }, [])

  return (
    <div className={`todo-list-container-${isMobile ? 'h5' : 'pc'}`}>
      <header>
        22222
      </header>
      <section>
        <WiredCombo id="classify-select" selected={currentClassify}>
          <WiredItem value="">全部</WiredItem>
          {classifyDomList}
        </WiredCombo>
        <WiredCard>
          
        </WiredCard>
      </section>
    </div>
  );
}

export default HomePage
