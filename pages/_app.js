import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import LoadingBar from 'react-top-loading-bar';
import '../styles/globals.css';
import { Provider } from 'react-redux'
import { persistor, store } from '../store';
import { PersistGate } from 'redux-persist/integration/react';
import Bottom from '../components/Bottom';


function MyApp({ Component, pageProps }) {

  const [cart, setCart] = useState({})
  const [subTotal, setSubTotal] = useState(0)
  const [user, setUser] = useState({ value: null })
  const [key, setKey] = useState()
  const [progress, setProgress] = useState(0)
  const router = useRouter()

  useEffect(() => {
    router.events.on('routeChangeStart', () => {
      setProgress(40);
    })
    router.events.on('routeChangeComplete', () => {
      setProgress(100);
    })
    const myuser = JSON.parse(localStorage.getItem('myuser'));
    if (myuser) {
      setUser({ value: myuser.token, email: myuser.email })
    }
    setKey(Math.random())
  }, [router.query])

  const logout = () => {
    localStorage.removeItem('myuser')
    setUser({ value: null })
    setKey(Math.random())
    router.push('/')
  }

  return <>
    <LoadingBar
      color='#4346e1'
      progress={progress}
      waitingTime={400}
      onLoaderFinished={() => setProgress(0)}
    />
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        {key && <Navbar logout={logout} user={user} key={key} />}
        <Component {...pageProps} />
        <Bottom logout={logout} user={user} />
        <Footer />
      </PersistGate>
    </Provider>
  </>
}

export default MyApp
