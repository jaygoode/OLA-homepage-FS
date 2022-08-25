import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { Credentials, User } from "../types/user";
import { useEffect, useState } from "react";
import { getUsers, updateUser } from "../redux/reducers/userReducer";

import React from "react";
import { Container } from "@material-ui/core";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

const Profile = () => {
  const [user, setUser] = useState({
    _id: "",
    email: "",
    password: "",
  });

  const [nameChange, setNameChange] = useState(false);
  const [roleChange, setRoleChange] = useState(false);
  const [passwordChange, setPasswordChange] = useState(false);
  const [name, setName] = useState({
    _id: "",
    firstname: "",
  });
  const [role, setRole] = useState({
    _id: "",
    role: "",
  });
  const [password, setPassword] = useState({
    _id: "",
    password: "",
  });

  const loggedInUser = useAppSelector((state) => state.userReducer.currentUser);
  const userList = useAppSelector((state) => state.userReducer.userList);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUsers());
  }, [loggedInUser]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    dispatch(updateUser(user));
  };

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

  return (
    <Container className="profile-container">
      {loggedInUser ? (
        <>
          <h2 className="profile-header">Profile page</h2>
          <Card className="profile-card">
            <CardMedia
              component="img"
              height="100"
              image="/static/images/cards/contemplative-reptile.jpg"
              alt="user avatar"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {!nameChange ? (
                  <Typography gutterBottom variant="h5" component="div">
                    {loggedInUser.firstname}
                  </Typography>
                ) : (
                  <TextField
                    id="standard-basic"
                    label="name"
                    variant="standard"
                    onChange={handleNameChange}
                  />
                )}

                <Button
                  size="small"
                  onClick={() => {
                    setNameChange(!nameChange);
                    dispatch(updateUser(name));
                  }}
                >
                  Change
                </Button>
              </Typography>

              {!passwordChange ? (
                <Typography gutterBottom variant="h5" component="div">
                  Password
                </Typography>
              ) : (
                <TextField
                  id="standard-basic"
                  label="Password"
                  variant="standard"
                  onChange={handlePasswordChange}
                />
              )}
              <Button
                size="small"
                onClick={() => {
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
                  variant="standard"
                  onChange={handleRoleChange}
                />
              )}
              {loggedInUser?.role === "admin" && (
                <Button
                  size="small"
                  onClick={() => {
                    setRoleChange(!roleChange);
                  }}
                >
                  Change
                </Button>
              )}
            </CardContent>
          </Card>
        </>
      ) : (
        <Typography>you are not logged in.</Typography>
      )}

      {loggedInUser && loggedInUser.role === "admin" ? (
        userList.map((user) => (
          <>
            <Card className="profile-card">
              <CardMedia
                component="img"
                height="100"
                image="/static/images/cards/contemplative-reptile.jpg"
                alt="user avatar"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {user.firstname}
                </Typography>
                <Button size="small">Change</Button>
                <Typography gutterBottom variant="h5" component="div">
                  Password
                </Typography>
                <Button size="small">Change</Button>
                <Typography gutterBottom variant="h5" component="div">
                  {user.role}
                </Typography>
                <Button size="small">Change</Button>
              </CardContent>
            </Card>
          </>
        ))
      ) : (
        <Typography>you are not logged in.</Typography>
      )}
    </Container>
  );
};

export default Profile;
