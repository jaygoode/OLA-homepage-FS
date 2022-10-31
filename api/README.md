backend API readme

API routes:

/users/

- GET:shows registered users with all data(see entire user structure), encrypted passwords
- POST: create User
- PATCH: update user data with ID

/users/login/

- POST: credentials (email, password) to auth

/users/:userId

- GET: user with an ID
- DELETE: delete user with ID

/events/

- GET:shows all events
- POST: create event

/events/:eventId

- GET: single event with an ID
- PATCH: update event data
- DELETE: delete event with ID

MiddleWare:

verifyCredentials
-takes email and passwords and checks the DB for a match, with encryption

verifyToken
-verifies Jason Web Token for login, currenly not fully implemented.

verifyAdmin
-checks the user role for Admin status. If role is not Admin, throws unauthorized error
