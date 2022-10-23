import React, { useState } from 'react';
import { FiRefreshCcw } from 'react-icons/fi';
import toast from 'react-hot-toast';

import { Tweet } from '../typings';
import TweetBox from './TweetBox';
import TweetComponent from './Tweet';
import { fetchTweets } from '../utils/fetchTweets';

interface Props {
  tweets: Tweet[];
}

function Feed({ tweets: tweetsProp }: Props) {
  const [tweets, setTweets] = useState<Tweet[]>(tweetsProp);

  const handleRefresh = async () => {
    const refreshToast = toast.loading('Refreshing...');

    const tweets: Tweet[] = await fetchTweets();
    setTweets(tweets);

    toast.success('Feed Updated', {
      id: refreshToast
    });
  };

  return (
    <div className="col-span-7 lg:col-span-5 border-x">
      <div className="flex justify-between">
        <h1 className="p-5 pb-0 text-xl font-bold">Home</h1>
        <FiRefreshCcw
          onClick={handleRefresh}
          className="mr-5 mt-5 text-xl h-8 w-8 cursor-pointer text-twitter transition-all duration-500 ease-out hover:rotate-180 active:scale-125"
        />
      </div>

      <TweetBox />

      {tweets.map((tweet) => (
        <TweetComponent key={tweet._id} tweet={tweet} />
      ))}
    </div>
  );
}

export default Feed;
