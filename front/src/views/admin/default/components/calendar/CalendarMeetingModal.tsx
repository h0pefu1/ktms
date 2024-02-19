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
import moment from 'moment';
import DateTimeHelper from "../../../../../helpers/datetimeHelper"
const animatedComponents = makeAnimated();
type CalendarMettingProps = {
  isOpen: boolean,
  onOpen: () => void,
  onClose: () => void,
  setMeetingToCalendar: (meeting: CalendarEvent) => void
  MeetingOrSlotRef: MeetingPopUpObject,
}

function CalendarMeetingModal({ isOpen, onOpen, onClose, MeetingOrSlotRef, setMeetingToCalendar }: CalendarMettingProps) {
  const [meeting, setMeeting] = useState<MeetingCreate>({} as MeetingCreate);
  const [teams, setTeams] = useState<DropDownItem[]>([]);
  const [isAdditional, setIsAdditional] = useState<boolean>(false);
  const [additionalUsers, setAdditionalUsers] = useState<DropDownItem[]>([]);

  useEffect(() => {
    if (isAdditional) {
      fetchDropDownValue("users", setAdditionalUsers);
    }
  }, [isAdditional]);

  useEffect(() => {
    fetchDropDownValue("teams", setTeams);
    setInitialMeetingDates(MeetingOrSlotRef);
  }, [MeetingOrSlotRef]);

  const fetchDropDownValue = async (type: string, setter: React.Dispatch<React.SetStateAction<DropDownItem[]>>) => {
    const response = await DropDownApiService.getDropDownValue(type);
    if (response?.data) {
      setter(response.data);
    }
  };

  const setInitialMeetingDates = (ref: MeetingPopUpObject) => {
    if (ref?.SlotInfo) {
      setMeeting(prev => ({
        ...prev,
        dateStart: ref.SlotInfo.start,
        dateEnd: ref.SlotInfo.end,
      }));
    }
  };

  const handleCreate = async () => {
    const meetingForCreate = { ...meeting, dateStart: moment(meeting.dateStart).toDate() } as MeetingCreate;
    const response = await DashboardApiService.calendarMeetingCreateOrUpdate(meetingForCreate);
    if (response?.data) {
      setMeetingToCalendar(response.data);
      onClose();
    }
  };


  return (
    < div className="!z-[1010]">
      <Modal isOpen={isOpen}
        isCentered
        onClose={onClose}
        size={"xl"}
      >
        <ModalOverlay className="bg-[#000] !opacity-30" />
        <ModalContent className="!z-[1002] !m-auto !w-max min-w-[350px] !max-w-[85%] md:top-[12vh]">

        <ModalHeaderComponent MeetingOrSlotRef={MeetingOrSlotRef} />
        <ModalBodyComponent
          meeting={meeting}
          setMeeting={setMeeting}
          teams={teams}
          additionalUsers={additionalUsers}
          isAdditional={isAdditional}
          setIsAdditional={setIsAdditional}
        />
        <ModalFooterComponent onClose={onClose} handleCreate={handleCreate} />
        </ModalContent>
      </Modal>
    </div>
  );
};

interface ModalHeaderComponentProps {
  MeetingOrSlotRef: MeetingPopUpObject;
}

const ModalHeaderComponent = ({ MeetingOrSlotRef }: ModalHeaderComponentProps) => (
  <ModalHeader>
    <h1 className="mb-[20px] text-2xl font-bold">
      {MeetingOrSlotRef?.CalendarEvent ? "Update Meeting Info" : "Create Meeting"}
    </h1>
  </ModalHeader>
);

interface ModalBodyComponentProps {
  meeting: MeetingCreate;
  setMeeting: React.Dispatch<React.SetStateAction<MeetingCreate>>;
  teams: DropDownItem[];
  additionalUsers: DropDownItem[];
  isAdditional: boolean;
  setIsAdditional: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalBodyComponent = ({ meeting, setMeeting, teams, additionalUsers, isAdditional, setIsAdditional }: ModalBodyComponentProps) => (
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
                <DatePickerApp value={moment(meeting.dateStart).utc().local()}
                onChange={(e:any)=>setMeeting(prev => ({ ...prev, dateStart:e}))}/>
              </FormControl>

              <FormControl>

                <FormLabel>Date End</FormLabel>
                <DatePickerApp
                value={moment(meeting.dateEnd).utc().local()}
                onChange={(e:any)=>setMeeting(prev => ({ ...prev, dateEnd:e}))}
                />
              </FormControl>
            </div>
            <div>
            <div className='flex gap-1 pt-3 justify-start items-center'>
                  <Checkbox value={isAdditional} setValue={() => setIsAdditional(prev => !prev)} />
                  Add additional users
                </div>
            </div>
  </ModalBody>
);

interface ModalFooterComponentProps {
  onClose: () => void;
  handleCreate: () => Promise<void>;
}

const ModalFooterComponent = ({ onClose, handleCreate }: ModalFooterComponentProps) => (
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
);


export default CalendarMeetingModal