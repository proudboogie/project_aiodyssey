import '@styles/globals.css'
import Nav from '@components/Nav'
import Provider from '@components/Provider'

export const metadata = {
    title: "AI Odyssey",
    description: 'Your Decision, Your Story',
}

const layout = ({ children }) => {
  return (
    <html lang='en'>
      <body>
        <Provider>
          <div className='scanlines'></div>
          <div className='nav'></div>
          <main className='app'>
            <Nav />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  )
}

export default layout