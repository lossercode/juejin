'use client'
import { CommentOutlined, HeartOutlined, LikeOutlined, WarningOutlined } from '@ant-design/icons'
import Style from './page.module.scss'
import { useEffect, useState } from 'react'

const operationList = [
    {id: 1, icon: <LikeOutlined style={{fontSize: 16,color: '#8a919f' }}/>},
    {id: 2, icon: <HeartOutlined style={{fontSize: 16,color: '#8a919f' }}/>},
    {id: 3, icon: <CommentOutlined style={{fontSize: 16,color: '#8a919f' }}/>},
    {id: 4, icon: <CommentOutlined style={{fontSize: 16,color: '#8a919f' }}/>},
    {id: 5, icon: <WarningOutlined style={{fontSize: 16,color: '#8a919f' }}/>},
]


function Operation(){
    return (
        <>
            {operationList.map((item) => {
                return (
                    <div 
                        className={Style.operation} key={item.id} 
                    >
                        {item.icon}
                    </div>
                )
            })}
        </>
    )
}
interface Article{
    title: string;
    author: string;
    content: string;
}
export default function Page({ params }: { params: { id: string } }) {
    const [article, setArticle] = useState<Article>()
    useEffect(() => {
        fetch(`http://127.0.0.1:4523/m1/2366702-0-default/api/article?id=${params.id}`, {
            method: 'get'
        }).then((res) => {
            return res.json()
        }).then((res) => {
            setArticle(res)
        })
    }, [params.id])
    return (
        <div className={Style.content}>
            <div className={Style.operations}>
                <Operation />
            </div>
            <div className={Style.article}>
                <h3>{article?.title}</h3>
                <p>{article?.author}</p>
                <div>{article?.content}</div>
            </div>
            <div className={Style.ad}>广告</div>
        </div>
    )
  }