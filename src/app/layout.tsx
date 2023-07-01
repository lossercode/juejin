'use client'
import 'antd/dist/reset.css';
import './globals.css'
import {Providers}  from '@/app/store/provider';

export const metadata = {
  title: '亦语文档',
  description: '打造你的个人知识管理库'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
