import './globals.css'

export const metadata = {
  title: '美容室棚卸管理システム',
  description: '美容室の在庫・棚卸管理アプリ',
}

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  )
}
