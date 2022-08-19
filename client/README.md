# Fullstack-Typescript-Project

Technologies used:
-TypeScript
-React
-React-Redux
-Node.js
-Express.js
-Mongoose
-MongoDB
-Sass
-Material-UI

Why did I create this application?
This application was build in part because the Ostrobothnia LAN association web page is getting quite old, and partly becauseI wanted to give myself the challenge to build a new and better page with the new skills I've learned in the Integrify academy with the technologies listed above.

About the Application

This is fullstack (CRUD) application made as a Homepage for The Ostrobothnia LAN association. We are an Association that hosts LAN parties every year non-profit.
We host Tournaments with prices and have a shop for buying food, snacks, and drinks, as well as a sleeping area. the events usually span from Friday to Sunday.

Application features:
-Home page
*displays who we are and what services we provide, a short introduction.
-Event page
*A page for posting old and coming events we are hosting. uploaded with pictures, date and description. Only admin users have CRUD rights.
-Profile Page
*You own account page where you can change your information and settings, Admins can see all other profile and create, update, change and delete any user.
-Login page
*create new user, login with username and password, protected with SHA256 encryption and uses Jason Web Token saved to local storage for quick authentication.
-(theme switch dark/light mode) COMING SOON!
-(Add authentication middleware using passport, google and jwt strategy) COMING SOON!

-Testing of the app is written with Jest and Supertest to guarantee functionality.
