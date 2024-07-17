import Head from 'next/head';

import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

export default function Meta() {
  return (
    <Head>
      <title>Zleed</title>

      <link rel="icon" href="/favicon.ico" type="image/x-icon" />

      <meta name="name" content="Zleed" />
      <meta name="description" content="A free and open-source streaming platform."/>
      <meta name="keywords" content="zleed, streaming, rtmp, twitch, alternative"/>
      <meta name="theme-color" content="#6366F1"/>

      <meta property="og:site_name" content="Zleed"/>
      <meta property="og:title" content="Zleed"/>
      <meta property="og:type" content="website"/>
      <meta property="og:locale" content="en_GB"/>
      <meta property="og:url" content="https://zleed.tv"/>
      <meta property="og:image" content="https://zleed.tv/img/social_image.png"/>
      <meta property="og:description" content="A free and open-source streaming platform."/>

      <meta name="twitter:card" content="summary_large_image" />
      <meta property="twitter:domain" content="zleed.tv" />
      <meta property="twitter:url" content="https://zleed.tv/" />
      <meta name="twitter:title" content="Zleed" />
      <meta name="twitter:description" content="A free and open-source streaming platform." />
      <meta name="twitter:image" content="https://zleed.tv/img/social_image.png" />

      <meta property="git:repo" content="https://github.com/ZleedApp/TemporaryLanding.git" />
      <meta property="git:commit" content={publicRuntimeConfig.buildId} />
    </Head>
  );
}