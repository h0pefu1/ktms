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

  const [users,setUsers] = React.useState([]);
  React.useEffect(()=>{
        const fetch = async( ) =>{
                const response = $chatApi.get("chatUsers")
        }

  },[]) 
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
  const [checked, setChecked] = React.useState([1]);

  const handleToggle = (value: number) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <List dense sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {[0, 1, 2, 3].map((value) => {
        const labelId = `checkbox-list-secondary-label-${value}`;
        return (
          <ListItem
            key={value}
            secondaryAction={
              <Checkbox
                edge="end"
                onChange={handleToggle(value)}
                checked={checked.indexOf(value) !== -1}
                inputProps={{ 'aria-labelledby': labelId }}
              />
            }
            disablePadding
          >
            <ListItemButton>
              <ListItemAvatar>
                <Avatar
                  alt={`Avatar n°${value + 1}`}
                  src={`/static/images/avatar/${value + 1}.jpg`}
                />
              </ListItemAvatar>
              <ListItemText id={labelId} primary={`Line item ${value + 1}`} />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
}