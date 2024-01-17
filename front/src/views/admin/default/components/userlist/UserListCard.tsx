import Card from "components/card";
import React from "react";
import { MdOfflineBolt, MdOfflinePin, MdOfflineShare } from "react-icons/md";

function UserListCard(props: { icon: JSX.Element,firstName:string,lastName:string }) {
  const { icon,firstName,lastName } = props;
  return (
    <Card extra="!flex-row flex-grow items-center rounded-[20px] shadow-2xl shadow-shadow-500 mt-2">
      <div className="ml-2 flex h-[90px] w-auto flex-row items-center">
        <div className="rounded-full bg-lightPrimary p-1 dark:bg-navy-700">
          <span className="flex items-center text-brand-500 dark:text-white">
            {icon}
          </span>
        </div>
      </div>
      <div className="h-50 ml-1 flex w-auto flex-col gap-1 justify-center p-4">
      <h4 className="text-lg font-bold text-navy-700 dark:text-white">
         {firstName + ' ' +lastName}
        </h4>
        <div className="flex gap-1">
        <div>
        <div className="rounded-full bg-green-400 p-2 dark:bg-navy-700">
          <span className="flex items-center text-brand-500 dark:text-white">
          </span>
        </div>
      </div>
      <div className="font-dm text-sm font-medium text-gray-600 items-center">
      Online
      </div>
      </div>
      </div>
    </Card>
  );
}

export default UserListCard;
