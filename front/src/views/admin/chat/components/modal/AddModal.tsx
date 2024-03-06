import * as React from "react";
import { styled, css } from "@mui/system";
import { Modal as BaseModal } from "@mui/base/Modal";
import Fade from "@mui/material/Fade";
import { Button } from "@mui/base/Button";
import { Autocomplete, Box, Chip, FormControlLabel, Grid, InputBase, Modal, Paper, TextField, Typography } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import Card from "components/card";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Checkbox from '@mui/material/Checkbox';
import Avatar from '@mui/material/Avatar';
import { $chatApi } from "http/chatAxios";
import ChatContext from "../context/ChatContext";
import { useEffect, useState } from "react";
import UserService from "services/UserService";
import ChatService from "services/chat";
import { useSelector } from "react-redux";
import { RootState } from "store/store";
export type AddModalProps = {
  open: boolean;
  handleClose: any;
};
export default function AddChatModal({ open, handleClose }: AddModalProps) {
  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    p: 4,
  };
  const {user} = useSelector((state:RootState)=>state);
const {chatUser} = React.useContext(ChatContext);
  const [users,setUsers] = React.useState([]);
  const [chatName,setChatName] = React.useState("");
  React.useEffect(()=>{
        const fetch = async( ) =>{
            
                const response = await $chatApi.get(`chatUsers/${chatUser._id}`)
        }

  },[chatUser]) 
  const [selectedValues, setSelectedValues] = useState([]);
  const handleCreate = async()=>{
    console.log(user.person.id)
    console.log(selectedValues);
    const response = await $chatApi.post("chat/create",{
      chatName:chatName,
      persons:[...selectedValues,user.person.id],
    }) 
    if(response.data !=null){
      setSelectedValues([]);
      setChatName("");
    }
    handleClose();
  }
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Card extra="p-5">
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Add new Chat
              </Typography>
              <Box className="p-3 mt-2">
        <Box className="!z-[1002] !m-auto !w-max min-w-[350px] !max-w-[85%] md:top-[12vh]">
          <Box className="grid grid-cols-1 gap-5 md:grid-cols-1 xl:grid-cols-1">
                <TextField  label="Chat Name" variant="outlined" 
                value={chatName}
                onChange={(e)=>setChatName(e.target.value)}
                />
          </Box>
          <Box>
            <CheckboxListSecondary selectedValues = {selectedValues} setSelectedValues={setSelectedValues}/>
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
            </Card>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}



export  function CheckboxListSecondary({selectedValues,setSelectedValues}:any) {
  const [checked, setChecked] = React.useState([]);

  const [persons,setPersons] = React.useState([]);
  const {user} = useSelector((state:RootState)=>state);
    useEffect(()=>{
        const fetch = async()=>{
                    const response = await ChatService.getPersons();
                if(response.data!=undefined){
                    setPersons(response.data.filter(item => item.value !== user.person.id));
                }
                }
        fetch();
    },[])

  const handleToggle = (value: number) => () => {
    console.log(value);
    const currentIndex = checked.indexOf(value);
    console.log(currentIndex);
    const newChecked = [...checked];
    console.log(newChecked);
    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
   <>
   <CustomAutocomplete options={persons} selectedValues ={selectedValues} setSelectedValues={setSelectedValues}/>
    {/* <List dense sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {
      persons.length>0 &&
      persons.map((item) => {
        
        const labelId = `checkbox-list-secondary-label-${item.value}`;
      
      })}
    </List> */}
    </>
  );
}
function CustomAutocomplete({ options,selectedValues,setSelectedValues }:any) {
  const [inputValue, setInputValue] = useState('');
  

  const handleInputChange = (event:any) => {
    setInputValue(event.target.value);
  };

  const handleToggle = (value:any) => {
    const currentIndex = selectedValues.indexOf(value);
    const newChecked = [...selectedValues];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setSelectedValues(newChecked);
  };

  const filteredOptions = options.filter((option:any) =>
    option.label.toLowerCase().includes(inputValue.toLowerCase())
  );

  const handleDelete = (value:any) => () => {
    setSelectedValues(selectedValues.filter((selectedValue:any) => selectedValue !== value));
  };

  return (
    <Box 
    sx={{ 
      marginTop:'10px',
      maxWidth: '600px', 
      width: '100%', 
      border: '1px solid #ced4da', 
      borderRadius: '20px', 
      padding: '10px', 
      display: 'flex', 
      alignItems: 'center', 
      flexWrap: 'wrap', 
      gap: '10px',
    }}
  >
    {selectedValues.map((value:any) => (
      <Chip
        key={value}
        label={options.find((option:any) => option.value === value)?.label}
        onDelete={() => handleToggle(value)}
        size="small"
        sx={{ margin: '2px' }}
      />
    ))}
    <InputBase
      placeholder="Search users"
      value={inputValue}
      onChange={handleInputChange}
      sx={{ flex: 1, minWidth: '120px' }}
    />
      <List sx={{ maxHeight: 200, overflow: 'auto', mt: 2,  width: '100%' }}>
        {filteredOptions.map((option:any) => (
          <ListItem
            key={option.value}
            secondaryAction={
              <Checkbox
                edge="end"
                checked={selectedValues.includes(option.value)}
              />
            }
            disablePadding
          >
            <ListItemButton dense onClick={()=>{handleToggle(option.value)}}>
              <ListItemAvatar>
                <Avatar alt={`Avatar n°${option.value}`} src={`/static/images/avatar/${option.value}.jpg`} />
              </ListItemAvatar>
              <ListItemText primary={option.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}