import React, { useEffect, useState } from "react";
import { MdModeEditOutline } from "react-icons/md";
import image1 from "assets/img/profile/image1.png";
import image2 from "assets/img/profile/image2.png";
import image3 from "assets/img/profile/image3.png";
import Card from "components/card";
import { Team } from "types/types";
import ProfileService from "services/profile/ProfileService";

const Project = () => {
  const [teams,setTeams] = useState<Team[]>([] as Team[]);
  useEffect(()=>{
      const fetch=async ()=>{
          const teamFromApi = await ProfileService.getTeamsByUser();
          if(teamFromApi.data != undefined || teamFromApi !=null){
            setTeams([...teamFromApi.data]);
          }
          console.log(teamFromApi.data);
          console.log(teams[0]);
      }
      fetch();
  },[])

  return (
    <Card extra={"w-full p-4 h-full"}>
      <div className="mb-8 w-full">
        <h4 className="text-xl font-bold text-navy-700 dark:text-white">
          Your teams
        </h4>
        <p className="mt-2 text-base text-gray-600">
              Here is useful information about teams you are  in
        </p>
      </div>
      <div className="mt-3 grid grid-cols-1 gap-2">
        {
          teams.length>0 &&
          teams.map(item=>(
            <div className="mt-3 flex w-full items-center justify-between rounded-2xl bg-white p-3 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
            <div className="flex items-center">
              <div className="">
                <img className="h-[83px] w-[83px] rounded-lg" src={image3} alt="" />
              </div>
              <div className="ml-4">
                <p className="text-base font-medium text-navy-700 dark:text-white">
                  {item.name}
                </p>
                <p className="mt-2 text-sm text-gray-600">
                  Project #1 .
                  <a  
                    className="ml-1 font-medium text-brand-500 hover:text-brand-500 dark:text-white"
                    href=" "
                  >
                    See product details
                  </a>
                </p>
              </div>
            </div>
            <div className="mr-4 flex items-center justify-center text-gray-600 dark:text-white">
              <MdModeEditOutline />
            </div>
          </div>
          ))
        }    
   
      {/* Project 1 */}
      {/* <div className="mt-3 flex w-full items-center justify-between rounded-2xl bg-white p-3 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
        <div className="flex items-center">
          <div className="">
            <img className="h-[83px] w-[83px] rounded-lg" src={image3} alt="" />
          </div>
          <div className="ml-4">
            <p className="text-base font-medium text-navy-700 dark:text-white">
              Technology behind the Blockchain
            </p>
            <p className="mt-2 text-sm text-gray-600">
              Project #1 .
              <a
                className="ml-1 font-medium text-brand-500 hover:text-brand-500 dark:text-white"
                href=" "
              >
                See product details
              </a>
            </p>
          </div>
        </div>
        <div className="mr-4 flex items-center justify-center text-gray-600 dark:text-white">
          <MdModeEditOutline />
        </div>
      </div> */}
      {/* Project 1 */}
      {/* <div className="mt-3 flex w-full items-center justify-between rounded-2xl bg-white p-3 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
        <div className="flex items-center">
          <div className="">
            <img className="h-[83px] w-[83px] rounded-lg" src={image2} alt="" />
          </div>
          <div className="ml-4">
            <p className="text-base font-medium text-navy-700 dark:text-white">
              Technology behind the Blockchain
            </p>
            <p className="mt-2 text-sm text-gray-600">
              Project #1 .
              <a
                className="ml-1 font-medium text-brand-500 hover:text-brand-500 dark:text-white"
                href=" "
              >
                See product details
              </a>
            </p>
          </div>
        </div>
        <div className="mr-4 flex items-center justify-center text-gray-600 dark:text-white">
          <MdModeEditOutline />
        </div>
      </div> */}
      {/* <div className="mt-3 flex w-full items-center justify-between rounded-2xl bg-white p-3 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
        <div className="flex items-center">
          <div className="">
            <img className="h-[83px] w-[83px] rounded-lg" src={image2} alt="" />
          </div>
          <div className="ml-4">
            <p className="text-base font-medium text-navy-700 dark:text-white">
              Technology behind the Blockchain
            </p>
            <p className="mt-2 text-sm text-gray-600">
              Project #1 .
              <a
                className="ml-1 font-medium text-brand-500 hover:text-brand-500 dark:text-white"
                href=" "
              >
                See product details
              </a>
            </p>
          </div>
        </div>
        <div className="mr-4 flex items-center justify-center text-gray-600 dark:text-white">
          <MdModeEditOutline />
        </div>
      </div> */}
      </div>
    </Card>
  );
};

export default Project;