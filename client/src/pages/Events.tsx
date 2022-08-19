import * as React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { getAllEvents, eventReducer } from "../redux/reducers/eventReducer";
import { useDispatch } from "react-redux";
import { Event } from "../types/event";

// import "../styles/pages/events.scss";
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
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Container } from "@mui/material";

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
  const [openEditModal, setOpenEditModal] = React.useState(false);
  const [event, setEvent] = React.useState({
    id: "",
    description: "",
    date: "",
  });
  const events = useAppSelector((state) => state.eventReducer.eventList);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllEvents());
  }, []);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const toggleEditModal = () => {
    setOpenEditModal(!openEditModal);
  };

  const getEvent: Function = (
    id: string,
    description: string,
    date: string
  ) => {
    setEvent({ id, description, date });
    setOpenEditModal(!openEditModal);
    console.log(event);
  };

  const handleChange = (e: { target: { name: string; value: string } }) => {
    setEvent({ ...event, [e.target.name]: e.target.value });
  };

  const EventCard = (props: any) => {
    return (
      <>
        <Card key={props.id} className="event-card">
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                OLA
              </Avatar>
            }
            // action={
            //   <IconButton aria-label="settings" onClick={toggleEditModal}>
            //     {openEditModal ? <p>Cancel</p> : <p>Edit</p>}
            //   </IconButton>
            // }
            action={
              <IconButton
                aria-label="settings"
                onClick={() =>
                  getEvent(props.eventId, props.description, props.date)
                }
              >
                {openEditModal ? <p>Cancel</p> : <p>Edit</p>}
              </IconButton>
            }
            title="Event"
            subheader={props.date}
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
                {props.description}
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
    );
  };

  const EventCardForm = (props: any) => {
    return (
      <Card key={props.id} className="event-card">
        <form>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                R
              </Avatar>
            }
            action={
              <IconButton aria-label="settings" onClick={toggleEditModal}>
                Cancel
              </IconButton>
            }
            title="Event"
            subheader={
              <input value={event.date} onChange={handleChange} required />
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
              value={event.description}
              onChange={handleChange}
              required
            />
          </CardContent>
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
              <Typography paragraph>longer description</Typography>
            </CardContent>
          </Collapse>
        </form>
      </Card>
    );
  };

  return (
    <>
      <Container className="event-container">
        <Typography className="events-header-container">
          <h2 className="events-header">events</h2>
        </Typography>
        <div>
          {!openEditModal && events ? (
            events.map((event) => (
              <EventCard
                date={event.date}
                eventId={event._id}
                description={event.description}
              />
            ))
          ) : (
            <EventCardForm
              date={event.date}
              eventId={event.id}
              description={event.description}
            />
          )}
        </div>
      </Container>
    </>
  );
}
