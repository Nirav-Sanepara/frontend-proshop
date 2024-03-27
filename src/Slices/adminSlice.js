import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { allUserDataGetApiHandler } from "../service/user";

const initialState = {
  usersData: [],
  error: false,
  loading: false,
};


export const allUsersData = createAsyncThunk(
  "usersData/allUsersData",
  async () => {
    try {
      const data = await allUserDataGetApiHandler()
      
     return data.data

    } catch (err) {
      console.log("error from slice", err);
    }
  }
);

const allusersDataSlice = createSlice({
  name: "usersData",
  initialState,
  reducers: {
    addUsers(state, action) {
     state.usersData = state.usersData .push(action.payload)
    },
    updateUser(state, action) {
      const updatedUser = action.payload
      
       state.usersData=state.usersData.map((ele,ind)=>
       ele._id ==  updatedUser._id ?  updatedUser : ele 
      )
    },
    deActiveUser(state,action) {
     
      var actionData = action.payload;
      actionData.isActive=false;

      state.usersData = state.usersData.map((ele,ind)=>{
        return ele._id == actionData._id ? actionData : ele
      })
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(allUsersData.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(allUsersData.fulfilled, (state, action) => {
        state.loading = false;
        state.usersData = action.payload;
      })
      .addCase(allUsersData.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.usersData=[]
      });
  },
});

export default allusersDataSlice.reducer;
export const { addUsers, updateUser, deActiveUser, } = allusersDataSlice.actions;
  
