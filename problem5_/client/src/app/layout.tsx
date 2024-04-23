'use client'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Provider } from 'react-redux';
const inter = Inter({ subsets: ['latin'] })
import { store } from '@/redux-store/store'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const metadata: Metadata = {
    title: 'Create Next App',
    description: 'Generated by create next app',
  }
 
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Todolist</title>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/remixicon@2.5.0/fonts/remixicon.css"
        />
        <link rel="stylesheet" href="/fonts/icons.css" />
        <link
          rel="stylesheet"
          href="/vendors/swiper/swiper-bundle.min.css"
        />
        <link rel="stylesheet" href="/css/styles.bundle.css" />
        <link
          rel="shortcut icon"
          href="https://realthemes.github.io/marketop/favicon.ico"
        />
        <link rel="stylesheet" href="/css/adminlte.min.css" />
        <link
          rel="stylesheet"
          href="/font-awesome/fontawesome-free/css/all.min.css"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        />
      </head>
      <body>
        <Provider store={store}>
          <>
            {children}
          </>

        </Provider>
      </body>
    </html>
  )
}
