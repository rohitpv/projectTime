import React, { useState, useEffect } from "react";
import { Grid, Box, FormControl, Autocomplete, Button, TextField, Typography, Dialog, DialogActions, DialogContent, DialogContentText, FormHelperText } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { setMode, postNewRecord, deleteRecord, getRecordData, putEditRecord, setMessage } from "../slices/ProjectTimeSlice";
import { useParams, useNavigate } from "react-router-dom";
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { displayMessage } from "../App";
import { useFormik } from "formik";
import * as yup from "yup";

const Details = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // fetch reference data
  let projData = useSelector((state) => state.projData);
  let optionsProject = Object.keys(projData).map((proj) => {
    return { id: proj, label: projData[proj] };
  });
  optionsProject = [{ id: "", label: "" }, ...optionsProject];

  let taskData = useSelector((state) => state.taskData);
  let statusCode = useSelector((state) => state.statusCode);
  let messageColor = useSelector((state) => state.messageColor);
  let optionsTask = Object.keys(taskData).map((task) => {
    return { id: task, label: taskData[task] };
  });
  optionsTask = [{ id: "", label: "" }, ...optionsTask];
  let optionsMembers = useSelector((state) => state.membersData);
  let mode = useSelector((state) => state.mode);
  let recordId = useSelector((state) => state.recordId);
  let recordData = useSelector((state) => state.recordData);
  let message = useSelector((state) => state.message);

  function inverse(obj) {
    var retobj = {};
    for (var key in obj) {
      retobj[obj[key]] = key;
    }
    return retobj;
  }

  const [openDeleteBox, setOpenDeleteBox] = useState(false);
  const handleDelete = () => {
    console.log("DELETED record");
    handleDeleteBoxClose();
    dispatch(deleteRecord(recordData.recordId));
    // navigate to filtered records
    navigate(`/`);
  };
  const handleDeleteBoxOpen = () => {
    setOpenDeleteBox(true);
  };
  const handleDeleteBoxClose = () => {
    setOpenDeleteBox(false);
  };

  useEffect(() => {
    if (statusCode == 200 && mode == "createRecord") {
      // change mode to edit
      dispatch(setMode("editRecord"));
      // set msg color here
      // redirect to edit page after successful post
      dispatch(getRecordData(recordId));
      navigate("/project-record/" + recordId);
    } else if (statusCode == 200 && mode == "editRecord") {
      // DO NOTHING
      console.log("successfull");
      // only set message and code
      // // remain on edit mode only
    }
  }, [statusCode]);

  useEffect(() => {
    setValues(recordData);
  }, [recordData]);

  useEffect(() => {
    resetForm();
    setIsChanged(false);
  }, [mode]);

  const initialValues = recordData;
  const [isChanged, setIsChanged] = useState(false);

  const validationSchema = yup.object().shape({
    clockDate: yup.date().required("ClockDate is a required field"),
    personName: yup.string().required("PersonName is a required field"),
    projectName: yup.string().required("ProjectName is a required field"),
    taskName: yup.string().required("TaskName is a required field"),
    taskNote: yup.string().required("TaskNote is a required field"),

    totalTime: yup
      .string()
      .test("totalTime", "Total-time cannot be entered with time duration", function (value) {
        const { timeFrom, timeTo } = this.parent;
        if (value && (timeFrom || timeTo) && (mode == "createRecord" || (mode == "editRecord" && isChanged))) return false;
        return true;
      })
      .test("totalTime", "Total Time is a required field", function (value) {
        const { timeFrom, timeTo } = this.parent;
        if (!value && !timeFrom && !timeTo) return false;
        return true;
      }),

    timeFrom: yup.string().test("timeFrom", "Time-from is a required field", function (value) {
      const { totalTime, timeTo } = this.parent;
      if (!value && !totalTime && (mode == "createRecord" || (mode == "editRecord" && isChanged))) return false;
      return true;
    }),

    timeTo: yup.string().test("timeTo", "Time-to is a required field", function (value) {
      const { totalTime, timeFrom } = this.parent;
      if (!value && !totalTime && (mode == "createRecord" || (mode == "editRecord" && isChanged))) return false;
      return true;
    }),
  });

  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: (values, errors) => {
      if (mode == "createRecord") {
        dispatch(postNewRecord(values));
      }
      if (mode == "editRecord") {
        dispatch(putEditRecord(values.recordId, values));
      }
    },
  });
  const { values, errors, handleBlur, handleChange, handleSubmit, touched, setValues, setFieldTouched, submitCount, setFieldValue, resetForm } = formik;

  return (
    <div>
      <Box sx={{ width: "80%", border: "1px solid", color: "#2196f3", "& .MuiOutlinedInput-root": { fontSize: "14px" } }} m={"auto"} p="8px">
        <form onSubmit={handleSubmit}>
          <Grid container mb="8px" direction="row" alignItems="center">
            {/* Timelog */}
            <Grid container mt="8px" columnSpacing={4}>
              <Grid item xs={2} display="flex" justifyContent="end" alignItems="center">
                <Typography data-testid="timelogId" style={{ color: "grey", fontSize: 14, textAlign: "right" }}>{displayMessage("Timelog ID")}: </Typography>
              </Grid>
              <Grid item xs={3}>
                <TextField disabled placeholder="#" name="recordId" data-testid="recordId" sx={{ width: "100%", color: "black" }} size="small" value={values.recordId || "#"} />
              </Grid>
            </Grid>
            {/* employee */}
            <Grid container mt="8px" columnSpacing={4}>
              <Grid item xs={2} display="flex" justifyContent="end" alignItems="center">
                <Typography data-testid="employee" style={{ color: "grey", fontSize: 14, textAlign: "right" }}>{displayMessage("Employee")}: </Typography>
              </Grid>
              <Grid item xs={10}>
                <Autocomplete
                  onChange={(event, data) => {
                    setFieldValue("personName", data);
                  }}
                  onBlur={(e) => {
                    setFieldTouched("personName", true);
                    handleBlur(e);
                  }}
                  disabled={mode === "viewRecord"}
                  name="personName"
                  options={optionsMembers}
                  renderInput={(params) => <TextField {...params} label="" placeholder="Name" />}
                  sx={{ width: "100%" }}
                  size="small"
                  value={optionsMembers.find((e) => e === values.personName) || ""}
                />
                {(touched.personName || submitCount > 0) && errors.personName ? <FormHelperText sx={{ color: "#bf3333" }}>{errors.personName}</FormHelperText> : null}
              </Grid>
            </Grid>
            {/* project */}
            <Grid container mt="8px" columnSpacing={4}>
              <Grid item xs={2} display="flex" justifyContent="end" alignItems="center">
                <Typography style={{ color: "grey", fontSize: 14, textAlign: "right" }}>{displayMessage("Project")}: </Typography>
              </Grid>
              <Grid item xs={10}>
                <Autocomplete
                  onChange={(event, data) => {
                    setFieldValue("projectName", inverse(projData)[data.label]);
                  }}
                  onBlur={(e) => {
                    setFieldTouched("projectName", true);
                    handleBlur(e);
                  }}
                  disabled={mode === "viewRecord"}
                  name="projectName"
                  options={optionsProject}
                  renderInput={(params) => <TextField {...params} label="" placeholder="Project Name" />}
                  sx={{ width: "100%" }}
                  size="small"
                  value={optionsProject.find((e) => e.label === projData[values.projectName]) || ""}
                />
                {(touched.projectName || submitCount > 0) && errors.projectName ? <FormHelperText sx={{ color: "#bf3333" }}>{errors.projectName}</FormHelperText> : null}
              </Grid>
            </Grid>
            {/* task */}
            <Grid container mt="8px" columnSpacing={4}>
              <Grid item xs={2} display="flex" justifyContent="end" alignItems="center">
                <Typography style={{ color: "grey", fontSize: 14, textAlign: "right" }}>{displayMessage("Task")}: </Typography>
              </Grid>
              <Grid item xs={10}>
                <Autocomplete
                  onChange={(event, data) => {
                    setFieldValue("taskName", inverse(taskData)[data.label]);
                  }}
                  onBlur={(e) => {
                    setFieldTouched("taskName", true);
                    handleBlur(e);
                  }}
                  disabled={mode === "viewRecord"}
                  name="taskName"
                  options={optionsTask}
                  renderInput={(params) => <TextField {...params} label="" placeholder="Task Name" />}
                  sx={{ width: "100%" }}
                  size="small"
                  value={optionsTask.find((e) => e.label === taskData[values.taskName]) || ""}
                />
                {(touched.taskName || submitCount > 0) && errors.taskName ? <FormHelperText sx={{ color: "#bf3333" }}>{errors.taskName}</FormHelperText> : null}
              </Grid>
            </Grid>
            {/* date */}
            <Grid container mt="8px" columnSpacing={4}>
              <Grid item xs={2} display="flex" justifyContent="end" alignItems="center">
                <Typography style={{ color: "grey", fontSize: 14, textAlign: "right" }}>{displayMessage("Date")}: </Typography>
              </Grid>
              <Grid item xs={3}>
                <TextField data-testid="dateField" placeholder="date" type="date" onChange={handleChange} onBlur={handleBlur} disabled={mode === "viewRecord"} name="clockDate" sx={{ bgcolor: "#FFFFFF", "& .MuiInputBase-input": { padding: 1 }, width: "100%" }} value={values.clockDate ? values.clockDate : ""} />
                {(touched.clockDate || submitCount > 0) && errors.clockDate ? <FormHelperText sx={{ color: "#bf3333" }}>{errors.clockDate}</FormHelperText> : null}
              </Grid>
            </Grid>
            {/* task note*/}
            <Grid container mt="8px" columnSpacing={4} style={{ height: "15%" }}>
              <Grid item xs={2} display="flex" justifyContent="end" alignItems="center">
                <Typography style={{ color: "grey", fontSize: 14, textAlign: "right" }}>{displayMessage("Task Note")}: </Typography>
              </Grid>
              <Grid item xs={10}>
                <TextareaAutosize onChange={handleChange} onBlur={handleBlur} disabled={mode === "viewRecord"} name="taskNote" minRows={4} style={{ width: "99%", height: "80px", fontSize: 14, padding: 6, fontFamily: "Arial" }} placeholder="Task Note" value={values.taskNote || ""} />
                {(touched.taskNote || submitCount > 0) && errors.taskNote ? <FormHelperText sx={{ color: "#bf3333" }}>{errors.taskNote}</FormHelperText> : null}
              </Grid>
            </Grid>
            {/* time duration */}
            <Grid container mt="8px" columnSpacing={4}>
              <Grid item xs={2} display="flex" justifyContent="end" alignItems="center">
                <Typography style={{ color: "grey", fontSize: 14, textAlign: "right" }}>{displayMessage("Time Duration")}: </Typography>
              </Grid>
              <Grid item xs={3}>
                <TextField
                  onChange={(e) => {
                    handleChange(e);
                    setIsChanged(true);
                  }}
                  onBlur={handleBlur}
                  disabled={mode === "viewRecord"}
                  name="timeFrom"
                  sx={{ width: "100%" }}
                  size="small"
                  placeholder="Time From"
                  value={values.timeFrom || ""}
                />
                {(touched.timeFrom || submitCount > 0) && errors.timeFrom ? <FormHelperText sx={{ color: "#bf3333" }}>{errors.timeFrom}</FormHelperText> : null}
              </Grid>
              <Grid item xs={3}>
                <TextField
                  onChange={(e) => {
                    handleChange(e);
                    setIsChanged(true);
                  }}
                  onBlur={handleBlur}
                  disabled={mode === "viewRecord"}
                  name="timeTo"
                  sx={{ width: "100%" }}
                  size="small"
                  placeholder="Time To"
                  value={values.timeTo || ""}
                />
                {(touched.timeTo || submitCount > 0) && errors.timeTo ? <FormHelperText sx={{ color: "#bf3333" }}>{errors.timeTo}</FormHelperText> : null}
              </Grid>
            </Grid>
            {/* Total Time */}
            <Grid container mt="8px" columnSpacing={4}>
              <Grid item xs={2} display="flex" justifyContent="end" alignItems="center">
                <Typography style={{ color: "grey", fontSize: 14, textAlign: "right" }}>{displayMessage("Total Time")}: </Typography>
              </Grid>
              <Grid item xs={3}>
                <TextField
                  onChange={(e) => {
                    handleChange(e);
                    setIsChanged(true);
                  }}
                  onBlur={handleBlur}
                  disabled={mode === "viewRecord"}
                  name="totalTime"
                  sx={{ width: "100%" }}
                  size="small"
                  placeholder="Total Time"
                  value={values.totalTime || ""}
                />
                {(touched.totalTime || submitCount > 0) && errors.totalTime ? <FormHelperText sx={{ color: "#bf3333" }}>{errors.totalTime}</FormHelperText> : null}
              </Grid>
              <Grid item xs={3}>
                <Typography style={{ color: "blue", fontSize: 14, textAlign: "left" }}>HH:MM </Typography>
              </Grid>
            </Grid>

            {/* messages */}
            <Typography data-testid="messages" sx={{ width: "100%", color: `${messageColor}`, textAlign: "center", mt: "5px" }} style={{ fontSize: "25px" }} variant="h2">
              {displayMessage(message) || <br />}
            </Typography>

            {/* Buttons */}
            <Box m={"auto"} p="8px">
              {(mode == "createRecord" || mode == "editRecord") && (
                <Button data-testid="Save" type="submit" sx={{ textTransform: "none", color: "white", bgcolor: "blue", border: "1px solid", borderColor: "blue", "&:hover": { bgcolor: "#03a9f4" }, m: "8px" }}>
                  <SaveIcon sx={{ color: "yellow" }} /> {displayMessage("Save")}
                </Button>
              )}
              {mode == "editRecord" && (
                <>
                  <Button data-testid="deleteButton" sx={{ textTransform: "none", color: "white", bgcolor: "red", border: "1px solid", borderColor: "red", "&:hover": { bgcolor: "#ff1744" }, m: "8px" }} onClick={handleDeleteBoxOpen}>
                    <DeleteIcon sx={{ color: "yellow" }} /> {displayMessage("Delete")}
                  </Button>
                  <Dialog open={openDeleteBox} onClose={handleDeleteBoxClose}>
                    <DialogContent>
                      <DialogContentText>{displayMessage("Are you sure you want to delete this record?")}</DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleDeleteBoxClose} sx={{ textTransform: "none" }}>
                        {displayMessage("No")}
                      </Button>
                      <Button onClick={handleDelete} autoFocus sx={{ textTransform: "none" }}>
                        {displayMessage("Yes")}
                      </Button>
                    </DialogActions>
                  </Dialog>
                </>
              )}
              {mode == "editRecord" && (
                <Button data-testid="switchToView"
                  sx={{ textTransform: "none", bgcolor: "white", border: "1px solid", borderColor: "blue", m: "8px" }}
                  onClick={() => {
                    setValues(recordData);
                    dispatch(setMode("viewRecord"));
                    dispatch(setMessage(""));
                  }}
                >
                  <VisibilityIcon sx={{ color: "darkblue" }} /> {displayMessage("Switch to View")}
                </Button>
              )}
              {mode == "viewRecord" && (
                <Button
                  sx={{ textTransform: "none", bgcolor: "white", border: "1px solid", borderColor: "blue", m: "8px" }}
                  onClick={() => {
                    setValues(recordData);
                    dispatch(setMode("editRecord"));
                    dispatch(setMessage(""));
                  }}
                >
                  <EditNoteIcon sx={{ color: "red" }} />
                  {displayMessage("Switch to Update")}
                </Button>
              )}
              <Button
                onClick={() => {
                  dispatch(setMessage(""));
                  dispatch(setMode("redirectToFilter"));
                  navigate("/");
                }}
                sx={{ textTransform: "none", bgcolor: "white", border: "1px solid", borderColor: "blue", m: "8px" }}
              >
                {displayMessage("Goto: Project Time List")}
              </Button>
            </Box>
          </Grid>
        </form>
      </Box>
    </div>
  );
};

export default Details;
