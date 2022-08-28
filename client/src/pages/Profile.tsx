import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { Credentials, User } from "../types/user";
import { useEffect, useState } from "react";
import {
  getUsers,
  updateUser,
  deleteUser,
} from "../redux/reducers/userReducer";

import React from "react";
import { Container } from "@material-ui/core";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";

const Profile = () => {
  const loggedInUser = useAppSelector((state) => state.userReducer.currentUser);
  const userList = useAppSelector((state) => state.userReducer.userList);
  const dispatch = useAppDispatch();

  const [nameChange, setNameChange] = useState(false);
  const [roleChange, setRoleChange] = useState(false);
  const [passwordChange, setPasswordChange] = useState(false);

  const [otherNameChange, setOtherNameChange] = useState(false);
  const [otherRoleChange, setOtherRoleChange] = useState(false);
  const [otherPasswordChange, setOtherPasswordChange] = useState(false);

  const handleDelete = (id: string) => {
    dispatch(deleteUser(id));
  };
  useEffect(() => {
    dispatch(getUsers());
    console.log(userList);
  }, [loggedInUser, otherNameChange, handleDelete]);

  // const [user, setUser] = useState({
  //   _id: "",
  //   email: "",
  //   password: "",
  // });
  const [name, setName] = useState({
    _id: "",
    firstname: "",
  });
  const [role, setRole] = useState({
    _id: "",
    role: undefined,
  });
  const [password, setPassword] = useState({
    _id: "",
    password: "",
  });

  const handleNameChange = (e: { target: { name: string; value: string } }) => {
    setName({ ...name, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e: {
    target: { name: string; value: string };
  }) => {
    setPassword({ ...password, [e.target.name]: e.target.value });
  };

  const handleRoleChange = (e: { target: { name: string; value: string } }) => {
    setRole({ ...role, [e.target.name]: e.target.value });
  };
  // const setLoggedInUserId = (id: string) => {
  //   setName({ _id: id, firstname: "" });
  //   setPassword({ _id: id, password: "" });
  //   setRole({ _id: id, role: "" });
  // };
  const setUserId = (id: string) => {
    setName({ ...name, _id: id });
    setPassword({ ...password, _id: id });
    setRole({ ...role, _id: id });
  };

  return (
    <Container className="profile-container">
      {loggedInUser ? (
        <Container>
          <h2 className="profile-header">Profile page</h2>
          <Card className="profile-card">
            <img
              className="profile-pic"
              src="https://bestprofilepictures.com/wp-content/uploads/2021/04/Cool-Profile-Picture-986x1024.jpg"
              alt="user avatar"
            />
            <CardContent className="profile-info">
              <div className="user-Info">
                {!nameChange ? (
                  <Typography gutterBottom variant="h5" component="div">
                    {loggedInUser.firstname}
                  </Typography>
                ) : (
                  <TextField
                    id="standard-basic"
                    label="name"
                    name="firstname"
                    variant="standard"
                    onChange={handleNameChange}
                  />
                )}
                <Button
                  size="small"
                  onClick={() => {
                    setUserId(loggedInUser._id);
                    setNameChange(!nameChange);
                    dispatch(updateUser(name));
                  }}
                >
                  Change
                </Button>
              </div>
              {!passwordChange ? (
                <Typography gutterBottom variant="h5" component="div">
                  Password
                </Typography>
              ) : (
                <TextField
                  id="standard-basic"
                  label="Password"
                  name="password"
                  variant="standard"
                  type="password"
                  onChange={handlePasswordChange}
                />
              )}
              <Button
                size="small"
                onClick={() => {
                  setUserId(loggedInUser._id);
                  setPasswordChange(!passwordChange);
                  dispatch(updateUser(password));
                }}
              >
                Change
              </Button>

              {!roleChange ? (
                <Typography gutterBottom variant="h5" component="div">
                  {loggedInUser.role}
                </Typography>
              ) : (
                <TextField
                  id="standard-basic"
                  label="role"
                  name="role"
                  variant="standard"
                  onChange={handleRoleChange}
                />
              )}
              {loggedInUser?.role === "admin" && (
                <>
                  <Button
                    size="small"
                    onClick={() => {
                      setUserId(loggedInUser._id);
                      setRoleChange(!roleChange);
                      dispatch(updateUser(role));
                    }}
                  >
                    Change
                  </Button>
                </>
              )}
            </CardContent>
          </Card>
        </Container>
      ) : (
        <Typography>you are not logged in.</Typography>
      )}

      {loggedInUser && loggedInUser.role === "admin" ? (
        userList.map((user) => (
          <Container>
            <Card className="profile-card">
              <img
                className="profile-pic"
                src="https://bestprofilepictures.com/wp-content/uploads/2021/04/Cool-Profile-Picture-986x1024.jpg"
                alt="other user avatar"
              />
              <CardContent className="profile-info">
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  // className="profile-info"
                >
                  {otherNameChange && name._id === user._id ? (
                    <TextField
                      id="standard-basic"
                      label="name"
                      name="firstname"
                      variant="standard"
                      onChange={handleNameChange}
                    />
                  ) : (
                    <Typography gutterBottom variant="h5" component="div">
                      {user.firstname}
                    </Typography>
                  )}

                  <Button
                    size="small"
                    onClick={() => {
                      setUserId(user._id);
                      setOtherNameChange(!otherNameChange);
                      dispatch(updateUser(name));
                    }}
                  >
                    Change
                  </Button>
                </Typography>

                {!otherPasswordChange ? (
                  <Typography gutterBottom variant="h5" component="div">
                    Password
                  </Typography>
                ) : (
                  <TextField
                    id="standard-basic"
                    label="Password"
                    name="password"
                    variant="standard"
                    type="password"
                    onChange={handlePasswordChange}
                  />
                )}
                <Button
                  size="small"
                  onClick={() => {
                    setUserId(user._id);
                    setOtherPasswordChange(!otherPasswordChange);
                    dispatch(updateUser(password));
                  }}
                >
                  Change
                </Button>

                {!otherRoleChange ? (
                  <Typography gutterBottom variant="h5" component="div">
                    {user.role}
                  </Typography>
                ) : (
                  <TextField
                    id="standard-basic"
                    label="role"
                    name="role"
                    variant="standard"
                    onChange={handleRoleChange}
                  />
                )}
                {loggedInUser?.role === "admin" && (
                  <>
                    <Button
                      size="small"
                      onClick={() => {
                        setUserId(user._id);
                        setOtherRoleChange(!otherRoleChange);
                        dispatch(updateUser(role));
                      }}
                    >
                      Change
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      size="small"
                      onClick={() => handleDelete(user._id)}
                    >
                      Delete
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>
          </Container>
        ))
      ) : (
        <Typography>you are not logged in.</Typography>
      )}
    </Container>
  );
};

export default Profile;
