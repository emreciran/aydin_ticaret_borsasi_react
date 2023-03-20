import React, { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useToast from "../../hooks/useToast";
import { useNavigate } from "react-router-dom";
import NewsTable from "./components/NewsTable";
import Swal from "sweetalert2";

const News = () => {
  const axiosPrivate = useAxiosPrivate();
  const [pageState, setPageState] = useState({
    isLoading: false,
    data: [],
    total: 0,
    page: 1,
    pageSize: 5,
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
        `/news?page=${pageState.page}&limit=${pageState.pageSize}`
      );

      if (response.data != null) {
        setPageState((old) => ({
          ...old,
          isLoading: false,
          data: response.data.news,
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

  const DeleteNews = async (id) => {
    try {
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton:
            "border border-green-500 bg-green-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-green-600 focus:outline-none focus:shadow-outline",
          cancelButton:
            "border border-red-500 bg-red-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-red-600 focus:outline-none focus:shadow-outline",
        },
      });

      swalWithBootstrapButtons
        .fire({
          title: "Emin misin?",
          text: "",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Evet, sil!",
          cancelButtonText: "Hayır, iptal et!",
          reverseButtons: true,
        })
        .then(async (result) => {
          if (result.isConfirmed) {
            await axiosPrivate.delete(`/news/${id}`);
            await getData();
            swalWithBootstrapButtons.fire(
              "Silindi!",
              "Haber başarıyla silindi!",
              "success"
            );
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            swalWithBootstrapButtons.fire(
              "İptal edildi!",
              "Haber silinmedi!",
              "error"
            );
          }
        });
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
          Son Haberler
        </Typography>
        <Box display="flex" alignItems="center" justifyContent="center">
          <Button
            variant="outlined"
            endIcon={<AddCircleIcon />}
            onClick={() => navigate("/haber/yeni")}
          >
            Yeni Haber
          </Button>
        </Box>
      </Box>
      <NewsTable
        pageState={pageState}
        setPageState={setPageState}
        DeleteNews={DeleteNews}
      />
    </>
  );
};

export default News;
