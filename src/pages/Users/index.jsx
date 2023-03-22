import { Box, Typography, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useToast from "../../hooks/useToast";
import UsersTable from "./components/UsersTable";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import Popup from "../../components/Popup";
import NewUser from "./components/NewUser";

const Users = () => {
  const axiosPrivate = useAxiosPrivate();
  const [open, setOpen] = useState(false);

  const [pageState, setPageState] = useState({
    isLoading: false,
    data: [],
    total: 0,
    page: 1,
    pageSize: 5,
  });

  const [_showToast] = useToast();

  const getUsers = async () => {
    try {
      setPageState((old) => ({
        ...old,
        isLoading: true,
      }));

      const response = await axiosPrivate.get(
        `/users?page=${pageState.page}&limit=${pageState.pageSize}`
      );

      if (response.data != null) {
        setPageState((old) => ({
          ...old,
          isLoading: false,
          data: response.data.users,
          total: response.data.total,
        }));
      }
    } catch (error) {
      setPageState((old) => ({
        ...old,
        isLoading: false,
      }));
      _showToast.showError(
        error.response ? error.response.data.message : error.message
      );
    }
  };

  useEffect(() => {
    getUsers();
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
          Kullanıcılar
        </Typography>
        <Box display="flex" alignItems="center" justifyContent="center">
          <Button
            variant="outlined"
            endIcon={<AddCircleIcon />}
            onClick={() => setOpen(true)}
          >
            Yeni Kullanıcı
          </Button>
          <Popup open={open} setOpen={setOpen} title={"Yeni Kullanıcı"}>
            <NewUser setOpen={setOpen} getUsers={getUsers} />
          </Popup>
        </Box>
      </Box>
      <UsersTable
        pageState={pageState}
        setPageState={setPageState}
        getUsers={getUsers}
      />
    </>
  );
};

export default Users;
