import React from 'react'
import { MdKeyboardArrowRight } from 'react-icons/md'

function OngoingCardItem() {
  return (
    <div>
    <div className="flex items-center justify-center gap-2">
      <p className="text-base font-bold text-navy-700 dark:text-white">
        test
      </p>
    </div>
    <div className="flex items-center justify-center gap-2">
      <p className="text-base font-bold text-navy-700 dark:text-white">
     test
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

  )
}

export default OngoingCardItem