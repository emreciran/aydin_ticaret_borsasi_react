import React, { useState } from "react";
import { TextField, Grid, Box, Typography } from "@mui/material/";
import LoadingButton from "@mui/lab/LoadingButton";
import Logo from "../../../assets/logo-atb.png";
import { Link, useNavigate } from "react-router-dom";
import { RegisterUser } from "../../../api/Auth";
import { RegisterSchema } from "../../../validations/RegisterSchema";
import ErrorMessage from "../../../components/ErrorMessage";
import useToast from "../../../hooks/useToast";
import { Formik } from "formik";

const Register = () => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [_showToast] = useToast();

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const initialValues = {
    name,
    surname,
    email,
    username,
    password,
    confirmPassword,
  };

  const handleFormSubmit = async (values) => {
    try {
      setLoading(true);
      await RegisterUser(values);
      _showToast.showSuccess("Kullanıcı oluşturuldu!")
      navigate("/auth/login");
    } catch (error) {
      if (error) {
        setLoading(false);
        _showToast.showError(error.response ? error.response.data.message : error.message);
      }
    }
  };

  return (
    <Box
      sx={{
        marginTop: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <img src={Logo} alt="" width={250} style={{marginBottom: "10px"}} />

      <Typography component="h1" variant="h5">
        Kayıt Ol
      </Typography>
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={RegisterSchema}
      >
        {({
          values,
          errors,
          handleSubmit,
          touched,
          handleChange,
          dirty,
          isSubmitting,
        }) => (
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="Adı"
                  onChange={handleChange}
                />
                {errors.name && touched.name && (
                  <ErrorMessage error={errors.name} />
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="surname"
                  label="Soyadı"
                  name="surname"
                  onChange={handleChange}
                />
                {errors.surname && touched.surname && (
                  <ErrorMessage error={errors.surname} />
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="username"
                  label="Kullanıcı adı"
                  name="username"
                  onChange={handleChange}
                />
                {errors.username && touched.username && (
                  <ErrorMessage error={errors.username} />
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  onChange={handleChange}
                />
                {errors.email && touched.email && (
                  <ErrorMessage error={errors.email} />
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  onChange={handleChange}
                />
                {errors.password && touched.password && (
                  <ErrorMessage error={errors.password} />
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  id="confirmPassword"
                  onChange={handleChange}
                />
                {errors.confirmPassword && touched.confirmPassword && (
                  <ErrorMessage error={errors.confirmPassword} />
                )}
              </Grid>
            </Grid>
            <LoadingButton
              type="submit"
              fullWidth
              variant="contained"
              disabled={!dirty || isSubmitting}
              sx={{ mt: 3, mb: 2 }}
              loading={loading}
              loadingIndicator="Loading…"
            >
              <span>Kayıt Ol</span>
            </LoadingButton>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/auth/login" style={{ color: "#1976d2" }}>
                  Zaten hesabınız var mı? Giriş yap
                </Link>
              </Grid>
            </Grid>
          </Box>
        )}
      </Formik>
    </Box>
  );
};

export default Register;
