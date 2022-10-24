import React from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { TwitterTimelineEmbed } from 'react-twitter-embed';

function Widgets() {
  return (
    <div className="col-span-2 hidden lg:inline mt-2 px-2">
      {/* Search */}
      <div className="mt-2 flex items-center space-x-2 rounded-full bg-gray-100 p-3 mb-4">
        <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search TweetBird"
          className="flex-1 bg-transparent outline-none"
        />
      </div>

      <TwitterTimelineEmbed
        sourceType="profile"
        screenName="codepantha"
        options={{ height: 600 }}
      />
    </div>
  );
}

export default Widgets;
