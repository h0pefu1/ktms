import { IoMdHome } from "react-icons/io";
import { IoDocuments } from "react-icons/io5";
import { MdBarChart, MdCreate, MdDashboard, MdKeyboardDoubleArrowRight } from "react-icons/md";

import Widget from "components/widget/Widget";
import AppBigCalendar from "./components/calendar/AppBigCalendar";
import UpcomingList from "./components/upcoming-list/UpcomingList";
import Card from "components/card";
import CardButton from "components/button-cards/CardButton";
import { useDrawer } from "components/drawer/DrawerContext";

const Dashboard = () => {
  const { openDrawer } = useDrawer();
  return (
    <div>
      {/* Card widget */}
      {/* <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-6">
        <Widget
          icon={<MdBarChart className="h-7 w-7" />}
          title={"Earnings"}
          subtitle={"$340.5"}
        />
        <Widget
          icon={<IoDocuments className="h-6 w-6" />}
          title={"Spend this month"}
          subtitle={"$642.39"}
        />
        <Widget
          icon={<MdBarChart className="h-7 w-7" />}
          title={"Sales"}
          subtitle={"$574.34"}
        />
        <Widget
          icon={<MdDashboard className="h-6 w-6" />}
          title={"Your Balance"}
          subtitle={"$1,000"}
        />
        <Widget
          icon={<MdBarChart className="h-7 w-7" />}
          title={"New Tasks"}
          subtitle={"145"}
        />
        <Widget
          icon={<IoMdHome className="h-6 w-6" />}
          title={"Total Projects"}
          subtitle={"$2433"}
        />
      </div> */}

      {/* Charts */}

      <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-3">
        <div className="mt-3">
        <CardButton
        extra="transition-colors duration-300 ease-in-out hover:bg-brand-400 cursor-pointer"
            icon={<MdCreate className="h-7 w-7" />}
            title={"Add Meeting"} onClick={()=>openDrawer()}  
            iconInText={<MdKeyboardDoubleArrowRight/>}
            />
        <UpcomingList />
        </div>
        <AppBigCalendar />
      </div>

      {/* Tables & Charts */}

  
    </div>
  );
};

export default Dashboard;
