import React, { useState } from "react";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Box from "@mui/material/Box";
import ProfileUserInfo from "./ProfileUserInfo";
import ProfileNotifications from "./ProfileNotifications";

const ProfileTabs = () => {
  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <TabContext value={value}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <TabList
          onChange={handleChange}
          aria-label="lab API tabs example"
          centered
        >
          <Tab label="Bilgiler" value="1" />
          <Tab label="Bildirim" value="2" />
        </TabList>
      </Box>
      <TabPanel value="1">
        <ProfileUserInfo />
      </TabPanel>
      <TabPanel value="2">
        <ProfileNotifications />
      </TabPanel>
    </TabContext>
  );
};

export default ProfileTabs;
