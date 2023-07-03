'use client'
import { lazy, useState } from "react"
import useRequest from "../hooks/useRequest"

export default function Create(){
    const [paragraph, setParagraph] = useState('我是')
    const {error, message, data, doFetch} = useRequest('http://127.0.0.1:4523/m1/2366702-0-default/user/mytasks?offset=1', {
        method: 'get',
    })
    const getRequest = () => {
        console.log('我点击了')
        doFetch()
        console.log(data.current)
    }
    return (
        <div>
            <h1>我是创作者中心</h1>
            <button onClick={() => getRequest()} >点我请求网络</button>
            <p>{paragraph}</p>
        </div>
    )
}