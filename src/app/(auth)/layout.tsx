import '../globals.css'

export const metadata = {
  title: 'Login to the app',
  description: 'This page dedicated to auth in Update app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="uk">
      <body>{children}</body>
    </html>
  )
}
