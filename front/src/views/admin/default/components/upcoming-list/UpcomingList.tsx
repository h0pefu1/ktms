import React, { useEffect, useState } from 'react'
import DashboardApiService from 'services/dashboard/DashboardApiService'
import UpcomingListItem, { UpcomingListItemType } from './UpcomingListItem';

function UpcomingList() {
    const [upcomings,setUpcomings] = useState<UpcomingListItemType[]>([]);

    useEffect(()=>{
        const fetch= async()=>{
            const response = await DashboardApiService.getUpcomingMeetings();
            console.log(response);
            if(response!=undefined && response.data !=null || response.data != undefined ){
                setUpcomings(response.data);
            }
        }
fetch();
    },[])
  return (
    <div className="mt-3 grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-3 3xl:grid-cols-4 ">
                {
                    upcomings.length > 0 &&
                    upcomings.map((item,index)=>(
                                <UpcomingListItem key={index} name={item.name} teams={item.teams}/>
                        ))
                }
        </div>
  )
}

export default UpcomingList