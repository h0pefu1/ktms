import DailyTraffic from "../default/components/DailyTraffic";
import PieChartCard from "../default/components/PieChartCard";
import WeeklyRevenue from "../default/components/WeeklyRevenue";
import Banner from "./components/Banner";
import General from "./components/General";
import Notification from "./components/Notification";
import Project from "./components/Project";
import Storage from "./components/Storage";
import Upload from "./components/Upload";

const ProfileOverview = () => {
  return (
    <div className="flex w-full flex-col gap-5">
      <div className="w-ful mt-3 flex h-fit flex-col gap-5 lg:grid lg:grid-cols-12">
        <div className="col-span-4 lg:!mb-0">
          <Banner />
        </div>

        <div className="col-span-5 lg:!mb-0">
          {/* <Storage /> */}
          <General />
       
        </div>

        <div className="z-0 col-span-3 lg:!mb-0">
        <Project />
        </div>
      </div>
      {/* all project & ... */}
   
    </div>
  );
};

export default ProfileOverview;
