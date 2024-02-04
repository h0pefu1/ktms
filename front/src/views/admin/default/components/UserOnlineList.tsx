import Card from "components/card";
import BarChart from "components/charts/BarChart";
import {
  barChartDataWeeklyRevenue,
  barChartOptionsWeeklyRevenue,
} from "variables/charts";
import { MdBarChart } from "react-icons/md";
import UserListCard from "./userlist/UserListCard";
import avatar from "assets/img/avatars/avatar4.png";
import { useSelector } from "react-redux";
import { RootState } from "store/store";
const UserOnlineList = () => {
  const {dashboard} = useSelector((state:RootState)=>state);
  return (
    <Card extra="flex flex-col bg-white w-full rounded-3xl py-6 px-2 text-center">
      <div className="mb-auto flex items-center justify-between px-6">
        <h2 className="text-lg font-bold text-navy-700 dark:text-white">
          Users 
        </h2>
        {/* <button className="!linear z-[1] flex items-center justify-center rounded-lg bg-lightPrimary p-2 text-brand-500 !transition !duration-200 hover:bg-gray-100 active:bg-gray-200 dark:bg-navy-700 dark:text-white dark:hover:bg-white/20 dark:active:bg-white/10">
          <MdBarChart className="h-6 w-6" />
        </button> */}
      </div>
      <div className="flex flex-col flex-grow overflow-y-auto gap-5 max-h-[500px] px-6">
      {
        dashboard.persons.length > 0 &&
        dashboard.persons.map(p=>(
          <UserListCard icon={<img
            className="h-10 w-10 rounded-full"
            src={avatar}
            alt={p.firstName + " " + p.lastName} />} firstName={p.firstName} lastName={p.lastName}/>
    
        ))
      }
      </div>
   
    </Card>
  );
};

export default UserOnlineList;
