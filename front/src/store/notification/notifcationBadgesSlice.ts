import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { NotificationBadges } from "types/types";

const InitialState: NotificationBadges = {
    chatBadgeCount: 1,
    notificationBadgeCount: 0,
}

export const notifcationBadgesSlice = createSlice({
    name: 'notifcationBadges',
    initialState: InitialState,
    reducers: {
        IncrementChatBadges: (state) => {
            state.chatBadgeCount = state.chatBadgeCount + 1;
        },
        DecrementChatBadges: (state) => {
            state.chatBadgeCount = state.chatBadgeCount == 0
                ? 0 : state.chatBadgeCount--;
        },
        DecrementNotificationBadges: (state) => {
            state.notificationBadgeCount = state.notificationBadgeCount == 0
                ? 0 : state.notificationBadgeCount--;
        },
        IncrementNotificationBadges: (state) => {
            state.chatBadgeCount = state.chatBadgeCount++;
        }
    }
})
export const { IncrementChatBadges } = notifcationBadgesSlice.actions
export default notifcationBadgesSlice.reducer