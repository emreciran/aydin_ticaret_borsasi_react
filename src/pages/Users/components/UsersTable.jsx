import React, { useState } from "react";
import { Box, Tooltip, Typography } from "@mui/material";
import {
  DataGrid,
  GridToolbar,
  GridActionsCellItem,
  trTR,
} from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import Popup from "../../../components/Popup";
import UpdateUserForm from "./UpdateUserForm";
import CustomNoRowsOverlay from "../../../components/CustomNoRowsOverlay";

const UsersTable = ({ pageState, setPageState, getUsers }) => {
  const [open, setOpen] = useState(false);

  const [rowSelectionModel, setRowSelectionModel] = useState();

  const columns = [
    { field: "id", headerName: "#" },
    { field: "name", headerName: "Adı" },
    { field: "surname", headerName: "Soyadı" },
    { field: "email", headerName: "Email" },
    { field: "username", headerName: "Kullanıcı Adı" },
    {
      field: "status",
      headerName: "Durumu",
      type: "singleSelect",
      valueOptions: [
        { value: true, label: "Aktif" },
        { value: false, label: "Pasif" },
      ],
      editable: true,
      renderCell: ({ row }) => {
        return (
          <Tooltip title="Güncellemek için çift tıklayınız.">
            <Box
              width="100%"
              m="0 auto"
              p="5px"
              display="flex"
              justifyContent="center"
              alignItems="center"
              borderRadius="4px"
              sx={{
                cursor: "pointer",
                backgroundColor: row.status === true ? "#5D9C59" : "#FC2947",
              }}
            >
              <Typography color="#fff">
                {row.status === true ? "Aktif" : "Pasif"}
              </Typography>
            </Box>
          </Tooltip>
        );
      },
    },
    { field: "createdDate", headerName: "Oluşturma Zamanı" },
    {
      field: "update",
      headerName: "Güncelle",
      renderCell: () => {
        return (
          <>
            <GridActionsCellItem
              icon={<EditIcon />}
              label="Güncelle"
              style={{ margin: "0 auto" }}
              onClick={() => {
                setOpen(true);
              }}
            />
            <Popup
              open={open}
              setOpen={setOpen}
              title={`#${rowSelectionModel?.id} Kullanıcı Güncelle`}
            >
              <UpdateUserForm data={rowSelectionModel} setOpen={setOpen} getUsers={getUsers} />
            </Popup>
          </>
        );
      },
    },
  ];

  const rows = pageState?.data
    ? pageState?.data.map((row) => ({
        id: row.useR_ID,
        name: row.name,
        surname: row.surname,
        email: row.email,
        username: row.username,
        status: row.status,
        createdDate: row.createdDate,
      }))
    : "";

  return (
    <Box width="100%">
      <DataGrid
        autoHeight
        slots={{
          toolbar: GridToolbar,
          noRowsOverlay: CustomNoRowsOverlay,
        }}
        rows={rows}
        rowCount={pageState.total}
        loading={pageState.isLoading}
        pagination
        page={pageState.page - 1}
        pageSize={pageState.pageSize}
        onCellEditStop={() => console.log("dsasad")}
        getRowId={(row) => row.id}
        hideFooterSelectedRowCount
        onRowSelectionModelChange={(ids) => {
          const selectedIDs = new Set(ids);
          const selectedRowData = rows.filter((row) => selectedIDs.has(row.id));
          setRowSelectionModel(selectedRowData[0]);
        }}
        paginationMode="server"
        pageSizeOptions={[5, 10, 25]}
        onPaginationModelChange={(newPage) => {
          setPageState((old) => ({
            ...old,
            page: newPage.page + 1,
            pageSize: newPage.pageSize,
          }));
        }}
        localeText={trTR.components.MuiDataGrid.defaultProps.localeText}
        columns={columns}
        initialState={{
          pagination: { paginationModel: { pageSize: pageState.pageSize } },
          sorting: {
            sortModel: [{ field: "id", sort: "desc" }],
          },
        }}
      />
    </Box>
  );
};

export default UsersTable;
