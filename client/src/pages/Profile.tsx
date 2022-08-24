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

const Profile = () => {
  const [user, setUser] = useState({ email: "", password: "" });
  const loggedInUser = useAppSelector((state) => state.userReducer.currentUser);
  const userList = useAppSelector((state) => state.userReducer.userList);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUsers());
  }, [loggedInUser]);

  const handleChange = (e: { target: { name: string; value: string } }) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    dispatch(updateUser(user));
  };

  const UserProfile = (props: Partial<User>) => {
    return (
      <>
        <Typography>Profile page</Typography>
        <Card className="profile-card">
          <CardMedia
            component="img"
            height="100"
            image="/static/images/cards/contemplative-reptile.jpg"
            alt="user avatar"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {props.firstname} {props.lastname}
              <Button size="small">Change</Button>
            </Typography>
            <Typography gutterBottom variant="h5" component="div">
              Password <Button size="small">Change</Button>
            </Typography>
            <Typography gutterBottom variant="h5" component="div">
              {props.role}
              {loggedInUser?.role === "admin" && (
                <Button size="small">Change</Button>
              )}
            </Typography>
          </CardContent>
        </Card>
      </>
    );
  };

  const AdminProfile = (props: Partial<User>) => {
    return (
      <>
        <Typography>Profile page</Typography>
        <Card className="profile-card">
          <CardMedia
            component="img"
            height="100"
            image="/static/images/cards/contemplative-reptile.jpg"
            alt="user avatar"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {props.firstname} {props.lastname}
              <Button size="small">Change</Button>
            </Typography>
            <Typography gutterBottom variant="h5" component="div">
              Password <Button size="small">Change</Button>
            </Typography>
            <Typography gutterBottom variant="h5" component="div">
              {props.role} <Button size="small">Change</Button>
            </Typography>
          </CardContent>
        </Card>
      </>
    );
  };

  return (
    <Container className="profile-container">
      {loggedInUser ? (
        <UserProfile
          firstname={loggedInUser.firstname}
          lastname={loggedInUser.lastname}
          role={loggedInUser.role}
        />
      ) : (
        <div>you are not logged in</div>
      )}
      {loggedInUser && loggedInUser.role === "admin" ? (
        userList.map((user) => (
          <UserProfile
            firstname={user.firstname}
            lastname={user.lastname}
            role={user.role}
          />
        ))
      ) : (
        <div>you are not logged in</div>
      )}
    </Container>
  );
};

export default Profile;
