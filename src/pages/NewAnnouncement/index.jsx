import {
  Box,
  FormLabel,
  Grid,
  Button,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import useToast from "../../hooks/useToast";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import moment from "moment";

const NewAnnouncement = () => {
  const axiosPrivate = useAxiosPrivate();
  const [loading, setLoading] = useState(false);
  const [_showToast] = useToast();

  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [details, setDetails] = useState("");
  const [image, setImage] = useState("");

  const navigate = useNavigate();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const createdDate = moment().format("DD/MM/YYYY");
      setLoading(true);
      const formData = new FormData();

      formData.append("Title", title);
      formData.append("Link", link);
      formData.append("Details", details);
      formData.append("ImageFile", image);
      formData.append("CreatedDate", createdDate);

      await axiosPrivate.post("/announcements", formData);
      _showToast.showSuccess("Yeni duyuru oluşturuldu!");
      navigate("/duyuru");
    } catch (error) {
      setLoading(false);
      _showToast.showError("error", error.response.data.message);
    }
  };

  const handleFile = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        marginBottom={3}
      >
        <Typography component="h1" variant="h4">
          Yeni Duyuru
        </Typography>
      </Box>
      <Box component="form" noValidate onSubmit={handleFormSubmit}>
        <Grid container>
          <Grid item sm={12} style={{ marginBottom: 27 }}>
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
          <Grid item sm={12} style={{ marginBottom: 27 }}>
            <TextField
              variant="standard"
              fullWidth
              label="Link"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              id="link"
              required
            />
          </Grid>
          <Grid item sm={12}>
            <FormLabel>Duyuru Detay</FormLabel>
            <ReactQuill
              theme="snow"
              value={details}
              onChange={setDetails}
              style={{ height: "300px" }}
            />
          </Grid>
          <Grid item>
            <Box
              display="flex"
              flexDirection="column"
              style={{ marginTop: 80 }}
            >
              <FormLabel htmlFor="ImageFile" style={{ marginBottom: 10 }}>
                Duyuru Görseli
              </FormLabel>
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
            onClick={() => navigate("/duyuru")}
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
    </>
  );
};

export default NewAnnouncement;
