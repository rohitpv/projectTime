import React from "react";
import { useState, useRef, useEffect } from "react";
import project_time_logo from "../assets/project_time_logo.svg";
import { AppBar, Toolbar, Stack, Box, Button, Typography, Popper, Menu, MenuItem, MenuList } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted"; //SportsFootball
import dayjs from "dayjs";
import SportsFootballIcon from "@mui/icons-material/SportsFootball"; //BeachAccessIcon
import BeachAccessIcon from "@mui/icons-material/BeachAccess"; //AccountTreeIcon
import AccountTreeIcon from "@mui/icons-material/AccountTree"; //MonetizationOnIcon
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import SettingsIcon from "@mui/icons-material/Settings";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import PersonIcon from "@mui/icons-material/Person";
import Fade from "@mui/material/Fade";
import Divider from "@mui/material/Divider";
import LogoutIcon from "@mui/icons-material/Logout";
import PermContactCalendarIcon from "@mui/icons-material/PermContactCalendar";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PeopleIcon from "@mui/icons-material/People";
import TimerIcon from "@mui/icons-material/Timer";
import PaymentIcon from "@mui/icons-material/Payment";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import { setFilterQuery, setMode } from "../slices/ProjectTimeSlice";
import { displayMessage } from "../App";

import { useSelector, useDispatch } from "react-redux";

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [settingsDd, setSettings] = useState(null);
  const [resourses, setResourses] = useState(null);
  const [userDd, setUserDd] = useState(null);
  const openSettings = Boolean(settingsDd);
  const openResourses = Boolean(resourses);
  const openUser = Boolean(userDd);

  const handleSettingsClick = (event) => {
    setSettings(event.currentTarget);
  };

  const handleSettingsClose = () => {
    setSettings(null);
  };

  const handleResoursesClick = (event) => {
    setResourses(event.currentTarget);
  };

  const handleResoursesClose = () => {
    setResourses(null);
  };

  const handleUserClick = (event) => {
    setUserDd(event.currentTarget);
  };

  const handleUserClose = () => {
    setUserDd(null);
  };

  return (
    <>
      <Toolbar>
        <Stack direction="row" spacing={1} sx={{ width: 1 }} style={{ display: "flex", paddingLeft: "0px" }}>
          <Box component="span" sx={{ pl: 0, pt: 0 }}>
            <img height="35" width="160" src={project_time_logo} />
          </Box>
          <Button variant="text" size="medium" sx={{ "& .MuiButton-startIcon": { margin: "3px" } }} startIcon={<HomeIcon sx={{ pl: "8px", pb: 0.5, mr: "0px", color: "primary" }} />}>
            <Typography data-testid="clockTime" variant="button" style={{ color: "GrayText", fontSize: 14, textTransform: "none" }}>
              {displayMessage("Clock Time")}
            </Typography>
          </Button>

          <Button data-testid="timelog" variant="text" size="medium" sx={{ "& .MuiButton-startIcon": { margin: "3px" } }} style={{ border: "none", outline: "none" }} startIcon={<FormatListBulletedIcon style={{ color: "green", marginRight: "0px" }} />}>
            <Typography variant="button" style={{ color: "GrayText", fontSize: 14, textTransform: "none" }}>
              {displayMessage("Timelog")}
            </Typography>
          </Button>

          <Button data-testid="vacation" variant="text" color="inherit" size="small" sx={{ "& .MuiButton-startIcon": { margin: "3px" } }} style={{ border: "none", outline: "none" }} startIcon={<SportsFootballIcon style={{ color: "brown" }} />}>
            <Typography variant="button" style={{ color: "GrayText", fontSize: 14, textTransform: "none" }}>
              {displayMessage("Vacation")}
            </Typography>
          </Button>

          <Button data-testid="Holiday" variant="text" size="medium" sx={{ "& .MuiButton-startIcon": { margin: "3px" } }} style={{ border: "none", outline: "none" }} startIcon={<BeachAccessIcon style={{ color: "maroon" }} />}>
            <Typography variant="button" style={{ color: "GrayText", fontSize: 14, textTransform: "none" }}>
              {displayMessage("Holiday")}
            </Typography>
          </Button>

          <Button data-testid="projectTime"
            onClick={() => {
              dispatch(setMode("redirectToHome"));
              dispatch(
                setFilterQuery({
                  selectedProjectIndex: 0,
                  selectedMemberIndex: 0,
                  dateFrom: dayjs("2000-01-01"),
                  dateTo: dayjs("2099-12-31"),
                })
              );
              navigate("/");
            }}
            variant="text"
            size="medium"
            sx={{ "& .MuiButton-startIcon": { margin: "3px" } }}
            style={{ border: "none", outline: "none" }}
            startIcon={<AccountTreeIcon style={{ color: "green" }} />}
          >
            <Typography variant="button" style={{ color: "GrayText", fontSize: 14, textTransform: "none" }}>
              {displayMessage("Project Time")}
            </Typography>
          </Button>

          <Button data-testid="timeSummary" variant="text" size="medium" sx={{ "& .MuiButton-startIcon": { margin: "3px" } }} style={{ border: "none", outline: "none" }} startIcon={<MonetizationOnIcon style={{ color: "darkred" }} />}>
            <Typography variant="button" style={{ color: "GrayText", fontSize: 14, textTransform: "none" }}>
              {displayMessage("Time Summary")}
            </Typography>
          </Button>

          <Button
            variant="text"
            sx={{ "& .MuiButton-startIcon": { margin: "3px" } }}
            style={{ border: "none", outline: "none" }}
            aria-controls={openSettings ? "fade-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={openSettings ? "true" : undefined}
            onClick={handleSettingsClick}
            startIcon={<SettingsIcon style={{ color: "darkturquoise" }} />}
            endIcon={<ArrowDropDownIcon size="small" style={{ color: "black" }} />}
          >
            <Typography variant="button" sx={{ textTransform: "none", mr: 0, color: "GrayText", fontSize: 14 }}>
              {displayMessage("Settings")}
            </Typography>
          </Button>
          <Menu MenuListProps={{ "aria-labelledby": "fade-button" }} anchorEl={settingsDd} open={openSettings} onClose={handleSettingsClose} TransitionComponent={Fade}>
            <MenuItem onClick={handleSettingsClose}>
              <PaymentIcon size="small" style={{ color: "green" }} />
              &nbsp;{displayMessage("Pay periods")}
            </MenuItem>
            <MenuItem onClick={handleSettingsClose}>
              <TimerIcon size="small" style={{ color: "maroon" }} />
              &nbsp;{displayMessage("Pay Profile")}
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleSettingsClose}>
              <PeopleIcon size="small" style={{ color: "orange" }} />
              &nbsp;{displayMessage("Users")}
            </MenuItem>
            <MenuItem onClick={handleSettingsClose}>
              <LocationOnIcon size="small" style={{ color: "blue" }} />
              &nbsp;{displayMessage("Locations")}
            </MenuItem>
          </Menu>

          <Button
            variant="text"
            sx={{ "& .MuiButton-startIcon": { margin: "3px" } }}
            color="inherit"
            style={{ border: "none", outline: "none" }}
            aria-controls={openResourses ? "fade-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={openResourses ? "true" : undefined}
            onClick={handleResoursesClick}
            startIcon={<PermContactCalendarIcon style={{ color: " orange" }} />}
            endIcon={<ArrowDropDownIcon size="small" style={{ color: "black" }} />}
          >
            <Typography variant="button" sx={{ textTransform: "none", mr: 0, color: "GrayText", fontSize: 14 }}>
              {displayMessage("Human Resourses")}
            </Typography>
          </Button>
          <Menu MenuListProps={{ "aria-labelledby": "fade-button" }} anchorEl={resourses} open={openResourses} onClose={handleResoursesClose} TransitionComponent={Fade}>
            <MenuItem onClick={handleResoursesClose}>
              <PermContactCalendarIcon style={{ color: "blue" }} /> &nbsp;{displayMessage("Employee")}
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleResoursesClose}>
              <AccountCircleIcon style={{ color: "orange" }} /> &nbsp;{displayMessage("Review")}
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleResoursesClose}>
              <PersonAddAltIcon style={{ color: "purple" }} /> &nbsp;{displayMessage("Applicants")}
            </MenuItem>
          </Menu>

          <Button
            variant="text"
            sx={{ "& .MuiButton-startIcon": { margin: "3px" } }}
            size="small"
            style={{ border: "none", outline: "none", position: "absolute", right: "0px", top: "23%" }}
            flex={2}
            aria-controls={openUser ? "fade-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={openUser ? "true" : undefined}
            onClick={handleUserClick}
            startIcon={<PersonIcon style={{ color: "purple" }} />}
            endIcon={<ArrowDropDownIcon size="small" style={{ color: "black" }} />}
          >
            <Typography variant="button" style={{ color: "GrayText", fontSize: 14, textTransform: "none" }} >
              {displayMessage("Rohit Panchumarthy")}
            </Typography>
          </Button>
          <Menu MenuListProps={{ "aria-labelledby": "fade-button" }} anchorEl={userDd} open={openUser} onClose={handleUserClose} TransitionComponent={Fade}>
            <MenuItem onClick={handleUserClose}>
              <PersonIcon style={{ color: "purple" }} />
              <Typography variant="button" sx={{ textTransform: "none",fontSize: 14 }}>
                {displayMessage("Rohit Panchumarthy")}
              </Typography>
            </MenuItem>
            <MenuItem onClick={handleUserClose}>
              <PersonIcon style={{ color: "purple" }} />
              <Typography variant="button" sx={{ textTransform: "none",fontSize: 14 }}>
                {displayMessage("Change Password")}
              </Typography>
            </MenuItem>
            <MenuItem onClick={handleUserClose}>
              <PersonIcon style={{ color: "purple" }} />
              <Typography variant="button" sx={{ textTransform: "none",fontSize: 14  }}>
               {displayMessage("Change PassPhrase")}
              </Typography>
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleUserClose}>
              <LogoutIcon  style={{ color: "red" }} />
              <Typography variant="button" sx={{ textTransform: "none", fontSize: 14  }}>
                {displayMessage("Logout")}
              </Typography>
            </MenuItem>
          </Menu>
        </Stack>
      </Toolbar>
    </>
  );
}

export default Navbar;
