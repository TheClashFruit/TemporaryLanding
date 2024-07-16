import Head from 'next/head';
import Image from 'next/image';

import { Outfit } from 'next/font/google';

import styles from '@/styles/Home.module.scss';
import { Github, Mail, MessageSquare } from 'lucide-react';
import Link from 'next/link';

const outfit = Outfit({
  subsets: [
    'latin'
  ],
  variable: '--outfit'
});

export default function Home() {
  return (
    <>
      <Head>
        <title>Zleed</title>

        <link rel="icon" href="/favicon.ico" type="image/x-icon" />

        <meta name="name" content="Zleed" />
        <meta name="description" content="A free and open-source streaming platform."/>
        <meta name="keywords" content="zleed, streaming, rtmp, twitch, alternative"/>
        <meta name="theme-color" content="#00796B"/>

        <meta property="og:site_name" content="Zleed"/>
        <meta property="og:title" content="Zleed"/>
        <meta property="og:type" content="website"/>
        <meta property="og:locale" content="en_GB"/>
        <meta property="og:url" content="https://zleed.tv"/>
        <meta property="og:image" content="https://zleed.tv/img/social_image.png"/>
        <meta property="og:description" content="A free and open-source streaming platform."/>

      </Head>
      <main className={`${styles.main} ${outfit.variable}`}>
        <header className={styles.pageHeader}>
          <div className={styles.container}>
            <div className={styles.title}>
              <div>
                <h1>Zleed</h1>
                
                <p>
                  A free and open-source streaming platform.
                </p>
              </div>

              <ul>
                <li>
                  <Link href="https://github.com/ZleedApp" title="GitHub" className={styles.socialButton}>
                    <Github />
                  </Link>
                </li>
                <li>
                  <Link href="https://discord.gg/gaezTFyTV2" title="Discord" className={styles.socialButton}>
                    <MessageSquare />
                  </Link>
                </li>
                <li>
                  <Link href="mailto:info@zleed.tv" title="Contact Us" className={styles.socialButton}>
                    <Mail />
                  </Link>
                </li>
              </ul>
            </div>

            <Image src="/img/HomePage.png" alt="Mockup of Zleed's Homepage" width={1280} height={800} />
          </div>
        </header>

        <div className={styles.sections}>
          <section>
            <div className={styles.container}>
              <h2>Our Team</h2>

              
            </div>
          </section>
        </div>

        <footer className={styles.footer}>
          <div className={styles.container}>
            <div>
              <p>Copyright &copy; {new Date().getFullYear()} Zleed.</p>
              <p>This page is <Link href="https://github.com/ZleedApp/TemporaryLanding">open-source</Link>.</p>
            </div>

            <form>
              <input type="email" placeholder="Email Address" name="email" />
              <button type="submit">Subscribe</button>
            </form>
          </div>
        </footer>
      </main>
    </>
  );
}
