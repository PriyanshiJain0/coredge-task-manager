import { ChangeEvent, SyntheticEvent, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signUpSchema } from "../schemas/authSchema";
import { ValidationError } from "yup";
import { addUser } from "../utils";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";

const initUser = {
  username: "",
  email: "",
  password: "",
};

const SignUp = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(initUser);
  const [errors, setErrors] = useState(initUser);

  const onChangeHandler = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = target;
    const user = { ...userInfo, [name]: value };
    setUserInfo(user);
  };

  const resetErrors = () => {
    setErrors(initUser);
  };

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    resetErrors();

    const isvalid = await signUpSchema.isValid(userInfo, { abortEarly: false });
    if (isvalid) {
      const hasUser = await addUser(userInfo);
      if (hasUser.error) {
        const newErr = { ...errors, ...hasUser };
        setErrors(newErr);
      } else {
        navigate("/");
      }
      return;
    }

    signUpSchema.validate(userInfo, { abortEarly: false }).catch((err: any) => {
      const errors = err.inner.reduce((acc: any, error: ValidationError) => {
        return {
          ...acc,
          [error.path as string]: error.message,
        };
      }, {});

      setErrors(errors);
    });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            onChange={onChangeHandler}
            helperText={errors.username}
            error={!!errors.username}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            onChange={onChangeHandler}
            helperText={errors.email}
            error={!!errors.email}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            onChange={onChangeHandler}
            helperText={errors.password}
            error={!!errors.password}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container>
            <Grid item>
              <Link href="/signin" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
    </Container>
  );
};

export default SignUp;
