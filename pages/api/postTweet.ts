import { NextApiRequest, NextApiResponse } from 'next';
import { groq } from 'next-sanity';
import { TweetBody } from './../../typings.d';

const feedQuery = groq`
*[_type == "tweet" && !blockTweet] {
  _id,
  ...
} | order(_createdAt desc)
`;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const data: TweetBody = JSON.parse(req.body);

  const mutations = {
    mutations: [
      {
        create: {
          _type: 'tweet',
          text: data.text,
          username: data.username,
          blockTweet: false,
          profileImg: data.profileImg,
          image: data.image
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
    });
    const json = await result.json();

    res.status(201).json({ message: 'Tweet added!' });
  } catch (e) {
    console.log(e);
  }
}
