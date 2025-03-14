import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserProfileType } from "@/redux/api/apiType";

type ServiceSliceInitialState = {
  openAddPostModal: boolean;
  openEditProfileModal: boolean;
  myInfo: UserProfileType | null;
};

const initialState: ServiceSliceInitialState = {
  openAddPostModal: false,
  openEditProfileModal: false,
  myInfo: null,
};

export const serviceSlice = createSlice({
  name: "serviceSlice",
  initialState,
  reducers: {
    addPostModal: (state, action: PayloadAction<boolean>) => {
      state.openAddPostModal = action.payload;
    },
    editProfileModal: (state, action: PayloadAction<boolean>) => {
      state.openEditProfileModal = action.payload;
    },
    addMyInfo: (state, action: PayloadAction<UserProfileType>) => {
      state.myInfo = action.payload;
    },
  },
});

export const { addPostModal, editProfileModal, addMyInfo } =
  serviceSlice.actions;

export default serviceSlice.reducer;
