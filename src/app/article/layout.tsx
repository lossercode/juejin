import Header from "@/app/components/Header"
export default function RootLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
        <>
        <Header />
        {children}
      </>
    )
  }