import { NextApiRequest, NextApiResponse } from 'next';
import { groq } from 'next-sanity';
import { sanityClient } from '../../sanity';

type Data = {
  comments: Comment[];
};

const commentQuery = groq`
*[_type == "comment" && references(*[_type=="tweet" && _id=="a549b884-dbe3-4c92-a615-aef21742e7dd"]._id)] {
  _id,
  ...
} | order(_createdAt desc)
`;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { tweetId } = req.query;
  const comments: Data = await sanityClient.fetch(commentQuery, {
    tweetId
  }); 

  res.status(200).json({ comments })
}
