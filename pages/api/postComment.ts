import { NextApiRequest, NextApiResponse } from 'next';
import { CommentBody } from './../../typings.d';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const data: CommentBody = JSON.parse(req.body);

  const mutations = {
    mutations: [
      {
        create: {
          _type: 'comment',
          comment: data.comment,
          profileImg: data.profileImg,
          username: data.username,
          tweet: {
            _type: 'reference',
            _ref: data.tweetId
          }
        }
      }
    ]
  };

  const apiEndpoint = `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2021-06-07/data/mutate/${process.env.NEXT_PUBLIC_SANITY_DATASET}`;

  try {
    const result = await fetch(apiEndpoint, {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${process.env.SANITY_API_TOKEN}`
      },
      method: 'POST',
      body: JSON.stringify(mutations)
    })

    const json = await result.json();

    res.status(201).json({ message: 'Tweet added!' });
  } catch(e) {
    res.status(400).json({ error: 'An error occured while adding your comment!'})
  }
}
