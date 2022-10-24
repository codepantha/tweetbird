import React from 'react'
import { useSession, signIn, signOut } from 'next-auth/react';
import {
  BellIcon,
  BookmarkIcon,
  ChatBubbleLeftIcon,
  UserIcon,
  HomeIcon,
  HashtagIcon,
  EllipsisHorizontalIcon
} from '@heroicons/react/24/outline';

import SidebarRow from './SidebarRow';

function Sidebar(): JSX.Element {
  const { data: session } = useSession();

  return (
    <div className="col-span-2 items-center md:items-start flex flex-col">
      <img src="/images/logo.svg" alt="logo" className="h-8 w-10" />
      <SidebarRow Icon={HomeIcon} title="Home" />
      <SidebarRow Icon={HashtagIcon} title="Explore" />
      <SidebarRow Icon={BellIcon} title="Notifications" />
      <SidebarRow Icon={ChatBubbleLeftIcon} title="Messages" />
      <SidebarRow Icon={BookmarkIcon} title="Bookmarks" />
      <SidebarRow onClick={session ? signOut : signIn} Icon={UserIcon} title={session ? 'Sign Out' : 'Sign In'} />
      <SidebarRow Icon={EllipsisHorizontalIcon} title="More" />
    </div>
  )
}

export default Sidebar