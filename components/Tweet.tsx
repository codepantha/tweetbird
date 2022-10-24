import React, { useState, useEffect } from 'react';

import { Comment, Tweet } from '../typings';
import TimeAgo from 'react-timeago';
import { RiWechatLine } from 'react-icons/ri';
import {
  HiOutlineSwitchHorizontal,
  HiOutlineHeart,
  HiOutlineUpload
} from 'react-icons/hi';
import { fetchComments } from '../utils/fetchComments';

interface Props {
  tweet: Tweet;
}

function Tweet({ tweet }: Props) {
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    refreshComments();
  }, []);

  const refreshComments = async () => {
    const comments: Comment[] = await fetchComments(tweet._id);
    setComments(comments);
  };

  return (
    <div className="flex flex-col space-x-1 border-y border-gray-100 p-5">
      <div className="flex space-x-3">
        <img
          className="h-10 w-10 rounded-full object-cover"
          src={tweet.profileImg}
          alt="profileImage"
        />
        <div>
          <div className="flex items-center space-x-1">
            <p className="mr-1 font-bold">{tweet.username}</p>
            <p className="hidden text-sm text-gray-500 sm:inline ">
              @{tweet.username.replace(/\s+/g, '').toLowerCase()}
            </p>
            <TimeAgo
              className="text-sm text-gray-500"
              date={tweet._createdAt}
            />
          </div>

          <p className="pt-1">{tweet.text}</p>

          {tweet.image && (
            <img
              src={tweet.image}
              alt="tweet image"
              className="m-5 ml-0 mb1 max-h-60 rounded-lg shadow-sm object-cover"
            />
          )}
        </div>
      </div>

      <div className="mt-3 flex justify-between">
        <div className="flex cursor-pointer items-center space-x-3 text-gray-400">
          <RiWechatLine />
          <p className="text-sm">{comments.length}</p>
        </div>
        <div className="flex cursor-pointer items-center space-x-3 text-gray-400">
          <HiOutlineSwitchHorizontal />
        </div>
        <div className="flex cursor-pointer items-center space-x-3 text-gray-400">
          <HiOutlineHeart />
        </div>
        <div className="flex cursor-pointer items-center space-x-3 text-gray-400">
          <HiOutlineUpload />
        </div>
      </div>

      {comments.length ? (
        <div className="my-2 mt-5 max-h-44 space-y-5 overflow-y-scroll border-t border-gray-100 p-5">
          {comments.map((comment) => (
            <div key={comment._id} className="flex space-x-2 relative">
              <hr className="absolute left-5 top-10 h-8 border-x border-twitter-30" />
              <img
                src={comment.profileImg}
                alt="profile image"
                className="mt-2 h-7 w-7 rounded-full object-cover"
              />

              <div>
                <div className="flex items-center space-x-1">
                  <p className="mr-1 font-bold">{comment.username}</p>
                  <p className="hidden text-sm text-gray-500 lg:inline">
                    @{comment.username.replace(/\s+/g, '').toLowerCase()}
                  </p>

                  <TimeAgo
                    className="text-sm text-gray-500"
                    date={comment._createdAt}
                  />
                </div>
                <p>{comment.comment}</p>
              </div>
            </div>
          ))}
        </div>
      ) : ''}
    </div>
  );
}

export default Tweet;
