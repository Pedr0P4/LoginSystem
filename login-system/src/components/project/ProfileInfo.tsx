import type { ReactNode } from "react";

interface Props {
  info: string;
  children: ReactNode;
}

function ProfileInfo(props: Props) {
  return (
    <div className="w-92/100 mx-auto pt-6">
      <div>
        <span className="font-extralight">Your </span>
        <span className="font-medium">{props.info}</span>
      </div>
      <div className="p-3 py-4 pl-4 text-xs font-extralight bg-gray-100 rounded-sm">
        {props.children}
      </div>
    </div>
  );
}

export default ProfileInfo;
