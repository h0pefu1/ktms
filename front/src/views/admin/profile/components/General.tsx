import Card from "components/card";
import moment from "moment";
import { useContext, useEffect, useState } from "react";
import ProfileService from "services/profile/ProfileService";
import { UserAdditional } from "types/types";
import EditIcon from '@mui/icons-material/Edit';
import { CircularProgress, IconButton } from "@mui/material";
import SaveIcon from '@mui/icons-material/Save';
import { SnackBarContext } from "components/snackbar-context";

const General = () => {
  const [userAdditional,setUserAdditional] = useState<UserAdditional>({} as UserAdditional);
  const [isEditMode,setIsEditMode] = useState(false);
  const [isLoading,setIsLoading] = useState(false);
useEffect(()=>{
    const fetch=async ()=>{
        const userAdd = await ProfileService.getUserAdditional();
        if(userAdd != undefined || userAdd !=null ){
          if(userAdd.data !=undefined){
            setUserAdditional(userAdd.data);
          }
        }
    }
    fetch();
},[])
const {openSnack} = useContext(SnackBarContext);
  const handleSave = async ()=>{
    if(
      isEditMode
    ){

      openSnack("Updated",{message:"Update",autoHideDuration:5000});
      setIsLoading(true);
      setIsEditMode(false);
    }
    else{
setIsEditMode(true);
    }
  }
  return (
    <Card extra={"w-full h-full p-3"}>
      {/* Header */}
      <div className="mt-2 flex w-full justify-between">
        <h4 className="px-2 text-xl font-bold text-navy-700 dark:text-white">
          General Information
        </h4>
        <div>
            
            <IconButton
            onClick={handleSave}
            aria-label="Edit">
            {
              isLoading ?
                <CircularProgress
                size={20}
                />
              :
              (
                isEditMode ?
                <SaveIcon/>
                : <EditIcon/>
                )
            }
          </IconButton>
         
        </div>
      </div>
      <div className="mb-8 mt-2 w-full">
        <p className="mt-2 px-2 text-base text-gray-600">
          {userAdditional.about}
        </p>
      </div>
      {/* Cards */}
      <div className="grid grid-cols-2 gap-4 px-2">
        <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
          <p className="text-sm text-gray-600">Email</p>
          <p className="text-base font-medium text-navy-700 dark:text-white">
            {userAdditional.email}
          </p>
        </div>

        <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
          <p className="text-sm text-gray-600">Phone Number</p>
          <p className="text-base font-medium text-navy-700 dark:text-white">
            {userAdditional.phoneNumber}
          </p>
        </div>

        <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
          <p className="text-sm text-gray-600">BirthDay</p>
          <p className="text-base font-medium text-navy-700 dark:text-white">
            {moment(userAdditional.birthDay).format("D MMM YYYY")}
          </p>
        </div>

        {/* <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
          <p className="text-sm text-gray-600">Work History</p>
          <p className="text-base font-medium text-navy-700 dark:text-white">
            English, Spanish, Italian
          </p>
        </div>

        <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
          <p className="text-sm text-gray-600">Organization</p>
          <p className="text-base font-medium text-navy-700 dark:text-white">
            Simmmple Web LLC
          </p>
        </div>

        <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
          <p className="text-sm text-gray-600">Birthday</p>
          <p className="text-base font-medium text-navy-700 dark:text-white">
            20 July 1986
          </p>
        </div> */}
      </div>
    </Card>
  );
};

export default General;