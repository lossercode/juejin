'use client'
import { Button, Form, Image, Input, message } from 'antd'
import Style from './page.module.scss'
import { useDispatch } from 'react-redux'
import { login} from '@/app/store/features/userSlice'
import { useRouter, useSearchParams } from 'next/navigation'
import useRequest from '../hooks/useRequest'

export default function Login(){
    const dispatch = useDispatch()
    const searchParams = useSearchParams()
    const router = useRouter()
    const [messageApi, contextHolder] = message.useMessage();
    const submit = (value: any) => {
        if(value.username !== '123' || value.passward !== '123'){
            messageApi.info('用户名/密码错误')
            return
        }
        dispatch(login('has login'))
        messageApi.info('登录成功,即将跳转')
        const to = searchParams.get('from')
        setTimeout(() => {
            router.push(to ? to : '/')
        }, 2000);
    }
    return (
        <div className={Style.wrap}>
            {contextHolder}
            <Form 
                labelAlign='right' 
                labelCol={{span:6}} 
                onFinish={submit}
            >
                <Form.Item label='手机号' name='username'>
                    <Input />
                </Form.Item>
                <Form.Item label='密码' name='passward'>
                    <Input.Password />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType='submit'>登录</Button>
                </Form.Item>
            </Form>
        </div>
    )
}