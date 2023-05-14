import 'antd/dist/reset.css';
import './globals.css'

export const metadata = {
  title: '为知笔记',
  description: '打造你的个人知识管理库'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
