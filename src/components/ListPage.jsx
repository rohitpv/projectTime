import React from "react";
import { useState, useRef, useEffect } from "react";
import { Box, Grid, Menu, MenuItem, Button, Typography, Input } from "@mui/material";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
// import FilterAltIcon from "@mui/icons-material/FilterAlt";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useSelector, useDispatch } from "react-redux";
import { getAllRecords, getFilteredRecords, setMode, clearRecordData, setFilterQuery, setMessage, setRecordId, setStatusCode } from "../slices/ProjectTimeSlice";
import Fade from "@mui/material/Fade";
import dayjs from "dayjs";
import { useParams, useNavigate } from "react-router-dom";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { displayMessage } from "../App";

import ListItem from "./ListItem";
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
const ListPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let recordsList = useSelector((state) => state.listPageRecords);
  let message = useSelector((state) => state.message);
  // fetch reference data
  let projDataState = useSelector((state) => state.projData);
  let projData = { "All Projects": "All Projects", ...projDataState };
  let taskData = useSelector((state) => state.taskData);
  let membersDataState = useSelector((state) => state.membersData);
  let membersData = ["All Members", ...membersDataState];
  let mode = useSelector((state) => state.mode);
  let filterQuery = useSelector((state) => state.filterQuery);


  useEffect(() => {
    // runs only at start
    // fetches all records
    dispatch(getAllRecords());
  }, []);
  const [projectDd, setProject] = useState(null);
  const [selectedProjectIndex, setSelectedProjectIndex] = React.useState(0);
  const openProject = Boolean(projectDd);

  const handleProjectClick = (event) => {
    setProject(event.currentTarget);
  };
  const handleProjItemClick = (event, index) => {
    setSelectedProjectIndex(index);
    setProject(null);
  };
  const handleProjectClose = (event) => {
    setProject(null);
  };
  const [memberDd, setMember] = useState(null);
  const [selectedMemberIndex, setSelectedMemberIndex] = React.useState(0);
  const openMember = Boolean(memberDd);

  const handleMemberClick = (event) => {
    setMember(event.currentTarget);
  };
  const handleMemberItemClick = (event, index) => {
    setSelectedMemberIndex(index);
    setMember(null);
  };

  const handleMemberClose = (event) => {
    setMember(null);
  };

  const [dateFrom, setDateFrom] = React.useState(dayjs("2000-01-01"));
  const handleDateFromChange = (newvalue) => {
    setDateFrom(newvalue);
  };

  const [dateTo, setDateTo] = React.useState(dayjs("2099-12-31"));
  const handleDateToChange = (newvalue) => {
    setDateTo(newvalue);
  };

  const handleFilterSubmit = (queryParam) => {
    dispatch(setMode("viewFilteredRecords"));
    dispatch(getFilteredRecords(queryParam));
  };
  useEffect(() => {
    if (mode == "redirectToHome") {
      dispatch(setMode("viewFilteredRecords"));
      //  set filter query dictonary
      setSelectedProjectIndex(0);
      setSelectedMemberIndex(0);
      setDateFrom(dayjs("2000-01-01"));
      setDateTo(dayjs("2099-12-31"));
    }
  }, [filterQuery]);

  useEffect(() => {
    // handleFilterSubmit triggered
    if (mode == "redirectToFilter") {
      dispatch(setMode("viewFilteredRecords"));
      //  set filter query dictonary
      setSelectedProjectIndex(filterQuery.selectedProjectIndex);
      setSelectedMemberIndex(filterQuery.selectedMemberIndex);
      setDateFrom(filterQuery.dateFrom);
      setDateTo(filterQuery.dateTo);
    }

    if (dateTo["$d"] == "Invalid Date" || dateFrom["$d"] == "Invalid Date") {
      dispatch(setMessage("Invalid Date Entered"));
      dispatch(clearRecordData());
    } else {

      let queryParam = `/project-record?project=${Object.keys(projData)[selectedProjectIndex]}&memberName=${membersData[selectedMemberIndex]}&dateFrom=${dateFrom.format("YYYY-MM-DD")}&dateTo=${dateTo.format("YYYY-MM-DD")}`;
      queryParam = queryParam.replace(/\s/g, "%20");
      dispatch(
        setFilterQuery({
          selectedProjectIndex,
          selectedMemberIndex,
          dateFrom,
          dateTo,
        })
      );
      handleFilterSubmit(queryParam);
    }
  }, [selectedProjectIndex, selectedMemberIndex, dateFrom, dateTo]);

  dispatch(clearRecordData());
  dispatch(setRecordId(""));
  return (
    <div mt={1} data-testid="listpage">
      <Box sx={{ bgcolor: "#17A2B7", mt: "5px" }}>
        <Grid container spacing={1} sx={{ color: "#FFFFFF", pb: "8px" }}>
          <Grid item xs={2} sx={{ p: -0.5 }}>
            <Typography align="right" sx={{ pl: "8px", mt: "6px",fontSize: 14 }}>
              {displayMessage("Project")}:
            </Typography>
          </Grid>
          <Grid item xs={4} sx={{ p: -0.5 }}>
            <Button data-testid="projectDropDown" onClick={handleProjectClick} sx={{ textTransform: "none", width: "100%", height: "100%", bgcolor: "#FFFFFF", color: "black", p: "8px" }} endIcon={<ArrowDropDownIcon size="small" style={{ color: "black", position: "absolute", right: "5px", top: "25%" }} />}>
              <Typography style={{ fontSize: 14, width: "100%", textAlign: "left" }}>{Object.values(projData)[selectedProjectIndex]}</Typography>
            </Button>
            <Menu anchorEl={projectDd} open={openProject} onClose={handleProjectClose} TransitionComponent={Fade}>
              {Object.values(projData).map((project, index) => (
                <MenuItem data-testid="projectValue" key={project} selected={index === selectedProjectIndex} onClick={(event) => handleProjItemClick(event, index)}>
                  {project}
                </MenuItem>
              ))}
            </Menu>
          </Grid>
          <Grid item xs={2} sx={{ p: -0.5 }}>
            <Typography align="right" sx={{ pl: "8px", mt: "6px", fontSize: 14 }}>
              {displayMessage("Member")}:
            </Typography>
          </Grid>
          <Grid item xs={3} sx={{ p: -0.5 }} >
            <Button data-testid="memberDropDown" onClick={handleMemberClick} sx={{ textTransform: "none", width: "100%", height: "100%", bgcolor: "#FFFFFF", color: "black" }} endIcon={<ArrowDropDownIcon size="small" style={{ color: "black", position: "absolute", right: "5px", top: "25%" }} />}>
              <Typography style={{ fontSize: 14, width: "100%", textAlign: "left" }}>{membersData[selectedMemberIndex]}</Typography>
            </Button>
            <Menu anchorEl={memberDd} open={openMember} onClose={handleMemberClose} TransitionComponent={Fade}>
              {membersData.map((task, index) => (
                <MenuItem key={task} selected={index === selectedMemberIndex} onClick={(event) => handleMemberItemClick(event, index)}>
                  {task}
                </MenuItem>
              ))}
            </Menu>
          </Grid>

          <Grid item xs={2} sx={{ p: -0.5 }}>
            <Typography align="right" sx={{ pl: "8px", mt: "6px", fontSize: 14 }}>
              {displayMessage("Date Range")}:
            </Typography>
          </Grid>
          <Grid item xs={2} sx={{ p: -0.5 }}>
            <div style={{ fontSize: 14 }}>
              <LocalizationProvider style={{ fontSize: 14 }} dateAdapter={AdapterDayjs}>
                <DatePicker style={{ fontSize: 14 }} format="DD-MM-YYYY" sx={{ bgcolor: "#FFFFFF", "& .MuiInputBase-input": { padding: "8px" }, width: "100%" }} inputFormat="dd/MM/yyyy" value={dateFrom} onChange={handleDateFromChange} />
              </LocalizationProvider>
            </div>
          </Grid>
          <Grid item xs={2} sx={{ p: -0.5 }}>
            <div>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker format="DD-MM-YYYY" sx={{ bgcolor: "#FFFFFF", "& .MuiInputBase-input": { padding: "8px" }, width: "100%" }} inputFormat="MM/DD/yyyy" value={dateTo} onChange={handleDateToChange} />
              </LocalizationProvider>
            </div>
          </Grid>
        </Grid>
      </Box>

      {/* table */}
      <div>
        <Grid container sx={{ bgcolor: "#353A40", color: "#FFFFFF", m: "0px" }} spacing={1}>
          <Grid item sx={{ mt: "0px", mb: "5px" }} xs={1}>
            <Typography style={{ fontSize: 14, display: "inline", alignItems: "center" }}>{displayMessage("Action")} </Typography>
            <Button data-testid="Action"
              size="small"
              onClick={() => {
                dispatch(setMode("createRecord"));
                dispatch(clearRecordData());
                dispatch(setRecordId(""));
                dispatch(setMessage(""));
                dispatch(setStatusCode(""));
                navigate("/project-record");
              }}
            >
              <AddCircleIcon sx={{ color: "yellow", fontSize: "18px", position: "relative", left: "-20px" }} />
            </Button>
          </Grid>
          <Grid item xs={2} sx={{ mt: "0px", mb: "5px" }}>
            <Typography style={{ fontSize: 14 }}>{displayMessage("Name")}</Typography>
          </Grid>
          <Grid item xs={1} sx={{ mt: "0px", mb: "5px" }}>
            <Typography style={{ fontSize: 14 }}>{displayMessage("Date")}</Typography>
          </Grid>
          <Grid item xs={2} sx={{ mt: "0px", mb: "5px" }}>
            <Typography style={{ fontSize: 14 }}>{displayMessage("Project")}</Typography>
          </Grid>
          <Grid item xs={2} sx={{ mt: "0px", mb: "5px" }}>
            <Typography style={{ fontSize: 14 }}>{displayMessage("Task")}</Typography>
          </Grid>
          <Grid item xs={1} sx={{ mt: "0px", mb: "5px" }}>
            <Typography style={{ fontSize: 14 }}>{displayMessage("Time From")}</Typography>
          </Grid>
          <Grid item xs={1} sx={{ mt: "0px", mb: "5px" }}>
            <Typography style={{ fontSize: 14 }}>{displayMessage("Time To")}</Typography>
          </Grid>
          <Grid item xs={1} sx={{ mt: "0px", mb: "5px" }}>
            <Typography style={{ fontSize: 14 }}>{displayMessage("Total Time")}</Typography>
          </Grid>
          <Grid item xs={1} sx={{ mt: "0px", mb: "5px" }}>
            <Typography style={{ fontSize: 14 }}>{displayMessage("Notes")}</Typography>
          </Grid>
        </Grid>
      </div>
      {recordsList && (
        <div>
          {recordsList.data.dataRecords ? (
            <div>
              {(() => {
                const arr = [];
                let currMember;
                Object.keys(recordsList.data.dataRecords).forEach((i) => {
                  currMember = recordsList.data.dataRecords[i].personName;

                  Object.keys(recordsList.data.dataRecords[i].subgroups).forEach((recordDate) => {
                    recordsList.data.dataRecords[i].subgroups[recordDate].forEach((individualRecord) => {
                      // ind comp here white
                      arr.push(<ListItem record={individualRecord} key={individualRecord.recordId} />);
                    });
                    //   grey band here
                    arr.push(
                      <Grid key={currMember + recordDate} container columnSpacing={1} sx={{ m: 0, bgcolor: "#6C757D", color: "#FFFFFF" }}>
                        <Grid item xs={10} sx={{ pt: 0.5 }}>
                          <Typography style={{ fontSize: 14 }} align="right">
                            Total for {currMember} on {dayjs(recordDate).format('DD-MM-YYYY')} :{" "}
                          </Typography>
                        </Grid>
                        <Grid item xs={2} sx={{ pt: 0.5 }}>
                          <Typography sx={{ pl: "8px", fontSize: 14 }}>
                            {recordsList.data.memberSum[currMember][recordDate]}
                          </Typography>
                        </Grid>
                      </Grid>
                    );
                  });
                  // yellow band here => memberTotalSum
                  arr.push(
                    <Grid key={currMember} container columnSpacing={1} sx={{ m: 0, bgcolor: "#FFC107" }}>
                      <Grid item xs={10} sx={{ pt: 0.5 }}>
                        <Typography style={{ fontSize: 14 }} align="right">
                          {" "}
                          Total for {currMember} :{" "}
                        </Typography>
                      </Grid>
                      <Grid item xs={2} sx={{ pt: 0.5 }}>
                        <Typography sx={{ pl: "8px", fontSize: 14 }}>
                          {recordsList.data.memberTotalSum[currMember]}
                        </Typography>
                      </Grid>
                    </Grid>
                  );
                });
                return arr;
              })()}
            </div>
          ) : (
            <div></div>
          )}
        </div>
      )}
      <Typography data-testid="message" style={{ fontSize: "25px", marginTop: "15px", color: "red"}} align="center" variant="h2">
        {displayMessage(message)}
      </Typography>
    </div>
  );
};

export default ListPage;
