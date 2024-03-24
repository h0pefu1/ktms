import Card from 'components/card'
import React from 'react'
import OnlineUser from './OnlineUser'
import avatar5 from "assets/img/avatars/avatar5.png";
function OnlineUsers() {
  return (
    <div>
      <div
        className=" 
          flex flex-col
          gap-2 overflow-y-auto overflow-x-hidden"
        style={{
          maxHeight: "30rem",
        }}
      >
          <OnlineUser name='Maxim Maxim' image={avatar5} />
        <OnlineUser name='Maxim Maxim' />
        <OnlineUser name='Maxim Maxim' />
        <OnlineUser name='Maxim Maxim' />
        <OnlineUser name='Maxim Maxim' />
        <OnlineUser name='Maxim Maxim' />
        <OnlineUser name='Maxim Maxim' />
        <OnlineUser name='Maxim Maxim' />
        <OnlineUser name='Maxim Maxim' />
        <OnlineUser name='Maxim Maxim' />
        <OnlineUser name='Maxim Maxim' />
        <OnlineUser name='Maxim Maxim' />
        <OnlineUser name='Maxim Maxim' />
        <OnlineUser name='Maxim Maxim' />
        <OnlineUser name='Maxim Maxim' />
        <OnlineUser name='Maxim Maxim' />
      </div>
    </div>
  )
}

export default OnlineUsers