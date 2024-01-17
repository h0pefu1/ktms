import CardMenu from "components/card/CardMenu";
import Checkbox from "components/checkbox";
import { MdDragIndicator, MdCheckCircle, MdBarChart, MdKeyboardArrowRight } from "react-icons/md";
import Card from "components/card";

const OngoingCard = () => {
  return (
    <Card extra="pb-7 p-[20px] col-span-2">
      {/* task header */}
      <div className="relative flex flex-row justify-between">
        <div className="flex items-center">
          <h4 className="ml-4 text-xl font-bold text-navy-700 dark:text-white">
            Ongoing meetings
          </h4>
        </div>
      </div>

      {/* task content */}

      <div className="h-full w-full">
        <div className="mt-5 flex items-center justify-between p-2">
          <div className="flex items-center justify-center gap-2">
            <p className="text-base font-bold text-navy-700 dark:text-white">
              Name of meeting
            </p>
          </div>
          <div className="flex items-center justify-center gap-2">
            <p className="text-base font-bold text-navy-700 dark:text-white">
              People in meeting:
            </p>
          </div>
          <div className="flex items-center justify-center gap-2">
            <button className="!linear z-[1] flex items-center justify-center rounded-lg bg-lightPrimary 
          p-2 text-brand-500 !transition !duration-200 hover:bg-gray-100 
          active:bg-gray-200 dark:bg-navy-700 dark:text-white dark:hover:bg-white/20 dark:active:bg-white/10">
              Connect
              <MdKeyboardArrowRight className="h-6 w-6" />
            </button>
          </div>
          <div>
          </div>
        </div>


      </div>
    </Card>
  );
};

export default OngoingCard;
