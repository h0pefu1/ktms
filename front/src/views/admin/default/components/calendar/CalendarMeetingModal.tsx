import { useDisclosure } from '@chakra-ui/hooks';
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/modal';
import Card from 'components/card';
import React, { useEffect, useState } from 'react'
import { CalendarEvent, MeetingPopUpObject } from './AppBigCalendar';
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
import { DropDownItem, Meeting, MeetingCreate } from 'types/types';
import DropDownApiService from 'services/dashboard/calendar/DropDownApiService';
import DashboardApiService from 'services/dashboard/DashboardApiService';
import DatePickerApp from 'components/inputs/DateTimePicker';
const animatedComponents = makeAnimated();
type CalendarMettingProps = {
  isOpen: boolean,
  onOpen: () => void,
  onClose: () => void,
  setMeetingToCalendar: (meeting: CalendarEvent) => void
  MeetingOrSlotRef: MeetingPopUpObject,
}

function CalendarMeetingModal({ isOpen, onOpen, onClose, MeetingOrSlotRef, setMeetingToCalendar }: CalendarMettingProps) {
  const [meeting, setMeeting] = useState({} as MeetingCreate);
  const [isAdditional, setIsAdditional] = useState<boolean>(false);
  useEffect(() => {
    const fetchData = async () => {
      const respnonce = await DropDownApiService.getDropDownValue("teams");
      if (respnonce != undefined && respnonce.data != null) {
        setTeams(respnonce.data);
      }

    }
    fetchData();
  }, [])
  const [teams, setTeams] = useState<DropDownItem[]>([]);
  const [additionalUsers, setAdditionalUsers] = useState<DropDownItem[]>([]);


  useEffect(() => {
    const fetchData = async () => {
      const respnonce = await DropDownApiService.getDropDownValue("users");
      if (respnonce != undefined && respnonce.data != null) {
        setAdditionalUsers(respnonce.data);
      }

    }
    if (isAdditional) {
      fetchData();
    }
  }, [isAdditional])
  useEffect(() => {
    if ((MeetingOrSlotRef != undefined || MeetingOrSlotRef != null) && MeetingOrSlotRef.SlotInfo != null || MeetingOrSlotRef.SlotInfo != undefined) {
      setMeeting(prev => ({ ...prev, dateStart: MeetingOrSlotRef.SlotInfo.start, dateEnd: MeetingOrSlotRef.SlotInfo.end }))
    }
    else if ((MeetingOrSlotRef != undefined || MeetingOrSlotRef != null) && MeetingOrSlotRef.CalendarEvent != null || MeetingOrSlotRef.CalendarEvent != undefined) {

    }
  }, [MeetingOrSlotRef])
  //  useEffect(()=>{
  //   console.log(meeting);
  //  },[meeting])

  const handleCreate = async () => {
    const responce = await DashboardApiService.calendarMeetingCreateOrUpdate(meeting);
    if (responce.data != null && responce.data != undefined) {
      setMeetingToCalendar(responce.data);
      onClose()
    }
  }



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
            <div className='grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3 '>
              <FormControl>
                <FormLabel>Meeting Name</FormLabel>
                <Input
                  value={meeting.name}
                  onChange={(e: any) => setMeeting(prev => ({ ...prev, name: e.target.value }))}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Meeting Team</FormLabel>
                <Select
                  closeMenuOnSelect={false}
                  components={animatedComponents}
                  isMulti
                  options={teams}
                  onChange={(value, type) => {
                    setMeeting(prev => ({ ...prev, teams: [...value.map(item => (item as any).value)] }))
                  }}
                />
              </FormControl>
              <FormControl>
              
                {
                  isAdditional && (
                    <FormControl>
                      <FormLabel>Additional Users</FormLabel>
                      <Select
                        closeMenuOnSelect={false}
                        components={animatedComponents}
                        isMulti
                        options={additionalUsers}
                        onChange={(value, type) => {
                          setMeeting(prev => ({ ...prev, additionalUsers: [...value.map(item => (item as any).value)] }))
                        }}
                      />
                    </FormControl>
                  )
                }
            </FormControl>

          
            </div>
            <div className='flex-row flex gap-1'>
              <FormControl>
                <FormLabel>Date Start</FormLabel>
                <DatePickerApp />
              </FormControl>

              <FormControl>

                <FormLabel>Date End</FormLabel>
                <DatePickerApp />
              </FormControl>
            </div>
            <div>
            <div className='flex gap-1 pt-3 justify-start items-center'>
                  <Checkbox value={isAdditional} setValue={() => setIsAdditional(prev => !prev)} />
                  Add additional users
                </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <div className='mt-5 flex justify-between'>
      
            <div className="flex gap-2 flex-end">
              <button
                onClick={() => handleCreate()}
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
            </div>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default CalendarMeetingModal