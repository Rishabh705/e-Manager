import '@/app/styles/globals.css'
import Header from './components/Header/Header'
import Contact from './components/Contact/Contact'
import AuthProvider from './components/AuthProvider/AuthProvider'

export const metadata = {
  title: 'e-Manager',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className='main-body'>
        <AuthProvider>
          <Header />
          {children}
          <Contact />
        </AuthProvider>
      </body>
    </html>
  )
}
