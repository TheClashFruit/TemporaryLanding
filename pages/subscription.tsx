import fs from 'fs';

import { Outfit } from 'next/font/google';
import { NextRequest } from 'next/server';
import path from 'path';

import Meta from '@/components/Meta';

const outfit = Outfit({
  subsets: [
    'latin'
  ],
  variable: '--outfit'
});

export default function Home({ error, subData, token }: { error: boolean, subData: { name: string, email: string }, token: string }) {
  const oldEmail = subData.email;

  const onSubmit = async (e: any) => {
    e.preventDefault();

    const data = new FormData(e.target);

    const f = await fetch('/api/edit_subscription', {
      method: 'POST',
      body: JSON.stringify({
        name: data.get('name'),
        email: data.get('email'),
        oldEmail,
        token
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const r = await f.json();

    alert(r.message);
  };

  return (
    <>
      <Meta />
      <main className={outfit.variable} style={{ height: '100svh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <h2>Edit Subscription Details</h2>

        { !error && (
          <form style={{ display: 'flex', flexDirection: 'column', gap: '.5rem', width: 'min(100vw, 350px)' }} onSubmit={onSubmit}>
            <input type="text" placeholder="Name" name="name" defaultValue={subData.name} />

            <input type="email" placeholder="E-Mail Address" name="email" defaultValue={subData.email} />

            <button type="submit">Save</button>
          </form>
        )}

        { error && (
          <p>Invalid subscription token.</p>
        )}
      </main>
    </>
  );
}

export async function getServerSideProps({ query }: { query: { token?: string } }) {
  if (!query.token) {
    return {
      props: {
        error: true,
        subData: {},
        token: ''
      }
    };
  }

  const subsData = fs.readFileSync(path.join(process.cwd(), 'data', 'subs.json'), 'utf-8');

  const subs = JSON.parse(subsData);

  const sub = subs[query.token!!];

  if (!sub) {
    return {
      props: {
        error: true,
        subData: {},
        token: query.token!!
      }
    };
  }

  return {
    props: {
      error: false,
      subData: sub,
      token: query.token!!
    }
  };
}