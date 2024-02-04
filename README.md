A fullstack webapp project with aim of learning a wide variety of techniques used in complete web applications.

The project is continuously evolving and many of the functionality may be under developement.

## Currently it has:

### FRONTEND:

**Login page:** Visually it is mostly complete Takes information from the input fields and submits it to the server for authentication

**User management page:** Currently only renders a list of users in the DB

### BACKEND/SERVER:

Has a few basic api endpoints: 
* GET /users (retrieves all users from the server)
* GET /help (retrieves a string which shows what info is needed for a new user)
* POST /addUser (adds a new user do DB based on the info in request body)
* POST /login (checks the DB for credentials included in request body and responses with userID if correct)


## Upcoming:
### BACKEND
* Authentication with JWT

### FRONTEND
* Completing register form
* Fixing user management page list rendering too far down
