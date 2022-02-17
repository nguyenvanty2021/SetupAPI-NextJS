import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { SWRConfig } from 'swr'
import axiosClient from '../api-client/axios-client'
// const fetcher = (...args: any) => fetch(...args).then((res) => res.json());
function MyApp({ Component, pageProps }: AppProps) {
  return <SWRConfig value={{fetcher: (url) => axiosClient.get(url), shouldRetryOnError: false}}>
    {' '}
    <Component {...pageProps} />
  </SWRConfig>
//   return <SWRConfig value={{fetcher}}>
//   {' '}
//   <Component {...pageProps} />
// </SWRConfig>
}

export default MyApp
