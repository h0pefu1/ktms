import React from 'react'
import { MdVideoCall } from 'react-icons/md'
import Card from "components/card";

export type UpcomingListItemType = {
    name: string;
    teams: string;
    timeTo?: Date,
    userCount?: number,
    onclick?: any,
}

function UpcomingListItem( {name, teams,timeTo,userCount,onclick }:UpcomingListItemType) {
    return (
        <Card extra="!flex-row flex-grow items-center rounded-[20px] shadow-2xl shadow-shadow-500"
        >
            <div
                onClick={() => onclick}
                className="ml-[18px] flex h-[90px] w-auto flex-row items-center">
                <div className="rounded-full bg-lightPrimary p-3 dark:bg-navy-700">
                    <span className="flex items-center text-brand-500 dark:text-white">
                    <MdVideoCall className="h-7 w-7" />
                    </span>
                </div>
            </div>

            <div className="h-50 ml-4 flex w-auto flex-col justify-center p-4">
                <p className="font-dm text-sm font-medium text-gray-600">{name}</p>
                {
                    timeTo &&
                    <p className="font-dm text-sm font-medium text-gray-600">Upcoming
                    in {timeTo.toDateString()}</p>
                }

                <h4 className="text-xl font-bold text-navy-700 dark:text-white">
                    {teams}
                </h4>
                {
                    userCount &&
                    <p className="font-dm text-sm font-medium text-gray-600">Users: {userCount}</p>
                }

            </div>
        </Card>
    );
}

export default UpcomingListItem