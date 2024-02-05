A fullstack webapp project with aim of learning a wide variety of techniques used in complete web applications.

The project is continuously evolving and many of the functionality may be under developement.

## Currently it has:

### FRONTEND:

**Login page:** 
* Visually it is mostly complete
* Takes information from the input fields and submits it to the server for authentication
* Displays error to the user on invalid credentials or when there is no connection to the server

**User management page:** 
* Currently only renders a list of users in the DB
* Has logout button which resets the authentication status (which causes redirect to the login page)

### BACKEND/SERVER:

Has a few basic api endpoints: 
* GET /users (retrieves all users from the server)
* GET /help (retrieves a string which shows what info is needed for a new user)
* POST /addUser (adds a new user do DB based on the info in request body, responds with string)
* POST /login (checks the DB for credentials included in request body and responds with userID & 200 if correct, otherwise 401)


## To/Do:
### BACKEND
* Authentication with JWT
* /deleteUser endpoint for deleting specified user from the database

### FRONTEND
* Adding fetch POST for /deleteUser endpoint
* Password reset button functionality
