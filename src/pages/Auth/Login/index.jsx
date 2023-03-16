import React, { useState } from "react";
import { TextField, Grid, Box, Typography } from "@mui/material";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import LoadingButton from "@mui/lab/LoadingButton";
import Logo from "../../../assets/logo-atb.png";
import useToast from "../../../hooks/useToast";
import { Formik } from "formik";
import { LoginUser } from "../../../api/Auth";
import { useDispatch } from "react-redux";
import { LoginSchema } from "../../../validations/LoginSchema";
import { login } from "../../../redux/slices/auth";
import ErrorMessage from "../../../components/ErrorMessage";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const [_showToast] = useToast();

  const navigate = useNavigate();

  const initialValues = {
    email,
    password,
  };

  const handleFormSubmit = async (values) => {
    try {
      setLoading(true);
      const response = await LoginUser(values);
      dispatch(login(response.data.authResult.token));
      navigate("/");
    } catch (error) {
      console.log(error);
      setLoading(false);
      _showToast.showError(error.response ? error.response.data.message : error.message);
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
      <img src={Logo} alt="" width={250} />

      <Typography component="h1" variant="h5" marginTop={5}>
        Giriş
      </Typography>
      <Formik
        initialValues={initialValues}
        onSubmit={handleFormSubmit}
        validationSchema={LoginSchema}
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
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 1 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  margin="normal"
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
                  margin="normal"
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
            </Grid>
            <LoadingButton
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              loading={loading}
              disabled={!dirty || isSubmitting}
              loadingIndicator="Loading…"
            >
              <span>Giriş</span>
            </LoadingButton>
            <Grid container justifyContent="space-between">
              <Grid item>
                <Link to="/auth/forgot_password" style={{ color: "#1976d2" }}>
                  Şifremi Unuttum
                </Link>
              </Grid>
              <Grid item>
                <Link to="/auth/register" style={{ color: "#1976d2" }}>
                  Hesabınız yok mu? Kayıt Ol
                </Link>
              </Grid>
            </Grid>
          </Box>
        )}
      </Formik>
    </Box>
  );
};

export default Login;
