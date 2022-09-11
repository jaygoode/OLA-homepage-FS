import { Routes, BrowserRouter, Route } from "react-router-dom";

import "./App.css";
import Login from "./pages/Login";
import Nav from "./components/Nav";
import Events from "./pages/Events";
import Event from "./pages/Event";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Contact from "./pages/Contact";

function App() {
  return (
    <BrowserRouter>
      {/* <Box
            sx={{
              bgcolor: "background.default",
              color: "text.primary",
            }}
          > */}
      <Nav />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="events">
          <Route path="" element={<Events />} />
          <Route path=":eventId" element={<Event />} />
        </Route>
        <Route path="profile" element={<Profile />} />
        <Route path="contact" element={<Contact />} />
        <Route path="login" element={<Login />} />
      </Routes>
      {/* </Box> */}
    </BrowserRouter>
    // </ThemeProvider>
    // </ThemeContext.Provider>
  );
}

export default App;
