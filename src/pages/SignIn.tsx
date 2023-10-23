import { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signInSchema } from "../schemas/authSchema";
import { ValidationError } from "yup";
import { signInUser } from "../utils";

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

import { addUser, selectUser } from "../slices/userSlice";

const initUser = {
  email: "",
  password: "",
};


const SignIn = () => {
  const isSignedin = useSelector(selectUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(initUser);
  const [errors, setErrors] = useState(initUser);

  const resetErrors = () => {
    setErrors(initUser);
  };

  useEffect(() => {
    if (isSignedin.email) {
      navigate("/");
    }
  }, [isSignedin]);

  const onChangeHandler = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = target;
    const user = { ...userInfo, [name]: value };
    setUserInfo(user);
  };

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();

    const isvalid = await signInSchema.isValid(userInfo, { abortEarly: false });
    if (isvalid) {
      resetErrors();
      console.log(userInfo);
      const hasUser = await signInUser(userInfo);
      if (hasUser.error) {
        const newErr = { ...errors, ...hasUser };
        setErrors(newErr);
      } else {
        dispatch(addUser(hasUser));
        navigate("/");
      }
      return;
    }

    signInSchema.validate(userInfo, { abortEarly: false }).catch((err: any) => {
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
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
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
            Sign In
          </Button>
          <Grid container>
            <Grid item>
              <Link href="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default SignIn;
