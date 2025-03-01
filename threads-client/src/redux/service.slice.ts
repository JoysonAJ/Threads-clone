import { createSlice ,PayloadAction} from "@reduxjs/toolkit";

type ServiceSliceInitialState = {
  openAddPostModal: boolean;
  openEditProfileModal:boolean;
};

const initialState: ServiceSliceInitialState = {
  openAddPostModal: false,
  openEditProfileModal:false
};

export const serviceSlice = createSlice({
  name: "serviceSlice",
  initialState,
  reducers: {
    addPostModal: (state, action:PayloadAction<boolean>) => {
      state.openAddPostModal = action.payload;
    },
    editProfileModal:(state, action:PayloadAction<boolean>)=>{
      state.openEditProfileModal = action.payload
    }
  },
});

export const { addPostModal,editProfileModal } = serviceSlice.actions;

export default serviceSlice.reducer
