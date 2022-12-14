![download](https://user-images.githubusercontent.com/1963879/200801383-6774d48f-25fa-40aa-84fd-f48b58650c78.png)

# iLearn App

This is iLearn, a conversational learning app/manager.
It allows you to build, host and manage courses that run over a conversational platform
such as WhatsApp, Telegram, Messenger or our very own web platform.

**The iLearn Conversational App has the following elements:**

- A conversation builder.

- A drag-and-drop editor for building chatbot conversations/stories.

- Chatbot channel management & hosting.

- The ability to connect different channels to the chatbot manager and to link conversations/stories.
  This includes channel registration such as WhatsApp Business API registration on the platform/ Telegram
  Conversational system.
- Mirror of chat(bot) conversations with a user and the ability to take over from the bot
  and have direct chat with a participant and to guide the participants to parts of the application.

## User Stories

- as non-registered user, I can register a new account with the site

- as a user, I can log in to the site

- as a user, I can open my personal dashboard

- as a user, I can view and search all courese in the course shop

- as a user, I can add courses to my dashboard

- as a user, I can delete courses from my dashboard

## Specifications

### Backend

- APIs to register and login a user.

- APIs for which a logged in user can add, edit and update their courses.

- Pagination API to give list of perticular user's added courses.

- JWT token for authentication.

- We are using an external [API](https://github.com/A1Liu/schedge) to populate our courses endpoint with data.

### Frontend

- A simple but self-guiding UI to enable a user to register and login.

- UI for course management. A logged in user can add,
  delete and search school, subject and course by name.
- Making HTTPS calls using Axios.

## Technologies used

Our application uses the MERN stack:

- Frontend - React

- Backend - Nodejs/Express

- Database - MongoDB

## Contributing to this app

Follow the steps below:

- Fork the repo https://github.com/ALCOpenSource/conversational-app-team2

- Clone the forked repo with the command git clone to your local

- Pick an issue from the trello

- Create your own branch from main, eg feat/

- Ensure your branch is up to date with latest changes before pushing

- Create a pull request against main branch

Frontend

- Navigate to the project directory with the command cd conversational-app-team2

- Navigate to the frontend directory with the command `cd frontend`

- Install all the dependencies with the command npm install

- Start the app with the command `npm start`

- Navigate to the app on your browser with the url http://localhost:3000 or any other port number displayed on your terminal

Backend

- Navigate to the project directory with the command cd conversational-app-team2

- Navigate to the backend directory with the command `cd backend`

- Install all the dependencies with the command npm install

- Start the app with the command `npm start`

- Navigate to the app on your browser with the url http://localhost:4000 or any other port number displayed on your terminal

## Happy coding
