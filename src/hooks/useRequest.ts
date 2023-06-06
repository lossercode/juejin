/**
 * @description: 参考掘金 https://juejin.cn/post/7033046040928321566
 * @return {*}
 * @Date: 2023-06-06 23:23:46
 */
import { useState } from "react";

export interface RequeseConfig{
    method: string;
    data?: any;
    headers?: any;
    responseType?: string;
    withCredentials?: boolean;
    timeout?: number;
    Authorization: string;
}
export function useRequest(url: string, config: RequeseConfig){
    const [error, setError] = useState<any>(null)
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState(null)
    
    const useFetch = async () => {
        try {
            setLoading(true)
            const response = await fetch(url, config)
            const data = await response.json()
            setData(data)
            setLoading(false)
        } catch (error: any) {
            setLoading(false)
            setError(error.message)
        }
    }
    return {loading, error, useFetch}
}