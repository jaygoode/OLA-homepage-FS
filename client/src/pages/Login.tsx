import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { login } from "../redux/reducers/userReducer";
import { Credentials, User } from "../types/user";
import {
  Button,
  TextField,
  Grid,
  Paper,
  AppBar,
  Typography,
  Toolbar,
  Link,
} from "@material-ui/core";

export const Login = () => {
  const [user, setUser] = useState({ email: "", password: "" });
  const loggedInUser = useAppSelector((state) => state.userReducer.currentUser);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (loggedInUser?.email && loggedInUser.password) {
  //     navigate("/profile");
  //   }
  // }, [loggedInUser]);

  const handleChange = (e: { target: { name: string; value: string } }) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    dispatch(login(user));
  };

  return (
    <div>
      <AppBar
        position="static"
        //   alignitems="center"
        color="primary"
      ></AppBar>
      <Grid container spacing={1} justifyContent="center" direction="row">
        <Grid item>
          <Grid
            container
            direction="column"
            justifyContent="center"
            spacing={2}
            className="login-form"
          >
            <Paper
              variant="elevation"
              elevation={2}
              className="login-background"
            >
              <Grid item>
                <Typography component="h1" variant="h5">
                  Sign in
                </Typography>
              </Grid>
              <Grid item>
                <form onSubmit={handleSubmit} className="form">
                  <Grid container direction="column" spacing={2}>
                    <Grid item>
                      <TextField
                        type="email"
                        placeholder="Email"
                        fullWidth
                        name="email"
                        variant="outlined"
                        value={user.email}
                        onChange={handleChange}
                        required
                        autoFocus
                      />
                    </Grid>
                    <Grid item>
                      <TextField
                        type="password"
                        placeholder="Password"
                        fullWidth
                        name="password"
                        variant="outlined"
                        value={user.password}
                        onChange={handleChange}
                        required
                      />
                    </Grid>
                    <Grid item>
                      <button
                      // variant="contained"
                      // color="primary"
                      // type="submit"
                      // className="button-block"
                      >
                        Submit
                      </button>
                    </Grid>
                  </Grid>
                </form>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  Forgot Password?
                </Link>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default Login;
