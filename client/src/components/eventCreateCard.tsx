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

const EventCreateCard = () => {
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
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllEvents());
    dispatch(getUsers());
  }, [events, eventUpdate]);

  const toggleEditModal = () => {
    console.log(eventUpdate);
    setOpenEditModal(!openEditModal);
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
          image="../images/olalan.jpg"
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

export default EventCreateCard;
