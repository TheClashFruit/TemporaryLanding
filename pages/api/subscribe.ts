import type { NextApiRequest, NextApiResponse } from 'next';

import fs from 'fs';
import path from 'path';

import Mailgun from 'mailgun.js';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const subsData = fs.readFileSync(path.join(process.cwd(), 'data', 'subs.json'), 'utf-8');

  const subs = JSON.parse(subsData);

  if (isEmailPresent(subs, req.body.email)) {
    return res.status(400).json({ error: 'Email already subscribed' });
  }

  // generate token
  const subToken = new Date().getTime() + '-' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

  subs[subToken] = {
    name: '',
    email: req.body.email
  };

  fs.writeFileSync(path.join(process.cwd(), 'data', 'subs.json'), JSON.stringify(subs, null, 2));

  console.log(process.env.API_KEY!!);

  // send welcome email
  const mailgun = new Mailgun(FormData);
  const mg = mailgun.client({
    url: 'https://api.eu.mailgun.net',
    username: 'api',
    key: process.env.API_KEY!!
  });

  const data = {
    from: 'Zleed Newsletter <newsletter@mg.zleed.tv>',
    to: req.body.email,
    template: 'newsletter welcome',
    'h:X-Mailgun-Variables': JSON.stringify({ token: subToken })
  };

  await mg.messages.create('mg.zleed.tv', data);

  await mg.lists.members.createMember('newsletter@mg.zleed.tv', {
    address: req.body.email,
    subscribed: true,
    vars: JSON.stringify({ token: subToken })
  });

  res.status(200).json({ token: subToken });
}

const isEmailPresent = (subs: {[key: string]: {email: string}}, emailToCheck: string): boolean => {
  return Object.values(subs).some(sub => sub.email === emailToCheck);
};