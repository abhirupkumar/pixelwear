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
import { LinearProgress } from '@mui/material';

function MyApp({ Component, pageProps }) {

  const [key, setKey] = useState()
  const [progress, setProgress] = useState(0)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    router.events.on('routeChangeStart', () => {
      if (!(router.asPath.includes("adminpanel_lesoft"))) {
        setLoading(true)
      }
      setProgress(40);
    })
    router.events.on('routeChangeComplete', () => {
      setLoading(false)
      setProgress(100);
    })
    setKey(Math.random())
  }, [router.query])

  return <>
    <LoadingBar
      color='#4346e1'
      progress={progress}
      waitingTime={400}
      onLoaderFinished={() => setProgress(0)}
    />
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        {key && <Navbar key={key} />}
        {loading ? <div className='flex flex-col items-center mt-28 min-h-screen'>
          <p className="text-[#60259b] font-bold text-2xl">Loading</p>
          <LinearProgress color="secondary" sx={{
            width: '20%',
          }} /></div> : <Component {...pageProps} />}
        <Bottom />
        <Footer />
      </PersistGate>
    </Provider>
  </>
}

export default MyApp
