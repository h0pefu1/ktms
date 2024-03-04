import { useDisclosure } from "@chakra-ui/hooks";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/modal";
import Card from "components/card";
import React, { useEffect, useState } from "react";
import { CalendarEvent, MeetingPopUpObject } from "./AppBigCalendar";
import InputField from "components/fields/InputField";
import Dropdown from "components/dropdown";
import Checkbox from '@mui/material/Checkbox';
import { DateTimePicker,DatePicker, MobileDateTimePicker } from "@mui/x-date-pickers";
import { DropDownItem, Meeting, MeetingCreate } from "types/types";
import DropDownApiService from "services/dashboard/calendar/DropDownApiService";
import DashboardApiService from "services/dashboard/DashboardApiService";
import DatePickerApp from "components/inputs/DateTimePicker";
import { Autocomplete, Box, Chip, Drawer, FormControl, FormControlLabel, FormLabel, Input, TextField } from "@mui/material";
import moment from "moment";
type CalendarMettingProps = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  setMeetingToCalendar: (meeting: CalendarEvent) => void;
  MeetingOrSlotRef: MeetingPopUpObject;
};

function CalendarMeetingModal({
  isOpen,
  onOpen,
  onClose,
  MeetingOrSlotRef,
  setMeetingToCalendar,
}: CalendarMettingProps) {
  const [meeting, setMeeting] = useState({} as MeetingCreate);
  const [isAdditional, setIsAdditional] = useState<boolean>(false);
  useEffect(() => {
    const fetchData = async () => {
      const respnonce = await DropDownApiService.getDropDownValue("teams");
      if (respnonce != undefined && respnonce.data != null) {
        setTeams(respnonce.data);
      }
    };
    fetchData();
  }, []);
  const [teams, setTeams] = useState<DropDownItem[]>([]);
  useEffect(() => {
    if (
      ((MeetingOrSlotRef != undefined || MeetingOrSlotRef != null) &&
        MeetingOrSlotRef.SlotInfo != null) ||
      MeetingOrSlotRef.SlotInfo != undefined
    ) {
      setMeeting((prev) => ({
        ...prev,
        dateStart: MeetingOrSlotRef.SlotInfo.start,
        dateEnd: MeetingOrSlotRef.SlotInfo.end,
      }));
    } else if (
      ((MeetingOrSlotRef != undefined || MeetingOrSlotRef != null) &&
        MeetingOrSlotRef.CalendarEvent != null) ||
      MeetingOrSlotRef.CalendarEvent != undefined
    ) {
    }
  }, [MeetingOrSlotRef]);
   useEffect(()=>{
    console.log(meeting);
   },[meeting])

  const handleCreate = async () => {
    const responce = await DashboardApiService.calendarMeetingCreateOrUpdate(
      meeting
    );
    if (responce.data != null && responce.data != undefined) {
      setMeetingToCalendar(responce.data);
      onClose();
    }
  };
const handleClose= ()=>{
  setMeeting({} as MeetingCreate);
  onClose();
}
  return (
    <Drawer open={isOpen} onClose={onClose} 
    variant="temporary"
    anchor="right"
    sx={{
      '& .MuiDrawer-paper': {
        width: '100%', 
        maxWidth: '400px',
      }
    }}
    >
      <Box className="p-3 mt-2">
        <Box className="!z-[1002] !m-auto !w-max min-w-[350px] !max-w-[85%] md:top-[12vh]">
          <Box>
            <h1 className="mb-[20px] text-2xl font-bold">
              {MeetingOrSlotRef != null &&
                (MeetingOrSlotRef.CalendarEvent == null ||
                  MeetingOrSlotRef.CalendarEvent == undefined)
                ? "Create Meeting"
                : "Update Meeting Info"}
            </h1>
          </Box>
          <Box className="grid grid-cols-1 gap-5 md:grid-cols-1 xl:grid-cols-1">
                <TextField  label="Meeting Name" variant="outlined" 
           
                  value={meeting.name}
                  onChange={(e: any) => setMeeting(prev => ({ ...prev, name: e.target.value }))}
                />

                <Autocomplete
                  multiple
                  limitTags={2}
                  id="tags-standard"
                  options={teams}
                  getOptionLabel={(option) => option.label}
                  renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                      <Chip
                        variant="outlined"
                        label={option.label}
                        size="small"
                        {...getTagProps({ index })}
                      />
                    ))
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                       variant="outlined" 
                      label="Teams"
                      placeholder="Teams"
                    />
                  )}
                />
                 <FormControlLabel
          value="bottom"
          control={<Checkbox 
          value={isAdditional}
          onChange={()=>setIsAdditional((prev)=>!prev)}
          />}
          label="Add additional users"
          labelPlacement="end"
        />
                {/* {
                  isAdditional && (
               <Autocomplete
                  multiple
                  id="tags-standard"
                  options={additionalUsers}
                  getOptionLabel={(option) => option.label}
                  renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                      <Chip
                        variant="outlined"
                        label={option.label}
                        size="small"
                        {...getTagProps({ index })}
                      />
                    ))
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                       variant="outlined" 
                      label="Additional Users"
                      placeholder="Additional Users"
                    />
                  )}
                />
            )
          } */}
            <div className='flex-row flex gap-5'>
            <MobileDateTimePicker 
            label="Date Start"
            value={moment(meeting.dateStart)}
            onChange={(e: any) => setMeeting(prev => ({ ...prev, dateStart: e }))}
          />
             <MobileDateTimePicker 
          label="Date End"
          value={moment(meeting.dateEnd)}
          onChange={(e: any) => setMeeting(prev => ({ ...prev, dateEnd: e }))}
          />
            </div>
        
          </Box>
          <Box>
            <div className="mt-5 flex justify-between">
              <div className="flex-end flex gap-2">
                <button
                  onClick={() => handleCreate()}
                  className="linear rounded-xl bg-blue-300 px-5 py-3 text-base font-medium text-navy-700 transition duration-200 hover:bg-blue-500 active:bg-blue-300 dark:bg-white/10 dark:text-white dark:hover:bg-white/20 dark:active:bg-white/30"
                >
                  Create
                </button>
                <button
                  onClick={handleClose}
                  className="linear rounded-xl border-2 border-red-500 px-5 py-3 text-base font-medium text-red-500 transition duration-200 hover:bg-red-600/5 active:bg-red-700/5 dark:border-red-400 dark:bg-red-400/10 dark:text-white dark:hover:bg-red-300/10 dark:active:bg-red-200/10"
                >
                  Close
                </button>
              </div>
            </div>
          </Box>
        </Box>
      </Box>
    </Drawer>
  );
}

export default CalendarMeetingModal;
