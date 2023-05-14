"use client";
import { PropertySafetyTwoTone } from "@ant-design/icons";
import { Row, Col, Image, Layout, Button, Input } from "antd";
import Link from "next/link";
import Styles from "./index.module.scss";
import { useRouter } from "next/navigation";
const { Header } = Layout;
const { Search } = Input;
export default function CommonHeader() {
  const router = useRouter()

  return (
    <Header className={Styles.header}>
      <Row>
        <Col span={3}>
          <Link href="/">
            <Image
              alt="亦语文档"
              src="/logo1.png"
              preview={false}
              height={36}
            />
          </Link>
        </Col>
        <Col span={1}>
          <Link href="/">
            <div style={{ color: "#1677ff" }}>首页</div>
          </Link>
        </Col>
        <Col span={1}>
          <Link href="/answer">
            <div>问答</div>
          </Link>
        </Col>
        <Col span={1}>
          <Link href="/exercise">
            <div>刷题</div>
          </Link>
        </Col>
        <Col span={1}>
          <Link href="/course">
            <div>课程</div>
          </Link>
        </Col>
        <Col span={1}>
          <Link href="/course">
            <div>App下载</div>
          </Link>
        </Col>
        <Col span={6} className="flex justifyCenter" offset={2}>
          <Search placeholder="全站搜索" enterButton allowClear />
        </Col>
        <Col span={3} className="flex justifyEnd">
          <Button type="primary" onClick={() => router.push('/user')}>创作者中心</Button>
        </Col>
        <Col span={2} className='flex justifyEnd'>
          <Link href="/vip">
            <div>
              <PropertySafetyTwoTone style={{fontSize: '28px', verticalAlign: 'middle'}} twoToneColor="#f0ddbb"/>
              <span style={{verticalAlign: 'middle', marginLeft: '5px'}}>会员</span>
            </div>
          </Link>
        </Col>
        <Col span={3} className="flex justifyCenter">
          <Button onClick={() => router.push('/login')}>登录 | 注册</Button>
        </Col>
      </Row>
    </Header>
  );
}
