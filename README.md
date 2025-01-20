# Events Center Project

The intention for this is project is to showcase a Full Stack Application utilizing Flask in the back end and React in the front end. The premise of the application is to allow users to purchase tickets for events they would want to watch. The application allows a user to sign up to get access to the application. The user can then browse existing events, purchase events, which would then be viewed in the list of events the user purchases. There is an ability to edit the user's profile as well.

## Set Up

To use the application, run the following commands:

- pipenv shell
- python server/seed.py. This would refresh and populate the database.
- python server/app.py. This would provide access to the back end
- In another terminal, run npm start --prefix client which will give access to the front end.

## BackEnd Structure

The backend utlizes Flask. Files are as follows:

### models.py

Three tables are set up which are as follows:
- User- which contains information about the user
- Event - which contains information about the events
- Purchase - which contains information about purchases. This also servers as the inbetween for User and Event since the structure is on a many to many relationship.

### app.py

Utilizing RESTful APIs, it contains Routes for each Resource that allows HTTP Request Methods for each Resource. A Login, CheckSession, and Logout are included for User login and log out.

### seed.py

After the database is created, data is refreshed and populated through seed.py

## FrontEnd Structure

The frontend utilizes React. Data if accessed via fetch to the backend. Structure is as follows:

App.js
│   ├── Login.js
|   |       ├── LoginForm.js
|   |       └── SignUpForm.js
│   ├── Header.js
│   ├── EventList.js
|   |       └── EventCard.js
│   ├── MyList.js
|   |       └── MyCard.js
│   └── EditProfile

### Login.js

Once the App is loaded, a check session run via useEffect. If there is no user, the user would be directed to Login.js. The user would then be prompted if the next action would be login or signup.

### LoginForm.js

If the user has an existing account and opted to Login, a post fetch request would be done which will lead to a post in the Login resource. If credentials match, the user's session would be saved and would have access to the EventList.

### SignUpForm.js

If the user is creating a profile, details would need to be entered which will lead to a post request. This will lead to a post in the backend in the Signup resource. It would then create a user in the database and save the session.

### Eventlist.js

This is a get request of all events sorted by date. Each event is passed on to the EventCard.js

### EventCard.js

The user is then given the capability to purchase which would trigger a purchase post request. Through the user and event relationship, the purchased event would be added to my list.

### MyList.js

Each purchased event by the user would show as a relationship under the user. This is then sorted as a list. Each purchased event is rendered as a card in MyCard.js.

### MyCard.js

Each card would show and give the user a capacility to delete the purchase.

### EditProfile.js

The user can edit it's profile which would set a Patch request to users/id.