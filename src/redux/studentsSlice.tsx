import {createSlice} from '@reduxjs/toolkit';
export interface CounterState {
  value: {
    [key: string]: string;
  };
}

const initialState: CounterState = {
  value: {
    name: '',
    email: '',
    mobileNo:"",
    rollno: '',
    Studentclass: '',
    gender: '',
  },
};

export const sudentDataSlice = createSlice({
  name: 'studentData',
  initialState,
  reducers: {
    handleonChangeText: (state, action) => {
      switch (action.payload[0]) {
        case 'name':
          state.value.name = action.payload[1];
          break;
        case 'email':
          state.value.email = action.payload[1];
          break;
          case 'mobileNo':
            state.value.mobileNo = action.payload[1];
            break;
        case 'rollno':
          state.value.rollno = action.payload[1];
          break;
        case 'Studentclass':
          state.value.Studentclass = action.payload[1];
          break;
        case 'gender':
          state.value.gender = action.payload[1];
          break;
        default:
          break;
      }
    },
    handleFieldsEmpty:(state)=>
    {
state.value.name=""
state.value.email=""
state.value.rollno=""
state.value.Studentclass=""
state.value.gender="",
state.value.mobileNo=""
    },
    handleGender:(state,action)=>
    {
state.value.gender=action.payload
    }
  },
});
export const {handleonChangeText,handleFieldsEmpty,handleGender} = sudentDataSlice.actions;

export default sudentDataSlice.reducer;
