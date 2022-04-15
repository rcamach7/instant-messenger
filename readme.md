# Messenger Web App

> Full stack web messenger applications that allows users to chat with friends.

<div align="center">

[Visit messenger website](http://rcamach7.github.io/messenger/)
</div>

![project_demo](https://res.cloudinary.com/de2ymful4/image/upload/v1649988013/main-portfolio/projects/messenger_kohrka.png)

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

- Update login page so logo is compatible with both light and dark theme.
- Create a AI that can chat back and fourth with a user that sends it a message.
- fix socket bug that makes too many connections upon real-time chat.
- Add time stamps to messages to indicate when they were sent