/**
 * @description: 参考掘金 https://juejin.cn/post/7033046040928321566
 * @return {*}
 * @Date: 2023-06-06 23:23:46
 */
import { useCallback, useEffect, useState } from "react";

export interface RequeseConfig{
    method: string;
    data?: any;
    headers?: any;
    responseType?: string;
    withCredentials?: boolean;
    timeout?: number;
    Authorization?: string;
}
//参考 use-http进行封装
export default function useRequest(url: string, options: RequeseConfig, dependencies: []){
    const [error, setError] = useState<any>(null)
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState(null)

    const fetchData = useCallback( async () => {
        try {
            setLoading(true)
            const response = await fetch(url, options)
            const res = await response.json()
            setData(res.data)
            setLoading(false)
        } catch (error: any) {
            setLoading(false)
            setError(error.message)
        }
    }, [url,options])

    useEffect(() => {
        fetchData()
    })
    
    return {loading, error, data}
}