import Head from "next/head";
import "../styles/globals.css";
import Layout from "./Layout";
// import "../dist/output.css";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Solidity On Solana</title>
        <meta name='description' content='Decentralized Supply chain tracker' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}