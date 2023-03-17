import React from "react";
import { Box } from "@mui/material";
import { DataGrid, GridToolbar, GridActionsCellItem } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Link } from "react-router-dom";

const AnnouncementTable = ({ pageState, setPageState }) => {
  const columns = [
    { field: "id", headerName: "#" },
    { field: "title", headerName: "Duyuru Başlığı" },
    { field: "createdDate", headerName: "Oluşturma Zamanı" },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      getActions: (params) => [
        <GridActionsCellItem icon={<DeleteIcon />} label="Sil" />,
        <Link to={`/duyuru/${params.id}`}>
          <GridActionsCellItem icon={<EditIcon />} label="Güncelle" />
        </Link>,
      ],
    },
  ];

  const rows = pageState.data
    ? pageState.data?.map((row) => ({
        id: row.id,
        title: row.title,
        createdDate: row.createdDate,
      }))
    : "";

  return (
    <Box width="100%">
      <DataGrid
        autoHeight
        components={{ Toolbar: GridToolbar }}
        rows={rows}
        rowCount={pageState.total}
        loading={pageState.isLoading}
        pagination
        page={pageState.page - 1}
        pageSize={pageState.pageSize}
        paginationMode="server"
        onPaginationModelChange={(newPage) =>
          setPageState((old) => ({ ...old, page: newPage + 1 }))
        }
        onPageSizeChange={(newPageSize) =>
          setPageState((old) => ({ ...old, pageSize: newPageSize }))
        }
        columns={columns}
        disableRowSelectionOnClick
        initialState={{
          pagination: { paginationModel: { pageSize: 5 } },
          sorting: {
            sortModel: [{ field: "id", sort: "desc" }],
          },
        }}
        pageSizeOptions={[5, 10, 25]}
      />
    </Box>
  );
};

export default AnnouncementTable;
