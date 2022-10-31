import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import {
  getAllEvents,
  updateEvent,
  deleteEvent,
  createEvent,
} from "../redux/reducers/eventReducer";
import { getUsers, updateUser } from "../redux/reducers/userReducer";
import { Button } from "@material-ui/core";

import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { blue } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import { Container } from "@mui/material";
import Stack from "@mui/material/Stack";

import React from "react";

const EventEditCard = () => {
  const [openEditModal, setOpenEditModal] = useState(false);
  const [createEventModal, setCreateEventModal] = useState(false);
  const [eventUpdate, setEventUpdate] = useState({
    _id: "",
    description: "",
    date: "",
  });
  const [newEvent, setNewEvent] = useState({
    description: "",
    date: "",
  });
  const events = useAppSelector((state) => state.eventReducer.eventList);
  const currentUser = useAppSelector((state) => state.userReducer.currentUser);
  const users = useAppSelector((state) => state.userReducer.userList);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllEvents());
    dispatch(getUsers());
  }, [events, eventUpdate]);

  const toggleEditModal = () => {
    console.log(eventUpdate);
    setOpenEditModal(!openEditModal);
  };

  const eventHandler: any = (id: string, description: string, date: string) => {
    setEventUpdate({ _id: id, description: description, date: date });
    setOpenEditModal(!openEditModal);
  };

  const saveHandler = (e: any) => {
    e.preventDefault();
    dispatch(updateEvent(eventUpdate));
    setOpenEditModal(!openEditModal);
  };

  const deleteHandler = (id: string) => {
    dispatch(deleteEvent(id));
  };

  const handleChange = (e: { target: { name: string; value: string } }) => {
    setEventUpdate({ ...eventUpdate, [e.target.name]: e.target.value });
  };

  const toggleCreateModal = () => {
    setCreateEventModal(!createEventModal);
  };

  const handleCreateEvent = (e: any) => {
    e.preventDefault();
    dispatch(createEvent(newEvent));
    setCreateEventModal(!createEventModal);
  };

  const handleNewEvent = (e: { target: { name: string; value: string } }) => {
    setNewEvent({ ...newEvent, [e.target.name]: e.target.value });
  };

  const handleGoingToEvent = (id: string) => {
    console.log("click");
    if (currentUser) {
      dispatch(updateUser({ _id: currentUser._id, goingToEvent: id }));
    }
    console.log(currentUser?.goingToEvent);
  };

  return (
    <Card className="event-card">
      <form>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: blue[500] }} aria-label="recipe">
              OLA
            </Avatar>
          }
          action={
            <IconButton aria-label="settings" onClick={toggleCreateModal}>
              X
            </IconButton>
          }
          title="Event"
          subheader={
            <input
              key="date"
              name="date"
              placeholder="Event date"
              onChange={handleNewEvent}
              required
            />
          }
        />
        <CardMedia
          component="img"
          height="194"
          image="/static/images/cards/paella.jpg"
          alt="Picture of event"
        />
        <CardContent>
          <textarea
            key="description"
            name="description"
            placeholder="Event description"
            onChange={handleNewEvent}
            required
          />
        </CardContent>
        <CardActions disableSpacing></CardActions>
        <CardContent>
          <Typography paragraph>longer description</Typography>
          <IconButton aria-label="Create" onClick={handleCreateEvent}>
            Create
          </IconButton>
          <IconButton aria-label="cancel" onClick={toggleCreateModal}>
            Cancel
          </IconButton>
        </CardContent>
      </form>
    </Card>
  );
};

export default EventEditCard;
