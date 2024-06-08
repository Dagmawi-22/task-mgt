import { userDataAtom } from 'data/atoms'
import { useAtom } from 'jotai'
import LoginWithGoogle from './GoogleLogin'
import { GoogleOAuthProvider } from '@react-oauth/google'
import TrelloBoard from './Board'
import { Analytics } from '@vercel/analytics/react'

function App() {
  const [data, setData] = useAtom(userDataAtom)

  return (
    <GoogleOAuthProvider clientId="781628626191-9a7sdn64mj0b0eppfv30inp1i7010fb9.apps.googleusercontent.com">
      <Analytics />
      <div
        className="relative overflow-hidden bg-cover"
        style={{
          backgroundImage:
            "url('https://c0.wallpaperflare.com/preview/751/2/550/chart-graph-business-finance.jpg')"
        }}
      >
        <div className="h-screen flex justify-center items-center">
          <div style={{ marginTop: 10 }}>
            {data ? <TrelloBoard /> : <LoginWithGoogle />}
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  )
}

export default App
