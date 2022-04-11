# Messenger Web App

> Full stack web messenger applications that allows users to chat with friends.

![project_demo](https://res.cloudinary.com/de2ymful4/image/upload/v1649449397/main-portfolio/projects/chat_row1m8.png)

## Key Features

- User interface built with React, styled with SCSS, and designed with a mobile first approach, making it responsive to all view ports.
- API was created using Node and Express, which sanitizes and validates any data or request received from our front-end.
- User authentication and security implemented with PassportJS and JWT Tokens, which were also used to protect routes against un-authenticated users.
- MongoDB, in conjunction with mongoose, used to store and update user information.


### Built Using

- React Framework
  - State management and lifecycle hooks
- NodeJS + Express JS
  - RESTful API endpoints
  - Server-side data validation and sanitation
  - Socket-IO used to communicate with active socket connections to emit new messages signal.
- MongoDB + Mongoose

#### To-Do's

- Change color theme for buttons on log in and sign up pages/forms.
- Add time stamps to messages to indicate when they were sent
- Pull up web socket connection to Home component since we will be dealing with multiple socket functions.