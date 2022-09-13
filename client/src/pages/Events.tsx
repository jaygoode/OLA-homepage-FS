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

export default function Events() {
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
                    {currentUser && currentUser.role === "admin" ? (
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
                    <div className="card-middle-section">
                      <img
                        src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fd1fs8ljxwyzba6.cloudfront.net%2Fassets%2Farticle%2F2019%2F11%2F15%2Fdreamhack-atlanta-lan-essentials_feature.jpg&f=1&nofb=1"
                        alt="
                        event"
                      />
                      <CardContent>
                        <CardHeader
                          avatar={
                            <Avatar
                              sx={{ bgcolor: blue[500] }}
                              aria-label="ola-logo"
                            >
                              OLA
                            </Avatar>
                          }
                          title="Event"
                          subheader={event.date}
                        />
                        <Typography variant="body2" color="text.secondary">
                          {event.description}
                        </Typography>
                      </CardContent>
                    </div>
                    <CardActions disableSpacing>
                      <IconButton aria-label="add to favorites">
                        <FavoriteIcon
                          onClick={() => handleGoingToEvent(event._id)}
                        />
                      </IconButton>
                      <IconButton aria-label="share">
                        <ShareIcon />
                      </IconButton>
                      {/* {users &&
                        users.map((user) => {
                          if (event._id === user.goingToEvent) {
                            return <Typography>{user.firstname}</Typography>;
                          }
                        })} */}
                    </CardActions>
                  </Card>
                </>
              ))
            ) : (
              <Card className="event-card">
                <form>
                  <CardHeader
                    avatar={
                      <Avatar sx={{ bgcolor: blue[500] }} aria-label="recipe">
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
                  <CardActions disableSpacing></CardActions>
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
        )}
      </Container>
    </>
  );
}
