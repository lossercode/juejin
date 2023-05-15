'use client'
import Header from "@/components/Header"
import Style from './page.module.scss'
import { useEffect, useState, useCallback, useRef } from "react"
import { Row, Col, Select, Image } from "antd"
import { CommentOutlined, EyeOutlined, LikeOutlined } from "@ant-design/icons"
export interface List{
  id: number
  author: string
  date: string
  topic: string
  title: string
  des: string
  watch: number
  like: number
  comment: number
  img?: string
}
export default function Home(){
  const [dataList, setDataList] = useState<List[]>([])
  const [currentNav, setCurrentNav] = useState<number>(0)
  const [type, setType] = useState('')
  const [filter, setFilter] = useState('')
  const load = useRef<HTMLSpanElement>(null)

  const nav = [
    {id: 0, type: 'recommand', title: '综合', },
    {id: 1, type: 'graduate', title: '考研', },
    {id: 2, type: 'servant', title: '考公', },
    {id: 3, type: 'cet',  title: '四六级',},
    {id: 4, type: 'math', title: '数学',},
  ]
  const filterOption = [
    [{value: 'english', label: '英语'}, {value: 'math', label: '数学'}, {value: 'zhenzhi', label: '政治'}],
    [{value: 'english', label: '英语'}, {value: 'math', label: '数学'}, {value: 'zhenzhi', label: '政治'}],
    [{value: 'english', label: '英语'}, {value: 'math', label: '数学'}, {value: 'zhenzhi', label: '政治'}],
    [{value: 'english', label: '英语'}, {value: 'math', label: '数学'}, {value: 'zhenzhi', label: '政治'}],
  ]

  const changeNav = (id: number) => {
    setCurrentNav(id)
    setType(nav[id].type)
    if(id > 1){
      setFilter(filterOption[id-1][0]['value'])
    }
  }
  const fetchData = async (type='', filter='') => {
    const req = await fetch(`http://127.0.0.1:4523/m1/2366702-0-default/api/list?type=${type}&filter=${filter}`,{
      cache: 'no-cache'
    })
    const res = await req.json()
    const data = res.data
    setDataList(data)
  }
  const loadData = async (type='', filter='') => {
    //此处有bug,因为元素的高度都设置了为auto，因此scrolltop一直为0
    // listBox.current.scrollHeight - listBox.current.scrollTop <= listBox.current.clientHeight
    
    const req = await fetch(`http://127.0.0.1:4523/m1/2366702-0-default/api/list?type=${type}&filter=${filter}`,{
    cache: 'no-cache'
    })
    const res = await req.json()
    const data = res.data
    setDataList(prevData => [...prevData, ...data])
    
  }

  useEffect(() => {
    fetchData(type, filter)
    
    //使用intersectionObserver实现下来加载
    let observer = new IntersectionObserver((entry) => {
      //大于0表示从不可见变为可见
      if(entry[0].intersectionRatio > 0){
        loadData(type, filter)
      }else{
        return
      }
    })
    observer.observe(load.current as Element)

    return () => {
      observer.disconnect()
    }

  }, [filter, type])


  return (
    <div className={Style.container}>
      <Header />
      <main className={Style.main}>
        <nav className={Style.nav}>
          {nav.map((item) => {
            return (
              <div className={Style.item + ` ${currentNav === item.id ? Style.selected: ''}`} key={item.id} onClick={()=>changeNav(item.id)}>
                {item.title}
              </div>
            )
          })}
        </nav>
        <section className={Style.content}>
          <div className={Style.filter}>
            <Row>
              <Col span={2}>推荐</Col>
              <Col span={2}>最新</Col>
              {currentNav > 0 && 
                <Col span={8}>
                  <Select options={filterOption[currentNav]} defaultValue={filterOption[currentNav][0]} onChange={(value) => setFilter(value.value)}/>
                </Col> 
              }
            </Row>
          </div>
          {
            dataList.map((item) => {
              return (
                <div className={Style.list} key={item.id}>
              <Row style={{height: '20px'}}>
                <Col span={2}>{item.author}</Col>
                <Col span={6}>{item.date}</Col>
                <Col span={6}>{item.topic}</Col>
              </Row>
              <Row style={{height: '80px'}} align='middle'>
                <Col span={item.img ? 18: 24} >
                  <p style={{fontSize: '16px', fontWeight: 'bolder', color: '#000'}}>{item.title}</p>
                  <p className={Style.singleText}>{item.des}</p>
                </Col>
                { item.img && 
                  <Col span={6} className="flex justifyCenter">
                    <Image alt="" src={item.img} width={120} height={80} />
                  </Col>
                }
              </Row>
              <Row style={{height: '20px'}}>
                <Col span={2}>
                  <EyeOutlined />
                  <span>{item.watch}</span>
                </Col>
                <Col span={2}>
                  <LikeOutlined />
                  <span>{item.like}</span>
                </Col>
                <Col span={2}>
                  <CommentOutlined />
                  <span>{item.comment}</span>
                </Col>
              </Row>
          </div>
              )
            })
          }
          <span ref={load}>正在加载</span>
          
        </section>
      </main>
    </div>
  )
}