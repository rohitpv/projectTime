import React from "react";
import { useState, useRef, useEffect } from "react";
import Fade from "@mui/material/Fade";
import { Grid, Typography } from "@mui/material";
import { Popover, Button, Menu, MenuItem } from "@mui/material";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import ImportContactsIcon from "@mui/icons-material/ImportContacts";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setMode, getRecordData, setMessage } from "../slices/ProjectTimeSlice";
import dayjs from "dayjs";
import { displayMessage } from "../App";

const ListItem = ({ record }) => {
  const dispatch = useDispatch();
  // fetch reference data
  let projData = useSelector((state) => state.projData);
  let taskData = useSelector((state) => state.taskData);

  const { paramId, action } = useParams();
  const navigate = useNavigate();
  const [Action, setAction] = useState(null);
  const openAction = Boolean(Action);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleActionClick = (event) => {
    setAction(event.currentTarget);
  };

  const handleActionClose = (mode, id) => {
    setAction(null);

    if (id != "backdropClick") {
      // for disabling fields in details page
      dispatch(setMode(mode));
      // send record data as formpage data to store
      dispatch(getRecordData(id));

      navigate("/project-record/" + id);
    }
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  return (
    <Grid data-testid="listitem" container sx={{ m: "0px", mt: "0px", bgcolor: "#FFFFFF" }} columnSpacing={1} size="small">
      <Grid item xs={1}>
        <Button sx={{ pt: "8px" }} data-testid="detailsMenu" onClick={handleActionClick} endIcon={<ArrowDropDownIcon size="small" style={{ color: "blue" }} />}>
          <Typography variant="button" style={{ color: "GrayText", fontSize: 14 }} sx={{ textTransform: "none" }}>
            <ImportContactsIcon style={{ color: "purple", fontSize: 20 }} />
          </Typography>
        </Button>
        <Menu MenuListProps={{ "aria-labelledby": "fade-button" }} anchorEl={Action} open={openAction} onClose={handleActionClose} TransitionComponent={Fade}>
          <MenuItem data-testid="viewMenu"
            onClick={() => {
              dispatch(setMessage(""));
              handleActionClose("viewRecord", record.recordId);
            }}
          >
            <VisibilityIcon style={{ color: "darkblue" }} /> &nbsp;{displayMessage("View")}
          </MenuItem>
          <MenuItem data-testid="editMenu"
            onClick={() => {
              dispatch(setMessage(""));
              handleActionClose("editRecord", record.recordId);
            }}
          >
            <EditNoteIcon style={{ color: "red" }} /> &nbsp;{displayMessage("Edit")}
          </MenuItem>
        </Menu>
      </Grid>
      <Grid item xs={2}>
        <Typography style={{ fontSize: 14 }} sx={{ p: "8px", pl: "0px" }}>
          {record.personName}{" "}
        </Typography>
      </Grid>
      <Grid item xs={1}>
        <Typography style={{ fontSize: 14 }} sx={{ p: "8px", pl: "0px" }}>
          {dayjs(record.clockDate).format('DD-MM-YYYY')}{" "}
        </Typography>
      </Grid>
      <Grid item xs={2}>
        <Typography style={{ fontSize: 14 }} sx={{ p: "8px", pl: "0px" }}>
          {projData[record.projectName]}{" "}
        </Typography>
      </Grid>
      <Grid item xs={2}>
        <Typography style={{ fontSize: 14 }} sx={{ p: "8px", pl: "0px" }}>
          {taskData[record.taskName]}{" "}
        </Typography>
      </Grid>
      <Grid item xs={1}>
        <Typography style={{ fontSize: 14 }} sx={{ p: "8px", pl: "0px" }}>
          {record.timeFrom}{" "}
        </Typography>
      </Grid>
      <Grid item xs={1}>
        <Typography style={{ fontSize: 14 }} sx={{ p: "8px", pl: "0px" }}>
          {record.timeTo}{" "}
        </Typography>
      </Grid>
      <Grid item xs={1}>
        <Typography style={{ fontSize: 14 }} sx={{ p: "8px" }}>
          {record.totalTime}{" "}
        </Typography>
      </Grid>
      <Grid item xs={1}>
        <Button aria-describedby={id} onClick={handleClick} sx={{ p: "8px", pl: "0px" }}>
          <ChatBubbleOutlineOutlinedIcon sx={{ color: "#0000F9", position:"relative", left:"-10px" }} style={{ fontSize: 20 }} />
        </Button>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
        >
          <Typography sx={{ p: "8px" }}>{record.taskNote}</Typography>
        </Popover>
      </Grid>
    </Grid>
  );
};

export default ListItem;
