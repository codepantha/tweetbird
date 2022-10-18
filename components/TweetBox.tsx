import { CalendarIcon, PhotoIcon } from '@heroicons/react/24/outline';
import {
  HiOutlineSearchCircle,
  HiOutlineEmojiHappy,
  HiOutlineLocationMarker
} from 'react-icons/hi';
import React, { useState } from 'react';

function TweetBox() {
  const [input, setInput] = useState<string>('');

  return (
    <div className="flex space-x-2 p-5">
      <img
        className="mt-4 h-14 w-14 rounded-full object-cover"
        src="/images/avatar.jpg"
      />

      <div className="flex flex-1 items-center pl-2">
        <form className="flex flex-1 flex-col">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder="What's happening?"
            className="h-24 w-full text-xl outline-none"
          />
          <div className="flex items-center">
            <div className="flex flex-1 space-x-2 text-twitter">
              <PhotoIcon className="h-5 w-5 cursor-pointer transition-transform duration-150 ease-out hover:scale-150" />
              <HiOutlineSearchCircle className="h-5 w-5" />
              <HiOutlineEmojiHappy className="h-5 w-5" />
              <CalendarIcon className="h-5 w-5" />
              <HiOutlineLocationMarker className="h-5 w-5" />
            </div>

            <button disabled={!input} className="bg-twitter text-white px-5 py-2 rounded-full font-bold disabled:opacity-40">
              Tweet
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TweetBox;
