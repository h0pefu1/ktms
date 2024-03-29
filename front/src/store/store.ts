import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./user/userSlice";
import dashboardSlice from "./dashboard/dashboardSlice";
import notifcationBadgesSlice from "./notification/notifcationBadgesSlice";


export const store = configureStore({
    reducer:{
        user:userSlice,
        dashboard:dashboardSlice,
        notifcationBadges:notifcationBadgesSlice,
    },
})
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch