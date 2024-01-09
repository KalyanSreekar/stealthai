import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  darkMode: false,
  sessionMessages: [],
  conversations: [],
};

export const dataSlice = createSlice({
  name: "chatData",
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
    },
    dispatchMessage: (state, action) => {
      state.sessionMessages.push(action.payload);
      setTimeout(() => {
        const elem = document.getElementById("chatDiv");
        elem.scrollTop = elem.scrollHeight;
      }, 0);
    },
    likeMessage: (state, action) => {
      state.sessionMessages[action.payload]["like"] =
        !state.sessionMessages[action.payload]["like"];
      state.sessionMessages[action.payload]["dislike"] = false;
    },
    dislikeMessage: (state, action) => {
      state.sessionMessages[action.payload]["dislike"] =
        !state.sessionMessages[action.payload]["dislike"];
      state.sessionMessages[action.payload]["like"] = false;
    },
    saveSessionData: (state, action) => {
      state.conversations.push({
        chat: action.payload.chat,
        stars: action.payload.stars,
        feedback: action.payload.feedback,
        time: new Date().toLocaleString(),
      });
      state.sessionMessages = [];
    },
  },
});

export const {
  toggleDarkMode,
  dispatchMessage,
  likeMessage,
  dislikeMessage,
  saveSessionData,
} = dataSlice.actions;
export const darkMode = (state) => state.chatData.darkMode;
export const messages = (state) => state.chatData.sessionMessages;
export const pastConversations = (state) => state.chatData.conversations;

export default dataSlice.reducer;
