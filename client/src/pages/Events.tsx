import * as React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import {
  getAllEvents,
  eventReducer,
  updateEvent,
  deleteEvent,
  createEvent,
} from "../redux/reducers/eventReducer";
import { useDispatch } from "react-redux";
import { Event } from "../types/event";
import { Button } from "@material-ui/core";

import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Container } from "@mui/material";
import Stack from "@mui/material/Stack";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { productId } = useParams();
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function Events() {
  const [expanded, setExpanded] = React.useState(false);
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
  }, [events, eventUpdate]);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

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

  return (
    <>
      <Container className="event-container">
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="center"
          spacing={2}
        >
          <Typography className="events-header-container">
            <h2 className="events-header">events</h2>

            {currentUser?.role === "admin" && (
              <Button variant="contained" onClick={toggleCreateModal}>
                New event
              </Button>
            )}
          </Typography>
        </Stack>
        {!createEventModal ? (
          <div>
            {!openEditModal && events ? (
              events.map((event) => (
                <>
                  <Card className="event-card">
                    {events ? (
                      // currentUser && currentUser.role === "admin"
                      <Container>
                        <IconButton
                          aria-label="edit"
                          onClick={() =>
                            eventHandler(
                              event._id,
                              event.description,
                              event.date
                            )
                          }
                        >
                          {openEditModal ? <p>Cancel</p> : <p>Edit</p>}
                        </IconButton>
                        <IconButton
                          aria-label="delete"
                          onClick={() => deleteHandler(event._id)}
                        >
                          <p>Delete</p>
                        </IconButton>
                      </Container>
                    ) : null}
                    <CardHeader
                      avatar={
                        <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                          OLA
                        </Avatar>
                      }
                      title="Event"
                      subheader={event.date}
                    />
                    <div className="card-middle-section">
                      <CardMedia
                        component="img"
                        height="170"
                        width="100"
                        image="../images/"
                        alt="picture of event"
                      />
                      <CardContent>
                        <Typography variant="body2" color="text.secondary">
                          {event.description}
                        </Typography>
                      </CardContent>
                    </div>
                    <CardActions disableSpacing>
                      <IconButton aria-label="add to favorites">
                        <FavoriteIcon />
                      </IconButton>
                      <IconButton aria-label="share">
                        <ShareIcon />
                      </IconButton>
                      <ExpandMore
                        expand={expanded}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                      >
                        <ExpandMoreIcon />
                      </ExpandMore>
                    </CardActions>
                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                      <CardContent>
                        <Typography paragraph>Longer description</Typography>
                      </CardContent>
                    </Collapse>
                  </Card>
                </>
              ))
            ) : (
              <Card className="event-card">
                <form>
                  <CardHeader
                    avatar={
                      <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        OLA
                      </Avatar>
                    }
                    action={
                      <IconButton
                        aria-label="settings"
                        onClick={toggleEditModal}
                      >
                        X
                      </IconButton>
                    }
                    title="Event"
                    subheader={
                      <input
                        key="date"
                        name="date"
                        value={eventUpdate.date}
                        onChange={handleChange}
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
                      value={eventUpdate.description}
                      onChange={handleChange}
                      required
                    />
                  </CardContent>
                  <CardActions disableSpacing>
                    <ExpandMore
                      expand={expanded}
                      onClick={handleExpandClick}
                      aria-expanded={expanded}
                      aria-label="show more"
                    ></ExpandMore>
                  </CardActions>
                  <CardContent>
                    <Typography paragraph>longer description</Typography>
                    <IconButton aria-label="save" onClick={saveHandler}>
                      Save
                    </IconButton>
                    <IconButton aria-label="cancel" onClick={toggleEditModal}>
                      Cancel
                    </IconButton>
                  </CardContent>
                </form>
              </Card>
            )}
          </div>
        ) : (
          <Card className="event-card">
            <form>
              <CardHeader
                avatar={
                  <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
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
        )}
      </Container>
    </>
  );
}
