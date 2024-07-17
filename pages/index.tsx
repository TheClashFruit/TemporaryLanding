import Head from 'next/head';
import Image from 'next/image';

import { Outfit } from 'next/font/google';

import styles from '@/styles/Home.module.scss';
import { Github, Mail, MessageSquare } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const outfit = Outfit({
  subsets: [
    'latin'
  ],
  variable: '--outfit'
});

export default function Home() {
  const router = useRouter();

  const onSubmit = async (e: any) => {
    e.preventDefault();

    const data = new FormData(e.target);

    const f = await fetch('/api/subscribe', {
      method: 'POST',
      body: JSON.stringify({
        email: data.get('email'),
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const r = await f.json();

    if (r.error) {
      alert(r.error);
    } else {
      router.push('/subscription?token=' + r.token);
    }
  };

  return (
    <>
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

              <div className={styles.teamGrid}>
                <div>
                  <div>
                    <Image src="https://avatars.githubusercontent.com/u/55049569?v=4" alt="TheClashFruit" width={128} height={128} quality={100} />

                    <div>
                      <h3>
                        TheClashFruit
                      </h3>

                      <p>Founder & Lead Developer</p>
                    </div>
                  </div>

                  <p>
                    A full-stack web, mobile developer & mod creator.
                  </p>
                </div>

                <div>
                  <div>
                    <Image src="https://avatars.githubusercontent.com/u/156634440?v=4" alt="Myadeleines" width={128} height={128} quality={100} />

                    <div>
                      <h3>
                        Choco-Madeleines
                      </h3>

                      <p>Lead Designer</p>
                    </div>
                  </div>

                  <p>
                    Person enjoying both art and computers.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>

        <footer className={styles.footer}>
          <div className={styles.container}>
            <div>
              <p>Copyright &copy; {new Date().getFullYear()} Zleed.</p>
              <p>This page is <Link href="https://github.com/ZleedApp/TemporaryLanding">open-source</Link>.</p>
            </div>

            <form onSubmit={onSubmit}>
              <input type="email" placeholder="Email Address" name="email" />
              <button type="submit">Subscribe</button>
            </form>
          </div>
        </footer>
      </main>
    </>
  );
}
