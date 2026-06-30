import { Header } from './header'

export default function IssueLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="mx-auto flex h-dvh w-full max-w-420 flex-col gap-8 p-10">
      <Header />
      {children}
    </div>
  )
}
