import type { NextApiRequest, NextApiResponse } from 'next';

import fs from 'fs';
import path from 'path';

import Mailgun from 'mailgun.js';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const subsData = fs.readFileSync(path.join(process.cwd(), 'data', 'subs.json'), 'utf-8');

  const subs = JSON.parse(subsData);

  subs[req.body.token] = {
    name: req.body.name,
    email: req.body.email
  };

  fs.writeFileSync(path.join(process.cwd(), 'data', 'subs.json'), JSON.stringify(subs, null, 2));

  const mailgun = new Mailgun(FormData);
  const mg = mailgun.client({
    url: 'https://api.eu.mailgun.net',
    username: 'api',
    key: process.env.API_KEY!!
  });

  await mg.lists.members.updateMember('newsletter@mg.zleed.tv', req.body.oldEmail, {
    address: req.body.email,
    name: req.body.name,
    subscribed: true
  });


  res.status(200).json({ 
    message: 'Subscription updated successfully'
  });
}