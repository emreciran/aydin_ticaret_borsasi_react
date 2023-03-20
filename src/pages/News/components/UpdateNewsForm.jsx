import { Box, FormLabel, Grid, Button, TextField } from "@mui/material";
import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { LoadingButton } from "@mui/lab";
import useToast from "../../../hooks/useToast";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

const UpdateNewsForm = ({ data, setOpen }) => {
  const axiosPrivate = useAxiosPrivate();
  const [loading, setLoading] = useState(false);
  const [_showToast] = useToast();

  const [title, setTitle] = useState(data?.title);
  const [details, setDetails] = useState(data?.details);
  const [image, setImage] = useState(data?.imageName);

  const handleFile = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <Box component="form" noValidate>
      <Grid container>
        <Grid item sm={12} style={{ marginBottom: 25 }}>
          <TextField
            variant="standard"
            fullWidth
            label="Başlık"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            id="title"
            required
          />
        </Grid>
        <Grid item sm={12}>
          <FormLabel>Haber Detay</FormLabel>
          <ReactQuill
            theme="snow"
            value={details}
            onChange={setDetails}
            style={{ height: "200px" }}
          />
        </Grid>
        <Grid item>
          <Box display="flex" flexDirection="column" style={{ marginTop: 80 }}>
            <FormLabel htmlFor="ImageFile" style={{ marginBottom: 10 }}>
              Haber Görseli
            </FormLabel>
            {image != null && (
              <img
                src={`https://localhost:7203/Images/${image}`}
                alt=""
                width="100%"
              />
            )}
            <input
              type="file"
              name="ImageFile"
              id="ImageFile"
              accept="image/*"
              onChange={(e) => handleFile(e)}
            />
          </Box>
        </Grid>
      </Grid>
      <Box sx={{ marginTop: 5 }}>
        <Button
          sx={{ marginRight: 1 }}
          variant="outlined"
          color="error"
          onClick={() => setOpen(false)}
        >
          İptal
        </Button>
        <LoadingButton
          type="submit"
          variant="contained"
          loading={loading}
          loadingIndicator="Loading…"
        >
          <span>Oluştur</span>
        </LoadingButton>
      </Box>
    </Box>
  );
};

export default UpdateNewsForm;
