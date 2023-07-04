/**
 * @description: 参考掘金 https://juejin.cn/post/7033046040928321566
 * @return {*}
 * @Date: 2023-06-06 23:23:46
 */
import { useCallback, useEffect, useReducer, useRef, useState } from "react";

interface RequestOptions {
  method: string;
  data?: any;
}

export default function useRequest(
  url: string,
  options: RequestOptions,
  lazy: boolean = false
) {

  // const error = useRef('')
  // const data = useRef(null)
  // const [start, setStart]  = useState({current: lazy})

  const initialState = {
		status: 'idle',
		error: null,
		data: [],
	};

	const [state, dispatch] = useReducer((state: any, action: { type: any; payload?: any; }) => {
		switch (action.type) {
			case 'FETCHING':
				return { ...initialState, status: 'fetching' };
			case 'FETCHED':
				return { ...initialState, status: 'fetched', data: action.payload };
			case 'FETCH_ERROR':
				return { ...initialState, status: 'error', error: action.payload };
			default:
				return state;
		}
	}, initialState);


  const fetchData = useCallback(async () => {
    try {
      dispatch({type: 'FETCHING'})
      const response = await fetch(url, options);
      const res = await response.json();
      if (res.code >= 400) {
        dispatch({type: 'FETCH_ERROR', payload: res.message})
        // error.current = res.message
      } else {
        dispatch({type: 'FETCHED', payload: res.data})
        // data.current = res.data
      }
    } catch (e: any) {
      dispatch({type: 'FETCH_ERROR', payload: e.message})
      // error.current = e.message
    }
  }, [url, options]);

  const run = () => {
    fetchData()
  }

  useEffect(() => {
    if(lazy) return

    fetchData();

  }, [lazy, fetchData]);

  return { state, run };
}
