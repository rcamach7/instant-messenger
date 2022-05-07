# Messenger Web App

Modern full stack web messenger applications that allows users to chat with friends over a real-time connection.

![project_demo](https://res.cloudinary.com/de2ymful4/image/upload/v1651963604/portfolio/project_demos/demo_do1qox.gif)

<div align="center">

[Visit messenger website](https://rcamach7.github.io/messenger/#/messenger)

</div>

## Key Features

- User interface built with React, styled with SCSS, and designed with a mobile first approach, making it responsive to all view ports.
- Real-time connection established for messaging by having client create a socket connection with server, and communicate anytime a user sends a message.
- Custom hooks created for user management, along with React hooks such as useContext, useState, and useEffect to build application functionality and features.
- User authentication and security implemented with JWT Tokens, which were also used to protect routes against un-authenticated users.
- Form validation and sanitation implemented in each form making an API call.

<details>
  <summary>...more app features</summary>
  <li>Custom react hooks created to manage key functionality</li>
  <li>Asynchronous javascript utilized using async/await and promise based functions.</li>
  <li>Destructured component props for easier readability and maintainability</li>
  <li>Light and dark theme implemented and user preference saved for future visits</li>
  <li>Utilized app routing and protection of routes using JWT tokens</li>
</details>
<br>

#### Built Using:

- react, create-react-app, axios, uuid, react-router-dom, sass, font awesome icon's, socket-io-client, useEffect, useState, useContext, React.Context, axios interceptors, custom hooks, hash router, promise based functions, async/await, custom API, etc...

#### How to install and run?

```bash
 git clone https://github.com/rcamach7/messenger
 cd messenger
 npm install
 npm start
```

#### To-Do's

- Add time stamps to messages to indicate when they were sent
