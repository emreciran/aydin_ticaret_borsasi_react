import React, { useState } from "react";
import { Box } from "@mui/material";
import {
  DataGrid,
  GridToolbar,
  GridActionsCellItem,
  trTR,
} from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Popup from "../../../components/Popup";
import UpdateAnnouncementForm from "./UpdateAnnouncementForm";
import CustomNoRowsOverlay from "../../../components/CustomNoRowsOverlay";

const AnnouncementTable = ({
  pageState,
  setPageState,
  DeleteAnnouncement,
  getAnnouncement,
}) => {
  const [open, setOpen] = useState(false);

  const [rowSelectionModel, setRowSelectionModel] = useState();

  const columns = [
    { field: "id", headerName: "#" },
    { field: "title", headerName: "Duyuru Başlığı" },
    { field: "link", headerName: "Duyuru Linki" },
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
              title={`#${rowSelectionModel?.id} Duyuru Güncelle`}
            >
              <UpdateAnnouncementForm
                data={rowSelectionModel}
                setOpen={setOpen}
                getAnnouncement={getAnnouncement}
              />
            </Popup>
          </>
        );
      },
    },
    {
      field: "delete",
      headerName: "Sil",
      renderCell: (params) => {
        return (
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Sil"
            onClick={() => DeleteAnnouncement(params.id)}
          />
        );
      },
    },
  ];

  const rows = pageState?.data
    ? pageState?.data.map((row) => ({
        id: row.id,
        title: row.title,
        link: row.link,
        details: row.details,
        imageName: row.imageName,
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

export default AnnouncementTable;
