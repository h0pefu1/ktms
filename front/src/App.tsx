import { Routes, Route, Navigate } from "react-router-dom";

import AdminLayout from "layouts/admin";
import AuthLayout from "layouts/auth";
import { useEffect, useState } from "react";
import { RootState } from "store/store";
import { useDispatch, useSelector } from "react-redux";
import { login,checkAuth } from "store/user/userSlice";
import UserService from "services/UserService";
import socketIOClient from 'socket.io-client';
import { IPerson } from "types/types";
import { addOnlineUser } from "store/dashboard/dashboardSlice";
const App = () => {
  const ENDPOINT = "http://127.0.0.1:3001";
  const {user,dashboard} = useSelector((state:RootState)=>state);
  const dispatch = useDispatch();
  useEffect(()=>{
      UserService.checkAuthUser(dispatch);
  },[])
  useEffect(()=>{
    if(user.isAuth){
      const socket = socketIOClient(ENDPOINT);
      socket.emit('userConnected', user.person);
      socket.on('onlineUsers', (users: any[]) => {
        console.log(users);
        console.log(users.filter(u=>u.id != user.person.id));
          let persons = users.map(p=>{
            let person:IPerson = {
              id:p.id,
              firstName:p.firstName,
              lastName:p.lastName,
            }
            return person;
          })
          dispatch(addOnlineUser(persons.filter(u=>u.id != user.person.id)));
      });
      
      return () => {
        socket.disconnect();
      };
    }

  },[user.isAuth])
  return (
    <Routes>
      <Route path="auth/*" element={<AuthLayout />} />
      <Route path="admin/*" element={<AdminLayout />} />
      <Route path="/" element={<Navigate to="/admin" replace />} />
    </Routes>
  );
};

export default App;
