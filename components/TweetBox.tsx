import { useSession } from 'next-auth/react';
import { CalendarIcon, PhotoIcon } from '@heroicons/react/24/outline';
import {
  HiOutlineSearchCircle,
  HiOutlineEmojiHappy,
  HiOutlineLocationMarker
} from 'react-icons/hi';
import React, { useState, useRef } from 'react';

function TweetBox() {
  const [input, setInput] = useState<string>('');
  const { data: session } = useSession();
  const [imageUrlBoxIsOpen, setImageUrlBoxIsOpen] = useState<boolean>(false);
  const [image, setImage] = useState<string>('');
  const imageInputRef = useRef<HTMLInputElement>(null);

  const addImageToTweet = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    if (!imageInputRef.current?.value) return;

    setImage(imageInputRef.current.value);
    imageInputRef.current.value = '';
    setImageUrlBoxIsOpen(false);
  }

  return (
    <div className="flex space-x-2 p-5">
      <img
        className="mt-4 h-14 w-14 rounded-full object-cover"
        src={session?.user?.image || '/images/avatar.jpg'}
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
              <PhotoIcon
                onClick={() => setImageUrlBoxIsOpen(!imageUrlBoxIsOpen)}
                className="h-5 w-5 cursor-pointer transition-transform duration-150 ease-out hover:scale-150"
              />
              <HiOutlineSearchCircle className="h-5 w-5" />
              <HiOutlineEmojiHappy className="h-5 w-5" />
              <CalendarIcon className="h-5 w-5" />
              <HiOutlineLocationMarker className="h-5 w-5" />
            </div>

            <button
              disabled={!input || !session}
              className="bg-twitter text-white px-5 py-2 shadow-lg rounded-full font-bold disabled:opacity-40"
            >
              Tweet
            </button>
          </div>

          {imageUrlBoxIsOpen && (
            <form className="mt-5 flex rounded-lg bg-twitter/80 py-2 px-4">
              <input
                ref={imageInputRef}
                className="flex-1 bg-transparent p-2 text-white outline-none placeholder:text-white"
                type="text"
                placeholder="Enter Image URL"
              />
              <button onClick={addImageToTweet} className="font-bold text-white">Add Image</button>
            </form>
          )}

          {image && (
            <img className="mt-10 h-40 w-full object-contain rounded-xl shadow-lg" src={image} />
          )}
        </form>
      </div>
    </div>
  );
}

export default TweetBox;
