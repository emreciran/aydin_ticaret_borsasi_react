import React, { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useToast from "../../hooks/useToast";
import { useNavigate } from "react-router-dom";
import AnnouncementTable from "./components/AnnouncementTable";

const Announcement = () => {
  const axiosPrivate = useAxiosPrivate();
  const [announcements, setAnnouncement] = useState();

  const [pageState, setPageState] = useState({
    isLoading: false,
    data: [],
    total: 0,
    page: 1,
    pageSize: 10,
  });

  const navigate = useNavigate();

  const [_showToast] = useToast();

  const getData = async () => {
    try {
      setPageState((old) => ({
        ...old,
        isLoading: true,
      }));

      const response = await axiosPrivate.get(
        `/announcements?page=${pageState.page}&limit=${pageState.pageSize}`
      );
      setPageState((old) => ({
        ...old,
        isLoading: false,
        data: response.data,
        total: response.data.total,
      }));
    } catch (error) {
      _showToast.showError(
        error.response ? error.response.data.message : error.message
      );
    }
  };

  useEffect(() => {
    getData();
  }, [pageState.page, pageState.pageSize]);

  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        marginBottom={4}
      >
        <Typography component="h1" variant="h4">
          Son Duyurular
        </Typography>
        <Box display="flex" alignItems="center" justifyContent="center">
          <Button
            variant="outlined"
            endIcon={<AddCircleIcon />}
            onClick={() => navigate("/duyuru/yeni")}
          >
            Yeni Duyuru
          </Button>
        </Box>
      </Box>
      <AnnouncementTable pageState={pageState} setPageState={setPageState} />
    </>
  );
};

export default Announcement;
