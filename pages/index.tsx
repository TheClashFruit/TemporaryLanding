import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

import { Outfit } from 'next/font/google';
import { useRouter } from 'next/router';
import {
  Github,
  Mail,
  MessageSquare
} from 'lucide-react';

import styles from '@/styles/Home.module.scss';
import Meta from '@/components/Meta';

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
      <Meta />
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
