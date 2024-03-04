import * as React from "react";
import { styled, css } from "@mui/system";
import { Modal as BaseModal } from "@mui/base/Modal";
import Fade from "@mui/material/Fade";
import { Button } from "@mui/base/Button";
import { Autocomplete, Box, FormControlLabel, Modal, TextField, Typography } from "@mui/material";
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
import { useEffect } from "react";
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
const {chatUser} = React.useContext(ChatContext);
  const [users,setUsers] = React.useState([]);
  React.useEffect(()=>{
        const fetch = async( ) =>{
            
                const response = await $chatApi.get(`chatUsers/${chatUser._id}`)
        }

  },[chatUser]) 
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
                />
          </Box>
          <Box>
            <CheckboxListSecondary/>
          </Box>
          <Box>
            <div className="mt-5 flex justify-between">
              <div className="flex-end flex gap-2">
                <button
                  onClick={() => console.log()}
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



export  function CheckboxListSecondary() {
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
    <List dense sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {
      persons.length>0 &&
      persons.map((item) => {
        
        const labelId = `checkbox-list-secondary-label-${item.value}`;
        return (
          <ListItem
            key={item.value}
            secondaryAction={
              <Checkbox
                edge="end"
                onChange={handleToggle(item.value)}
                checked={checked.indexOf(item.value) !== -1}
                inputProps={{ 'aria-labelledby': labelId }}
              />
            }
            disablePadding
          >
            <ListItemButton>
              <ListItemAvatar>
                <Avatar
                  alt={`Avatar n°${item.value}`}
                  src={`/static/images/avatar/${item.value}.jpg`}
                />
              </ListItemAvatar>
              <ListItemText id={labelId} primary={`${item.label}`} />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
}