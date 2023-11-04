import Head from 'next/head';

import HomeTemp from '@/components/layout/Home';

export default function Home() {
  return (
    <>
      <Head>
        <title>Doctor App | Portal</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <HomeTemp/>
      </main>
    </>
  )
}
