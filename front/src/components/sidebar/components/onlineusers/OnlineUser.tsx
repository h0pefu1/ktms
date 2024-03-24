import { Avatar, Badge, Typography } from '@mui/material'
import React from 'react'

export type OnlineUserBadge = {
    name: string,
    image?: string,
    isOnline?:boolean,
}
function stringToColor(string: string) {
    let hash = 0;
    let i;
  
    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
  
    let color = '#';
  
    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */
  
    return color;
  }
  
  function stringAvatar(name: string) {
    return {
      sx: {
        width: 34, 
        height: 34,
        bgcolor: stringToColor(name),
        fontSize: 15,
      },
      children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
  }
  
function OnlineUser({ name, image,isOnline }: OnlineUserBadge) {
    return (
        <div className='items-center flex gap-4  px-6
 transition-colors duration-300 ease-in-out hover:bg-brand-400 cursor-pointer
 flex  items-center  rounded-2xl
  bg-white p-3 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none
    '>
            <Badge
                overlap="circular"
                color={isOnline ? "success" : "error"}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                variant="dot"
            >
                {
                    image ?  <Avatar
                
                    sx={{ width: 34, height: 34,fontSize: 15 }}
                    alt={name} src={image} />
                    :
                    <Avatar 
                    
                    {...stringAvatar(name)} />
                }
               
            </Badge>
            <div>
                {name}
            </div>
        </div>
    )
}

export default OnlineUser