import React, { useEffect, useState } from 'react'
import DashboardApiService from 'services/dashboard/DashboardApiService'
import UpcomingListItem, { UpcomingListItemType } from './UpcomingListItem';
import Card from 'components/card';
import { MdArrowRight, MdKeyboardDoubleArrowRight, MdLockClock, MdModeEditOutline } from 'react-icons/md';
import { IoMdClock } from 'react-icons/io';

function UpcomingList() {
    const [upcomings,setUpcomings] = useState<UpcomingListItemType[]>([]);

//     useEffect(()=>{
//         const fetch= async()=>{
//             const response = await DashboardApiService.getUpcomingMeetings();
//             console.log(response);
//             if(response!=undefined && response.data !=null || response.data != undefined ){
//                 setUpcomings(response.data);
//             }
//         }
// fetch();
//     },[])
    const HistoryData = [
        {
          title: "Colorful Heaven",
          owner: "Mark Benjamin",
          price: 0.4,
          time: "30s",
        },

      
      ];
  return (
    // <div className="mt-3 grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-3 3xl:grid-cols-4 ">
    //             {
    //                 upcomings.length > 0 &&
    //                 upcomings.map((item,index)=>(
    //                             <UpcomingListItem key={index} name={item.name} teams={item.teams}/>
    //                     ))
    //             }
    //     </div>
    <Card extra={"mt-3 !z-5  w-full p-4 "}>
    {/* HistoryCard Header */}
    <div className="flex items-center justify-between rounded-t-3xl p-3">
      <div className="text-xl font-bold text-navy-700 dark:text-white">
        Timeline 
      </div>
      <button className="linear rounded-[20px] bg-lightPrimary px-4 py-2 text-base font-medium text-brand-500 transition duration-200 hover:bg-gray-100 active:bg-gray-200 dark:bg-white/5 dark:text-white dark:hover:bg-white/10 dark:active:bg-white/20">
        See all
      </button>
    </div>

    {/* History CardData */}



    {HistoryData.map((data, index) => (
       <div className="
       transition-colors duration-300 ease-in-out hover:bg-brand-400 cursor-pointer
       mt-3 flex w-full items-center justify-between rounded-2xl bg-white p-3 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
       <div className="flex items-center">
         <div className="h-[83px] w-[83px] rounded-lg bg-gray-300 flex items-center flex-col justify-center">
            <div className='items-center'>Wed</div>
            <div>Date</div>
         </div>
         <div className="ml-4">
           <p className="text-base font-medium text-navy-700 dark:text-white">
             Meeting Name
           </p>
           <div className='flex  items-center gap-2'>
           <p className="mt-2 text-sm text-gray-600 ">
           <IoMdClock/>
           </p>
           <p className="mt-2 text-sm text-gray-600 ">
            8:00-12:00
           </p>

           </div>
         </div>
       </div>
       <div className="mr-4 flex items-center justify-center text-gray-600 dark:text-white">
         <MdKeyboardDoubleArrowRight />
       </div>
     </div>
    ))}
  </Card>
  )
}

export default UpcomingList