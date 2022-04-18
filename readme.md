# Messenger Web App

Modern full stack web messenger applications that allows users to chat with friends over a real-time connection.

![project_demo](https://res.cloudinary.com/de2ymful4/image/upload/v1649988013/main-portfolio/projects/messenger_kohrka.png)

<div align="center">

[Visit messenger website](http://rcamach7.github.io/messenger/)

</div>

## Key Features

- User interface built with React, styled with SCSS, and designed with a mobile first approach, making it responsive to all view ports.
- API was created using Node and Express, which sanitizes and validates any data or request received from our front-end.
- User authentication and security implemented with PassportJS and JWT Tokens, which were also used to protect routes against un-authenticated users.
- MongoDB, in conjunction with mongoose, used to store and update user information.

### In depth features
<details>
  <summary>Front End (ReactJS)</summary>
  <li>Custom react hooks created to manage key functionality</li>
  <li>Asynchronous javascript utilized using async/await and promise based functions.</li>
  <li>Form validation and sanitation implemented before making requests to out API</li>
  <li>Destructured component props for easier readability and maintainability</li>
  <li>Light and dark theme implemented and user preference saved for future visits</li>
  <li>Utilized app routing and protection of routes using JWT tokens</li>
</details>
<details>
  <summary>Backend (NodeJS + ExpressJS + MongoDB)</summary>
  <li>User models created to enforce persistent data documents</li>
  <li>Endpoints sanitize and validate data before performing any CRUD operations to enforce data models.</li>
  <li>Password hashing implemented to protect users</li>
  <li>CORS enabled for all endpoints to allow communication with our front end</li>
  <li>PassportJS utilized to validate any log in requests</li>
  <li>Cloudinary utilized to store and set user profile images</li>
</details>


### Built Using

- React: library
  - axios, uuid, react-router-dom, sass, font awesome icon's, socket-io-client
- NodeJS: runtime environment
  - express, express-validator, socket.io, cors, dotenv, passport, passport-local, bcryptjs, jsonwebtoken
- MongoDB: database system
  - mongoose, cloudinary

#### To-Do's

- fix socket bug that makes too many connections upon real-time chat.
- Add time stamps to messages to indicate when they were sent
- Fix routing issue on GH pages where browser requests files from host instead from our react app.