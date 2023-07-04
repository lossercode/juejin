'use client'
import { useState } from "react"
import useRequest from "../hooks/useRequest"
import { message } from "antd";


export default function Create(){
    const [messageApi, contextHolder] = message.useMessage();
    const [paragraph, setParagraph] = useState('我是')
    const {state, run} = useRequest('http://127.0.0.1:4523/m1/2366702-0-default/user/mytasks?offset=1', {
        method: 'get',
    }, true)
    const getRequest = () => {
        run()
    }
    return (
        <div>
            <h1>我是创作者中心</h1>
            <button onClick={() => getRequest()} >点我请求网络</button>
            <p>{state.data?.total}</p>
        </div>
    )
}