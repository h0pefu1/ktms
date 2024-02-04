import { useDisclosure } from '@chakra-ui/hooks';
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/modal';
import Card from 'components/card';
import React, { useEffect, useState } from 'react'
import { MeetingPopUpObject } from './AppBigCalendar';
import InputField from 'components/fields/InputField';
import Dropdown from 'components/dropdown';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import Checkbox from 'components/checkbox';
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input
} from '@chakra-ui/react'
import { Meeting } from 'types/types';
const animatedComponents = makeAnimated();
type CalendarMettingProps = {
  isOpen: boolean,
  onOpen: () => void,
  onClose: () => void,
  MeetingOrSlotRef: MeetingPopUpObject,
}

function CalendarMeetingModal({ isOpen, onOpen, onClose, MeetingOrSlotRef }: CalendarMettingProps) {
  const [meeting, setMeeting] = useState({} as Meeting);
  useEffect(()=>{
      
  },[])



  useEffect(() => {
      if((MeetingOrSlotRef != undefined ||  MeetingOrSlotRef != null) && MeetingOrSlotRef.SlotInfo != null || MeetingOrSlotRef.SlotInfo !=undefined){
          setMeeting(prev=>({...prev,dateStart:MeetingOrSlotRef.SlotInfo.start,dateEnd:MeetingOrSlotRef.SlotInfo.end}))
      }
   }, [MeetingOrSlotRef])

  const [isAdditional, setIsAdditional] = useState<boolean>(false);
  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
  ]
  return (
    < div className="!z-[1010]">
      <Modal isOpen={isOpen}
        isCentered
        onClose={onClose}
        size={"xl"}
      >
        <ModalOverlay className="bg-[#000] !opacity-30" />
        <ModalContent className="!z-[1002] !m-auto !w-max min-w-[350px] !max-w-[85%] md:top-[12vh]">

          <ModalHeader>
            <h1 className="mb-[20px] text-2xl font-bold">{MeetingOrSlotRef != null && (MeetingOrSlotRef.CalendarEvent == null || MeetingOrSlotRef.CalendarEvent == undefined) ? "Create Meeting" : "Update Meeting Info"}</h1>
          </ModalHeader>
          <ModalBody>

            <div className='flex-col flex gap-2'>
              <FormControl>
                <FormLabel>Meeting Name</FormLabel>
                <Input  
                value={meeting.name}
                onChange={(e:any)=>setMeeting(prev=>({...prev,name:e.target.value}))}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Meeting Team</FormLabel>
                <Select
                  closeMenuOnSelect={false}
                  components={animatedComponents}
                  options={options}
                />
              </FormControl>
              <div className='flex gap-1'>
                <Checkbox value={isAdditional} setValue={() => setIsAdditional(prev => !prev)} />
                Add additional users
              </div>
              {
                isAdditional && (
                  <FormControl>
                    <FormLabel>Additional Users</FormLabel>
                    <Select
                      closeMenuOnSelect={false}
                      components={animatedComponents}
                      isMulti
                      options={options}
                    />
                  </FormControl>
                )
              }



            </div>

          </ModalBody>
          <ModalFooter>
            <div className="flex gap-2 flex-end">
              <button
              onClick={()=>console.log(meeting)}
              className="linear text-navy-700 rounded-xl bg-blue-300 px-5 py-3 text-base font-medium transition duration-200 hover:bg-blue-500 active:bg-blue-300 dark:bg-white/10 dark:text-white dark:hover:bg-white/20 dark:active:bg-white/30">
                Create
              </button>
              <button
                onClick={onClose}
                className="linear rounded-xl border-2 border-red-500 px-5 py-3 text-base font-medium text-red-500 transition duration-200 hover:bg-red-600/5 active:bg-red-700/5 dark:border-red-400 dark:bg-red-400/10 dark:text-white dark:hover:bg-red-300/10 dark:active:bg-red-200/10"
              >
                Close
              </button>

            </div>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default CalendarMeetingModal