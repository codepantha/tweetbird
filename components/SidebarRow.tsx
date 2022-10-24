import React, { SVGProps } from 'react';

interface Props {
  Icon: (props: SVGProps<SVGSVGElement>) => JSX.Element;
  title: string;
  onClick?: () => {}
}

function SidebarRow({ Icon, title, onClick }: Props) {
  return (
    <div onClick={() => onClick?.()} className="flex items-center max-w-fit space-x-2 rounded-full px-4 py-3 transition-all duration-200 cursor-pointer hover:bg-gray-100 group">
      <Icon className="h-6 w-6" />
      <p className="hidden md:inline-flex text-base font-light lg:text-xl group-hover:text-twitter">{title}</p>
    </div>
  );
}

export default SidebarRow;
