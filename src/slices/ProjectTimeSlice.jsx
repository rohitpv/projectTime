import { createSlice } from "@reduxjs/toolkit";
import { getAllRecordsDB, getFilteredRecordsDB, getRecordDataDB, postNewRecordDB, deleteRecordDB, putEditRecordDB } from "../services/userService";
import { useParams, useNavigate } from "react-router-dom";

export const ProjectTimeSlice = createSlice({
  name: "project",
  initialState: {
    listPageRecords: {
      data: {},
    },
    message: "",
    statusCode: "",
    messageColor: "",
    mode: "viewAllRecords",
    recordId: "",
    projData: { ACC: "ACC - RI Digitization", GEM: "GoEmed Hosting Support", QSS: "Quadyster - Staffing Support", QTS: "Quadyster - Technology Support" },
    taskData: { SUPPORT: "SUPPORT - Support", CONS: "CONS - Consulting", DEV: "DEV - Development" },
    membersData: ["Rohit Panchumarthy", "Aditya Lonkar", "Sai Kalyan", "Sowjanya Tadanki", "Padma Manda", "Rahul Namboori", "Navin Ninan", "Sheeba Dola", "Sujatha Mallela"],
    recordData: {},
    filterQuery:{}
  },
  reducers: {
    pushListPageRecords: (state, action) => {
      state.listPageRecords = action.payload;
    },
    setMessage(state, action) {
      state.message = action.payload;
    },
    setMessageColor(state, action) {
      state.messageColor = action.payload;
    },
    setStatusCode(state, action) {
      state.statusCode = action.payload;
    },
    setRecordId(state, action) {
      state.recordId = action.payload;
    },
    setFilterQuery(state, action) {
      state.filterQuery = action.payload;
    },
    setMode: (state, action) => {
      state.mode = action.payload;
    },
    setRecordData(state, action) {
      state.recordData = action.payload;
    },
    clearRecordData(state, action) {
      state.recordData = {};
    },
  },
});

export const getAllRecords = () => async (dispatch) => {
  try {
    let response = await getAllRecordsDB();
    dispatch(pushListPageRecords(response));
    dispatch(setMessage(""));
    dispatch(setMessageColor(""));
  } catch (error) {
    if(error.message=="Network Error")
      dispatch(setMessage("Unable to connect to Web Server"))
    else
      dispatch(setMessage(error.message));
    dispatch(setMessageColor("blue"));
    dispatch(pushListPageRecords(null));
  }
};
export const getFilteredRecords = (queryParam) => async (dispatch) => {
  try {
    let response = await getFilteredRecordsDB(queryParam);
    dispatch(pushListPageRecords(response));
    dispatch(setMessage(response.message=='No Records found'?'No Records found':""));
    dispatch(setMessageColor(""));
  } catch (error) {
    if(error.message=="Network Error")
      dispatch(setMessage("Unable to connect to Web Server"))
    else
      dispatch(setMessage(error.message));
    dispatch(setMessageColor("blue"));
    dispatch(pushListPageRecords(null));
  }
};

export const getRecordData = (id) => async (dispatch) => {
  try {
    let response = await getRecordDataDB(id);
    dispatch(setRecordData(response.data));
  } catch (error) {
    if(error.message=="Network Error")
      dispatch(setMessage("Unable to connect to Web Server"))
    else
      dispatch(setMessage(error.message));
    dispatch(setMessageColor("blue"));
  }
};
export const deleteRecord = (id) => async (dispatch) => {
  try {
    let response = await deleteRecordDB(id);
  } catch (error) {
    if(error.message=="Network Error")
      dispatch(setMessage("Unable to connect to Web Server"))
    else
      dispatch(setMessage(error.message));
  }
};
export const postNewRecord = (data) => async (dispatch) => {
  try {
    let response = await postNewRecordDB(data);
    dispatch(setStatusCode(response.statusCode));
    if (response.statusCode == 200) {
      dispatch(setRecordId(response.data.recordId));
      dispatch(setMessage(response.message));
      dispatch(setMessageColor("green"));
    } else {
      dispatch(setMessage(response.message));
      dispatch(setMessageColor("blue"));
    }
  } catch (error) {
    if(error.message=="Network Error")
      dispatch(setMessage("Unable to connect to Web Server"))
    else
      dispatch(setMessage(error.message));
    dispatch(setMessageColor("blue"));
  }
};
export const putEditRecord = (id, data) => async (dispatch) => {
  try {
    let response = await putEditRecordDB(id, data);
    dispatch(setStatusCode(response.statusCode));
    if (response.statusCode == 200) {
      dispatch(setRecordId(response.data.recordId));
      dispatch(setRecordData(response.data))
      dispatch(setMessage(response.message));
      dispatch(setMessageColor("green"))
    } else {
      dispatch(setMessage(response.message));
      dispatch(setMessageColor("blue"))
    }
  } catch (error) {
    if(error.message=="Network Error")
      dispatch(setMessage("Unable to connect to Web Server"))
    else
      dispatch(setMessage(error.message));
    dispatch(setMessageColor("blue"))
  }
};
export const { pushListPageRecords, setMessage, setMode, setRecordData, setRecordId, clearRecordData, setStatusCode, setMessageColor, setFilterQuery } = ProjectTimeSlice.actions;
export default ProjectTimeSlice.reducer;
