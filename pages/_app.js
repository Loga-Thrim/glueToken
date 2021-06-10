import Head from 'next/head';
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>GlueToken Coin</title>
        <link rel="icon" href={`/images/gg.png`} />
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
