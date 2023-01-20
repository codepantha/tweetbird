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
    <div className="col-span-7 max-h-screen overflow-x-scroll lg:col-span-5 border-x scrollbar-hide">
      <div className="flex justify-between">
        <h1 className="p-5 pb-0 text-xl font-bold">Home</h1>
        <FiRefreshCcw
          onClick={handleRefresh}
          className="refreshButton"
        />
      </div>

      <TweetBox setTweets={setTweets} />

      {tweets.map((tweet) => (
        <TweetComponent key={tweet._id} tweet={tweet} />
      ))}
    </div>
  );
}

export default Feed;
