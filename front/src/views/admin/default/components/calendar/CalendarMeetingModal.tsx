import { useDisclosure } from '@chakra-ui/hooks';
import { Modal, ModalBody, ModalContent, ModalOverlay } from '@chakra-ui/modal';
import Card from 'components/card';
import React, { useEffect } from 'react'


type CalendarMettingProps={
    isOpen:boolean,
    onOpen:()=>void,
    onClose:()=>void,
    MeetingOrSlotRef:any,
}

function CalendarMeetingModal({isOpen,onOpen,onClose,MeetingOrSlotRef}:CalendarMettingProps) {
    useEffect(()=>{console.log(MeetingOrSlotRef)},[MeetingOrSlotRef])
    return (
     
    < div  className="!z-[1010]">
      <Modal isOpen={isOpen}
    
    isCentered

onClose={onClose}
       >
        <ModalOverlay className="bg-[#000] !opacity-30" />
        <ModalContent className="!z-[1002] !m-auto !w-max min-w-[350px] !max-w-[85%] md:top-[12vh]">
          <ModalBody>
            <Card extra="px-[30px] pt-[35px] pb-[40px] max-w-[450px] flex flex-col !z-[1004]">
              <h1 className="mb-[20px] text-2xl font-bold">{"ss"}</h1>
              <p className="mb-[20px]">
                A modal is a type of modal window with critical information which
                disable all app functionality when they appear and remains on screen
                until confirmed/dismissed.
              </p>
              <div className="flex gap-2">
                <button
                  onClick={onClose}
                  className="linear rounded-xl border-2 border-red-500 px-5 py-3 text-base font-medium text-red-500 transition duration-200 hover:bg-red-600/5 active:bg-red-700/5 dark:border-red-400 dark:bg-red-400/10 dark:text-white dark:hover:bg-red-300/10 dark:active:bg-red-200/10"
                >
                  Close
                </button>
                <button className="linear text-navy-700 rounded-xl bg-gray-100 px-5 py-3 text-base font-medium transition duration-200 hover:bg-gray-200 active:bg-gray-300 dark:bg-white/10 dark:text-white dark:hover:bg-white/20 dark:active:bg-white/30">
                  Secondary
                </button>
              </div>
            </Card>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
    ); };

export default CalendarMeetingModal