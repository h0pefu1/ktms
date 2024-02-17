import MiniCalendar from "components/calendar/MiniCalendar";
import WeeklyRevenue from "views/admin/default/components/UserOnlineList";
import TotalSpent from "views/admin/default/components/TotalSpent";
import PieChartCard from "views/admin/default/components/PieChartCard";
import { IoMdHome } from "react-icons/io";
import { IoDocuments } from "react-icons/io5";
import { MdArrowRight, MdBarChart, MdDashboard, MdVideoCall } from "react-icons/md";
import { useNavigate } from "react-router-dom";

import DailyTraffic from "views/admin/default/components/DailyTraffic";
import OngoingCard from "views/admin/default/components/OngoingCard";
import tableDataCheck from "./variables/tableDataCheck";
import tableDataComplex from "./variables/tableDataComplex";
import { v4 as uuid } from "uuid";
import { Link } from "react-router-dom";
import WidgetButton from "components/widget/WidgetButton";
import UserOnlineList from "views/admin/default/components/UserOnlineList";
import AppBigCalendar from "./components/calendar/AppBigCalendar";
import "assets/css/AppBigCalendar.css";
import UpcomingList from "./components/upcoming-list/UpcomingList";
const testdaTA = [
  {
    status: "Upcoming",
    team: "AMAP",
    till: "15min",
    userCounts: 0,
  },
  {
    status: "Upcoming",
    team: "Quanex",
    till: "10min",
    userCounts: 0,
  },
  {
    status: "Upcoming",
    team: "FAIA",
    till: "5min",
    userCounts: 0,
  },
];
const Dashboard = () => {
  const navigate = useNavigate();
  return (
    <div>
      {/* Card widget */}
      <div className="flex justify-between">
        <UpcomingList/>
        <WidgetButton  title="Start Meeting" innerContent={<MdArrowRight className="h7 w-7"/>} onclick={function () {
          throw new Error("Function not implemented.");
        } }/>
      </div>
      {/* Charts */}

      <div className="mt-5 grid grid-cols-2 gap-5 md:grid-cols-3">
        <OngoingCard />
        <UserOnlineList />
      </div>

        <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-1">
          <AppBigCalendar/>
        </div>
      {/* Tables & Charts */}

      <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-2">
        {/* Check Table */}
        <div></div>

        {/* Traffic chart & Pie Chart */}

        {/* <div className="grid grid-cols-1 gap-5 rounded-[20px] md:grid-cols-2">
          <DailyTraffic />
          <PieChartCard />
        </div> */}

        {/* Complex Table , Task & Calendar */}

        {/* Task chart & Calendar */}

        {/* <div className="grid grid-cols-1 gap-5 rounded-[20px] md:grid-cols-2">
          <div className="grid grid-cols-1 rounded-[20px]">
            <MiniCalendar />
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Dashboard;
