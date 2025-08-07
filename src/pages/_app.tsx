import type { AppProps } from 'next/app';
import '../styles/globals.css';
import 'prismjs/themes/prism-okaidia.css';

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;