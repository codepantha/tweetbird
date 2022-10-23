import { NextApiRequest, NextApiResponse } from 'next';
import { groq } from 'next-sanity';
import { Tweet } from './../../typings.d';
import { sanityClient } from '../../sanity';

type Data = {
  tweets: Tweet[];
};

const feedQuery = groq`
*[_type == "tweet" && !blockTweet] {
  _id,
  ...
} | order(_createdAt desc)
`;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const tweets: Data = await sanityClient.fetch(feedQuery);
  console.log(tweets);
  res.status(200).json({ tweets });
}
