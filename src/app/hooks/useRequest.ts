/**
 * @description: 参考掘金 https://juejin.cn/post/7033046040928321566
 * @return {*}
 * @Date: 2023-06-06 23:23:46
 */
import { useCallback, useEffect, useRef, useState } from "react";

interface RequestOptions {
  method: string;
  data?: any;
}
//参考 use-http进行封装
export default function useRequest(url: string, options: RequestOptions, lazy: boolean = true){
  const error = useRef<boolean>(false)
  const message = useRef<string>('')
  const data = useRef(null)

  const doFetch = async () => {
    console.log('我dofetch运行了')
    try {
      const response = await fetch(url, options);
      const res = await response.json();
      /**
       *  根据服务端响应进行处理，服务器响应格式为：
       *      code: http状态码
       *      message: 状态说明
       *      data: 返回的数据
       */
      if (res.code >= 400) {
        error.current = true
        message.current = res.message
      } else {
        data.current = res.data;
      }
    } catch (error: any) {
      message.current = '未知错误'
    }
  }

  useEffect(() => {
    if(lazy) return
    doFetch();
  });

  return { error, message, data, doFetch };
}
