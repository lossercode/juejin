'use client'
import { Button, Form, Image, Input } from 'antd'
import Style from './page.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import { login, quit } from '@/store/features/userSlice'
export default function Login(){
    const token = useSelector((state: any) => state.userReducer.token)
    console.log(token)
    const dispatch = useDispatch()
    const userLogin = () => {
        dispatch(login('has login'))
        console.log(token)
    }
    return (
        <div className={Style.wrap}>
            <Form labelAlign='right' labelCol={{span:6}} >
                <Form.Item label='手机号'>
                    <Input />
                </Form.Item>
                <Form.Item label='密码'>
                    <Input.Password />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" onClick={userLogin}>登录</Button>
                </Form.Item>
            </Form>
        </div>
    )
}